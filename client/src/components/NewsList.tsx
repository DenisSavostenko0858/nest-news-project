import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite'; 
import { $host } from '../http/index'; 

const NewsList = observer(() => {
    const [items, setItems] = useState<News[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    interface News {
        id: number;
        name: string;
        description: string;
        published: Date;
        authorId: string;
    }

    const fetchNews = async () => {
        try {
            const response = await $host.get<News[]>('api/news/list');
            setItems(response.data);
        } catch (err) {
            setError('Ошибка при загрузке новостей');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h3>Список новостей</h3>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <p>Дата публикации: {new Date(item.published).toLocaleDateString()}</p>
                        <p>Автор ID: {item.authorId}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
});

export default NewsList;