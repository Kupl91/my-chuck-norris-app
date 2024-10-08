'use client';

import { ReactNode, useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import '../styles/globals.css';

const queryClient = new QueryClient();

interface LayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<LayoutProps> = ({ children }) => {
  useEffect(() => {
    // Экспонируем queryClient для доступа через стандартные DevTools
    if (typeof window !== 'undefined') {
      // @ts-ignore
      window.queryClient = queryClient;
    }
  }, []);

  return (
    <html lang="ru">
      <body>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;