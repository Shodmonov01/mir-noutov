# Cursor: генерация бэкенда mir-noutov

## Контекст проекта

Бэкенд для Telegram Mini App интернет-магазина компьютерной техники (Узбекистан).
Клиент уже написан на React + Vite + Chakra UI v3. Бэкенд — отдельный проект в монорепо.

Стек: Node.js, TypeScript, Fastify, Mongoose, MongoDB Atlas, Cloudflare R2.
Правила кода: файлы `be-*.mdc` в папке `.cursor/rules/`.

---

## Шаг 1 — Инициализация проекта

```
Создай Node.js + TypeScript проект в папке server/ со следующей структурой:

server/
├── src/
│   ├── models/
│   │   ├── category.model.ts
│   │   ├── product.model.ts
│   │   ├── order.model.ts
│   │   ├── delivery-option.model.ts
│   │   ├── payment-option.model.ts
│   │   └── admin.model.ts
│   ├── plugins/
│   │   ├── auth-telegram.ts
│   │   ├── auth-admin.ts
│   │   └── cors.ts
│   ├── routes/
│   │   ├── api/
│   │   │   ├── categories.ts
│   │   │   ├── products.ts
│   │   │   ├── delivery.ts
│   │   │   ├── payment.ts
│   │   │   └── orders.ts
│   │   └── admin/
│   │       ├── auth.ts
│   │       ├── products.ts
│   │       ├── categories.ts
│   │       ├── orders.ts
│   │       └── upload.ts
│   ├── services/
│   │   ├── order.service.ts
│   │   ├── product.service.ts
│   │   └── storage.service.ts
│   ├── repositories/
│   │   ├── order.repository.ts
│   │   ├── product.repository.ts
│   │   └── category.repository.ts
│   ├── types/
│   │   ├── product.types.ts
│   │   ├── order.types.ts
│   │   └── admin.types.ts
│   ├── config.ts
│   ├── seed.ts
│   ├── create-admin.ts
│   └── index.ts
├── .env.example
├── package.json
└── tsconfig.json

Зависимости:
  fastify@4, @fastify/cors, @fastify/multipart, @fastify/jwt,
  mongoose, @aws-sdk/client-s3, zod, bcrypt

Dev-зависимости:
  typescript, tsx, @types/node, @types/bcrypt

Scripts:
  dev:           tsx watch src/index.ts
  build:         tsc
  start:         node dist/index.js
  seed:          tsx src/seed.ts
  create-admin:  tsx src/create-admin.ts
```

---

## Шаг 2 — Mongoose модели

```
Создай все модели в src/models/.
Правила для каждой: { timestamps: true, versionKey: false }.

src/models/category.model.ts
  ICategory: { name: string, image: string }

src/models/product.model.ts
  IProduct:
    categoryId:  ObjectId (ref: 'Category', required)
    title:       string (required)
    price:       number (required)
    currency:    string (default: 'UZS')
    image:       string (required)
    description: string (optional)
    specs:       Mixed (optional)
    condition:   string (optional)
    warranty:    string (optional)
    location:    string (optional)
  После схемы добавь text index:
    ProductSchema.index({ title: 'text', description: 'text' })

src/models/order.model.ts
  IOrderItem (вложенный subdocument):
    productId: ObjectId (ref: 'Product')
    title:     string  (копия названия на момент заказа)
    price:     number  (копия цены на момент заказа)
    quantity:  number

  IOrder:
    telegramId: string (required)
    phone:      string (required)
    address:    { district, street, apartment, floor } (все string, required)
    deliveryId: string (required)
    paymentId:  string (required)
    comments:   string (optional)
    status:     string (default: 'pending',
                  enum: ['pending','confirmed','delivering','done','cancelled'])
    total:      number (required)
    items:      IOrderItem[] (embedded, не отдельная коллекция)

  items — embedded documents: заказ самодостаточен, данные не потеряются
  если товар будет удалён позже.

src/models/delivery-option.model.ts
  IDeliveryOption: { _id: string, name: string, price: number }
  _id — строка, не ObjectId (значения: 'courier', 'pickup')

src/models/payment-option.model.ts
  IPaymentOption: { _id: string, name: string }
  _id — строка (значения: 'cash', 'payme', 'click')

src/models/admin.model.ts
  IAdmin: { email: string (unique), password: string }
```

