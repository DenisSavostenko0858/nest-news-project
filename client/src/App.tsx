import { useContext, useEffect, useState } from 'react';
import NavBar from "./components/NavBar";
import AppRouter from "./components/AppRouter";
import { BrowserRouter } from 'react-router-dom';
import { check } from "./http/userAPI";
import { Context } from "./main";
import { observer } from 'mobx-react-lite';

const App = observer(() => {
  const context = useContext(Context);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    check().then(data => {
      
      console.log(data);

      context?.user.setUser(data);
      context?.user.setIsAuth(true);
    }).finally(() => setLoading(false));
  }, []);

  if (loading){
    return <div style={{marginTop: '100px'}}>Loading...</div>
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;