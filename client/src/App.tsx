import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CatalogPage } from './pages/CatalogPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ProfileSidebar } from './components/ProfileSidebar';
import { useTelegramBackButton } from './hooks/useTelegramBackButton';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useTelegramBackButton();

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<CatalogPage onProfileClick={() => setSidebarOpen(true)} />}
        />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>

      <ProfileSidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
    </>
  );
}

export default App;