---

## Шаг 3 — config.ts

```
Создай src/config.ts.

interface Config {
  NODE_ENV:       string
  PORT:           number
  MONGODB_URI:    string
  BOT_TOKEN:      string
  JWT_SECRET:     string
  JWT_EXPIRES_IN: string
  R2_ENDPOINT:    string
  R2_ACCESS_KEY:  string
  R2_SECRET_KEY:  string
  R2_BUCKET:      string
  R2_PUBLIC_URL:  string
  CORS_ORIGIN:    string
}

Если обязательная переменная отсутствует — бросай ошибку:
  throw new Error(`Missing env variable: ${key}`)
PORT по умолчанию 3000, JWT_EXPIRES_IN по умолчанию '7d'.
```

---

## Шаг 4 — Плагины

```
1. src/plugins/cors.ts
   @fastify/cors, origin из config.CORS_ORIGIN.
   Методы: GET, POST, PUT, DELETE, PATCH, OPTIONS.
   Заголовки: Content-Type, Authorization, X-Telegram-Init-Data.

2. src/plugins/auth-telegram.ts
   verifyTelegramAuth — функция для preHandler.
   Читает X-Telegram-Init-Data.
   Алгоритм проверки:
     - Разбить на пары, убрать hash
     - Отсортировать, собрать через \n
     - secretKey = HMAC-SHA256('WebAppData', BOT_TOKEN)
     - checkHash = HMAC-SHA256(secretKey, dataCheckString)
     - Сравнить с hash
   Успех → request.telegramUser = { id, first_name, username }
   Провал → reply 401.
   Declaration merging: FastifyRequest.telegramUser: TelegramUser

3. src/plugins/auth-admin.ts
   @fastify/jwt с config.JWT_SECRET.
   verifyAdminAuth — функция для preHandler.
   Проверяет Bearer-токен из Authorization.
   Успех → request.adminUser = декодированный payload.
   Провал → reply 401.
   Declaration merging: FastifyRequest.adminUser: AdminJwtPayload
```

---

## Шаг 5 — Репозитории

```
Только Mongoose-запросы. Все read-методы используют .lean().

src/repositories/category.repository.ts
  findAll()
  findById(id: string)

src/repositories/product.repository.ts
  findAll(filters: { categoryId?: string, search?: string })
    search → { $text: { $search: search } }
    categoryId → добавить в filter
  findById(id: string)
  create(data)
  update(id: string, data)  → findByIdAndUpdate, { new: true }
  remove(id: string)        → findByIdAndDelete

src/repositories/order.repository.ts
  create(data)
  findAll(filters: { status?: string })
  findById(id: string)
  updateStatus(id: string, status: string)
```

---

## Шаг 6 — Сервисы

```
src/services/product.service.ts
  getAll(filters)  → ProductRepository.findAll
  getById(id)      → ProductRepository.findById, бросает 404 если null

src/services/order.service.ts
  create(data, telegramId):
    1. Загрузить товары по массиву productId одним запросом ($in)
    2. Если какой-то productId не найден — бросить 400
    3. Загрузить DeliveryOption по deliveryId
    4. Посчитать total = Σ(price * qty) + delivery.price
    5. Сформировать items с копиями title и price
    6. Создать Order через OrderRepository
    7. Вернуть { id, status, total, createdAt }

src/services/storage.service.ts
  S3Client с R2-endpoint из config.
  upload(buffer: Buffer, originalName: string): Promise<string>
    Имя файла: randomUUID() + расширение из originalName
    PutObjectCommand → R2
    Вернуть: config.R2_PUBLIC_URL + '/' + filename
```

---

