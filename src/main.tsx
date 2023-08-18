import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { queryClient } from './react-query/queryClient';
import mainRouter from './router';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <RouterProvider router={mainRouter} />
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </RecoilRoot>
    </QueryClientProvider>
  </React.StrictMode>,
);
