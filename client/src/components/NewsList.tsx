import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite'; 
import { $host } from '../http/index'; 

interface News {
    id: number;
    name: string;
    description: string;
    published: Date;
    authorId: string;
}

const NewsList = observer(() => {
    const [items, setItems] = useState<News[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [authorId, setAuthorId] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const fetchNews = async (page: number, authorId?: string, name?: string) => {
        try {
            let url = `api/news/list?page=${page}`;

            const params: URLSearchParams = new URLSearchParams();
            if (authorId) {
                params.append('authorId', authorId);
            }
            if (name) {
                params.append('name', name);
            }
            if (params.toString()) {
                url += `&${params.toString()}`;
            }

            const response = await $host.get<{ items: News[]; totalPages: number }>(url);
            setItems(response.data.items);
            setTotalPages(response.data.totalPages);
        } catch (err) {
            setError('Ошибка при загрузке новостей');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        if (!authorId && !name) {
            setError('Пожалуйста, введите хотя бы один параметр для поиска.');
            return;
        }
        setLoading(true);
        setError(null);
        fetchNews(1, authorId || undefined, name || undefined);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        fetchNews(page, authorId || undefined, name || undefined);
    };

    useEffect(() => {
        fetchNews(currentPage);
    }, []);

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h3>Список новостей</h3>
            <div>
                <input
                    type="text"
                    placeholder="ID автора"
                    value={authorId}
                    className='input-filter'
                    onChange={(e) => setAuthorId(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Название новости"
                    value={name}
                    className='input-filter'
                    onChange={(e) => setName(e.target.value)}
                />
                <button style={{color: 'white'}} onClick={handleSearch}>Поиск</button>
            </div>
            <ul>
                {items.map(item => (
                    <li key={item.id} className='cart-news'>
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <p>Дата публикации: {new Date(item.published).toLocaleDateString()}</p>
                        <p>Автор ID: {item.authorId}</p>
                    </li>
                ))}
            </ul>
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        style={{marginRight: '5px'}}
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        disabled={currentPage === index + 1}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
});

export default NewsList;