## Шаг 7 — Публичные роуты /api

```
Все роуты: preHandler: verifyTelegramAuth

GET  /api/categories
GET  /api/products          query: categoryId?, search?
GET  /api/products/:id      404 если нет
GET  /api/delivery-options
GET  /api/payment-options

POST /api/orders
  Zod body:
    items:      { productId: string, quantity: number (min:1) }[] (min 1)
    phone:      string (min 9)
    address:    { district, street, apartment, floor } (все required)
    deliveryId: string
    paymentId:  string
    comments?:  string
  → OrderService.create(body, request.telegramUser.id)
  Ответ 201: { id, status, total, createdAt }
```

---

## Шаг 8 — Роуты админки /admin

```
POST /admin/login  — БЕЗ verifyAdminAuth
  Zod: { email: string, password: string }
  Найти по email, bcrypt.compare пароль.
  Неверные данные → 401 (одинаковое сообщение для обоих случаев).
  Успех → { token } подписанный JWT с { adminId, email }.

Все остальные: preHandler: verifyAdminAuth

GET    /admin/products           query: categoryId?, search?
GET    /admin/products/:id
POST   /admin/products           Zod: все обязательные поля Product
PUT    /admin/products/:id       Zod partial
DELETE /admin/products/:id

GET    /admin/categories
POST   /admin/categories         { name: string, image: string }
PUT    /admin/categories/:id
DELETE /admin/categories/:id

GET   /admin/orders              query: status?
GET   /admin/orders/:id
PATCH /admin/orders/:id/status
  Zod: { status: enum['pending','confirmed','delivering','done','cancelled'] }

POST /admin/upload
  multipart/form-data, поле file.
  → StorageService.upload(buffer, filename)
  Ответ: { url: string }
```

---

## Шаг 9 — Seed

```
src/seed.ts — upsert чтобы не дублировать при повторном запуске.

DeliveryOption:
  { _id: 'courier', name: 'Курьер',    price: 20000 }
  { _id: 'pickup',  name: 'Самовывоз', price: 0 }

PaymentOption:
  { _id: 'cash',  name: 'Наличные' }
  { _id: 'payme', name: 'Payme' }
  { _id: 'click', name: 'Click' }

Category (upsert по name, image: 'https://placehold.co/400x300'):
  Ноутбуки, Мониторы, Комплектующие, Аксессуары

Вывести в консоль результат. Закрыть соединение после завершения.
```

---

## Шаг 10 — Создание первого админа

```
src/create-admin.ts
  Запуск: npx tsx src/create-admin.ts <email> <password>
  1. Подключиться к MongoDB
  2. Проверить что email не занят
  3. bcrypt.hash(password, 10)
  4. Admin.create({ email, password: hash })
  5. Вывести: 'Админ создан: <email>'
  6. Закрыть соединение
```

---

## Шаг 11 — Точка входа

```
src/index.ts:
  1. await mongoose.connect(config.MONGODB_URI)
     Ошибка → log + process.exit(1)
  2. Fastify с { logger: true }
  3. Зарегистрировать: cors, auth-telegram плагин, auth-admin плагин
  4. Зарегистрировать роуты: /api и /admin
  5. setErrorHandler:
       ZodError           → 400, поля ошибок
       CastError          → 404, 'Not found'
       code 11000         → 409, 'Already exists'
       остальное          → log + 500, 'Internal server error'
  6. listen на 0.0.0.0:config.PORT

Создай .env.example со всеми переменными и комментариями.
```

---

## Чеклист после генерации

- [ ] `npm run dev` стартует, в логах "Connected to MongoDB"
- [ ] `npm run seed` выполняется без ошибок
- [ ] `npm run create-admin -- test@test.com password123` создаёт запись
- [ ] `GET /api/categories` возвращает 4 категории
- [ ] `POST /api/orders` без X-Telegram-Init-Data → 401
- [ ] `POST /admin/login` с верными данными → token
- [ ] `GET /admin/products` без токена → 401
