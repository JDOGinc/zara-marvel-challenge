import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { CharacterProvider } from './context/characterContext.tsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <CharacterProvider>
      <App />
    </CharacterProvider>
  </BrowserRouter>,
)
