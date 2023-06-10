import './index.css'

import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RecoilRoot } from 'recoil';
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        <ChakraProvider>
          <App/>
        </ChakraProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>,
)
