import './index.css'

import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import ReactDOM from 'react-dom/client'
import { RecoilRoot } from 'recoil';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RecoilRoot>
    <ChakraProvider>
      <App/>
    </ChakraProvider>
  </RecoilRoot>
)
