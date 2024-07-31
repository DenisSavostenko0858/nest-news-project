import { useContext } from "react";
import {Context} from '../main';
import {observer} from 'mobx-react-lite'
import { logout } from '../http/userAPI';

const NavBar = observer(() =>{
    const context = useContext(Context);

    const logOut = () => {
        logout();
        window.location.reload(); 
    }
    return(
        <div className="container-nav-bar">
            <div className="nav-bar-left">
                <div className="nav-bar-logo">
                    <a href="/" style={{color: 'white', textDecoration: 'none'}}><h2>Новости и Статьи</h2></a>
                </div>
                <div className="nav-bar-links">
                    <a href="/" style={{margin: '5px', color: 'white', textDecoration: 'none'}}>Главная</a>
                    {context?.user.isAuth ?
                    <>
                        <a href="/news" style={{margin: '5px', color: 'white', textDecoration: 'none'}}>Редактирование и Добавление</a>
                    </>    
                    :
                    <></>
                    }
                </div>
            </div>
            <div className="nav-bar-right">
                <div className="nav-bar-search">
                    <input type="text" placeholder="Поиск..." className="input-search"/>
                </div>
                <div className="nav-bar-auth">
                {context?.user.isAuth ?
                    <>
                        <button onClick={() => logOut()} style={{color: 'white'}}>Выйти</button>
                    </>    
                    :
                    <>
                        <a href="/login" style={{margin: '5px', color: 'white', textDecoration: 'none'}}>Войти</a>
                        <a href="/register" style={{margin: '5px', color: 'white', textDecoration: 'none'}}>Регистрация</a>
                    </>
                }
                </div>
            </div>
        </div>
    )
});

export default NavBar;