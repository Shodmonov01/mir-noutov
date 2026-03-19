import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getWebApp } from '../lib/telegram';

interface RouteConfig {
  path: string;
  backTo: string;
}

const ROUTES_WITH_BACK: RouteConfig[] = [
  { path: '/cart', backTo: '/' },
  { path: '/checkout', backTo: '/cart' },
];

export function useTelegramBackButton(): void {
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    const webApp = getWebApp();
    if (!webApp?.BackButton) return;

    const config = ROUTES_WITH_BACK.find((r) => location.pathname === r.path);

    if (!config) {
      webApp.BackButton.hide();
      return;
    }

    const handleBack = (): void => {
      navigate(config.backTo);
    };

    webApp.BackButton.onClick(handleBack);
    webApp.BackButton.show();

    return () => {
      webApp.BackButton.offClick(handleBack);
      webApp.BackButton.hide();
    };
  }, [location.pathname, navigate]);
}
