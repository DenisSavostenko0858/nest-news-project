import { useContext} from "react";
import { observer } from 'mobx-react-lite';
import NewsList from '../components/NewsList';
import {Context} from '../main';

const Home = observer(() => {
    const context = useContext(Context);

    return(
        <div className='container-home'>
            <h2>Главная</h2>
            {context?.user.isAuth ?
                    <div className='additional'><a href="/news" style={{textDecoration: 'none', color: 'gray'}}>*Редактировать или добавить*</a></div>
                    :
                    <div className='additional'>*Для того чтобы добавить или редактировать статьи нужно <a href="/login" style={{textDecoration: 'none', color: 'gray'}}>войти</a> или <a href="/register" style={{textDecoration: 'none', color: 'gray'}}>зарегистрироваться</a>*</div>
                    }
            <div className='news'>
                <h1>Новости</h1>
                <h2>Статьи:</h2>
                <NewsList/>
            </div>
        </div>
    )
})

export default Home;