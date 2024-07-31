import { useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { create } from '../http/newsAPI';
import { Context } from '../main';
import NewsList from '../components/NewsList';

const News = observer(() => {
    const context = useContext(Context);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [published, setPublished] = useState('');

    const click = async (): Promise<void> => {
        try {
            const publishedDate = new Date(published);
            const authorNameId: any = context?.user.user?.id;
            let data = await create(name, description, publishedDate , authorNameId);

            console.log(data);
            window.location.reload(); 
        } catch (error: any) {
            console.log(error.message); 
        }
      }
    return(
        <div className='news-body'>
            <div className='news'>
                <h1>Новости</h1>
                <h2>Статьи:</h2>
                <NewsList/>
            </div>
            <div className='container-news'>
                <h3>Добавить статью</h3>
                <input
                    type='text'
                    className="input-news"
                    placeholder="Заголовок..."
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <input
                    type='text'
                    className="input-news"
                    placeholder="Описание..."
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <input
                    type='date'
                    className="input-news"
                    placeholder="Описание..."
                    value={published}
                    onChange={e => setPublished(e.target.value)}
                />
                <button className='btn-news' onClick={click}>Добавить</button>
            </div>
        </div>
 );
});

export default News;