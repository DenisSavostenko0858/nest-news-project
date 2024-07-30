import React, {createContext} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import UserStore from './store/UserStore.tsx'


interface StoreContextType {
  user: UserStore;
}
  export const Context = createContext<StoreContextType | null>(null);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Context.Provider value={{
        user: new UserStore(), 
      }}>
        <App />
      </Context.Provider>
  </React.StrictMode>,
)
