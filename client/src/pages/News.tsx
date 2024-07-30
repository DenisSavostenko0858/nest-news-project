import {useContext, useState} from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../main';
import { NEWS_ROUT } from '../utils/consts_rout';
import { useNavigate } from 'react-router-dom';
import { create } from '../http/newsAPI';


const News = observer(() => {
    // const context = useContext(Context);
    const history = useNavigate();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [published, setPublished] = useState('');
    const [authorId, setAuthorId] = useState('');

    const click = async (): Promise<void> => {
        try {
            const publishedDate = new Date(published);
            const authorNameId = 1;
            let data = await create(name, description, publishedDate , authorNameId);
            // context?.user.setUser(data);
            // context?.user.setIsAuth(true);
            console.log(data);
            history(NEWS_ROUT);
        } catch (error: any) {
            console.log(error.message); 
        }
      }


    return(
        <div>
            <h2>Новости</h2>
            <h3>Статьи:</h3>
            <div className='container-news'>
                <h3>Добавить статью</h3>
                <input
                    type='text'
                    className="input-auth"
                    placeholder="Заголовок..."
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <input
                    type='text'
                    className="input-auth"
                    placeholder="Описание..."
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <input
                    type='date'
                    className="input-auth"
                    placeholder="Описание..."
                    value={published}
                    onChange={e => setPublished(e.target.value)}
                />
                <input
                    type="number"
                    className="input-auth"
                    placeholder="Автор ID"
                    value={authorId}
                    onChange={e => setAuthorId(e.target.value)}
                />
                <button className='btn-auth' onClick={click}>Добавить</button>
            </div>
        </div>
    )
})

export default News;