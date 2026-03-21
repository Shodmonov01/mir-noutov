# Данные которые нужно собрать до старта

Собери всё из этого списка перед тем как открывать Cursor.
Без этих данных проект не запустится.

---

## 1. MongoDB Atlas — строка подключения

**Зачем:** основная база данных.

**Как получить:**
1. Зайди на mongodb.com/atlas → создай бесплатный аккаунт (или войди)
2. Создай новый проект → `Build a Database` → выбери **Free (M0)**
3. Выбери регион ближе к Railway (например AWS Frankfurt)
4. Создай пользователя БД: придумай `username` и `password` → запомни их
5. В разделе `Network Access` → `Add IP Address` → нажми **Allow Access from Anywhere** (0.0.0.0/0)
   (для продакшена потом ограничишь до IP Railway)
6. Нажми `Connect` → `Drivers` → скопируй строку вида:
   `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/`
7. Замени `<username>` и `<password>` на свои, добавь имя БД в конце:
   `mongodb+srv://myuser:mypass@cluster0.xxxxx.mongodb.net/mir-noutov`

**Куда вставить:** `MONGODB_URI=` в `.env`

---

## 2. Telegram Bot Token

**Зачем:** проверка подписи initData от Mini App.

**Как получить:**
1. Открой @BotFather в Telegram
2. `/mybots` → выбери бота → `API Token`

**Куда вставить:** `BOT_TOKEN=` в `.env`

---

## 3. Cloudflare R2 — хранилище фото

**Зачем:** хранение фотографий товаров.

**Как получить:**
1. dash.cloudflare.com → раздел `R2 Object Storage`
2. `Create bucket` → имя: `mir-noutov-products`
3. В настройках bucket → `Settings` → `Public Access` → **Allow Access**
4. Скопируй `Public Bucket URL` (вида `https://pub-xxx.r2.dev`)
5. `R2` → `Manage R2 API Tokens` → `Create API Token`
   - Permissions: **Object Read & Write**
   - Scope: только твой bucket
6. Скопируй три значения: `Token Value`, `Access Key ID`, `Secret Access Key`
7. Скопируй `Jurisdiction-specific endpoint` (вида `https://<accountId>.r2.cloudflarestorage.com`)

**Куда вставить:**
```
R2_ENDPOINT=https://<accountId>.r2.cloudflarestorage.com
R2_ACCESS_KEY=<Access Key ID>
R2_SECRET_KEY=<Secret Access Key>
R2_BUCKET=mir-noutov-products
R2_PUBLIC_URL=https://pub-xxx.r2.dev
```

---

## 4. JWT Secret

**Зачем:** подпись токенов для входа в админку.

**Как получить** — сгенерируй в терминале:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Куда вставить:** `JWT_SECRET=` в `.env`

---

## 5. CORS Origin

**Зачем:** разрешить запросы с фронтенда.

**Что вставить:**
- Для разработки: ngrok URL из `vite.config.ts`
  (`https://byssaceous-florentino-instructorial.ngrok-free.dev`)
- Для продакшена: домен Mini App

**Куда вставить:** `CORS_ORIGIN=` в `.env`

---

## 6. Первый аккаунт админки

Придумай email и пароль для менеджера — они понадобятся после запуска.
После старта сервера выполни один раз:
```bash
npm run create-admin -- manager@yourshop.com yourpassword
```

---

## Итоговый .env

```env
# Сервер
NODE_ENV=development
PORT=3000

# MongoDB Atlas
MONGODB_URI=mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/mir-noutov

# Telegram
BOT_TOKEN=

# Админка JWT
JWT_SECRET=
JWT_EXPIRES_IN=7d

# Cloudflare R2
R2_ENDPOINT=https://<accountId>.r2.cloudflarestorage.com
R2_ACCESS_KEY=
R2_SECRET_KEY=
R2_BUCKET=mir-noutov-products
R2_PUBLIC_URL=https://pub-xxx.r2.dev

# CORS
CORS_ORIGIN=https://byssaceous-florentino-instructorial.ngrok-free.dev
```

---

## Порядок действий

1. Собери все данные выше — займёт 15-20 минут
2. Положи все `be-*.mdc` файлы в `server/.cursor/rules/`
3. Открой папку `server/` в Cursor
4. Копируй шаги из `cursor-backend.md` по одному в чат Cursor
5. После шага 1 — создай `.env` и заполни данными
6. После шага 11 — запусти `npm run dev` и проверь чеклист
7. Запусти `npm run seed` для начальных данных
8. Запусти `npm run create-admin` для первого входа в админку
