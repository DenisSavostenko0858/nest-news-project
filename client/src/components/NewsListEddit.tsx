import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite'; 
import { $host, $authHost } from '../http/index';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'; 

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
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [editingNews, setEditingNews] = useState<News | null>(null);

    const fetchNews = async (page: number = 1) => {
        try {
            const response = await $host.get<{ items: News[]; totalPages: number }>(`api/news/list?page=${page}`);
            setItems(response.data.items);
            setTotalPages(response.data.totalPages);
        } catch (err) {
            setError('Ошибка при загрузке новостей');
        } finally {
            setLoading(false);
        }
    };

    const deleteNews = async (id: number) => {
        try {
            await $authHost.delete(`api/news/${id}`);
            setItems(items.filter(item => item.id !== id));
        } catch (err) {
            setError('Ошибка при удалении новости');
        }
    };

    const updateNews = async (id: number, updatedNews: Partial<News>) => {
        try {
            const response = await $authHost.patch(`api/news/${id}`, updatedNews);
            setItems(items.map(item => (item.id === id ? response.data : item)));
            setEditingNews(null); 
        } catch (err) {
            setError('Ошибка при обновлении новости');
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        fetchNews(page);
    };

    useEffect(() => {
        fetchNews(currentPage);
    }, [currentPage]);

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>{error}</div>;

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Название обязательно'),
        description: Yup.string().required('Описание обязательно')
    });

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
                        <button style={{color: 'white', marginRight: '5px'}} onClick={() => deleteNews(item.id)}>Удалить</button>
                        <button style={{color: 'white'}} onClick={() => setEditingNews(item)}>Изменить</button>
                    </li>
                ))}
            </ul>

            {editingNews && (
                <Formik
                    initialValues={{
                        name: editingNews.name,
                        description: editingNews.description
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        updateNews(editingNews.id, values);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className='container-edit-form'>
                            <h3>Изменение</h3>    
                            <div className='edit-form'>
                                <label htmlFor="name">Название</label>
                                <Field type="text" name="name" />
                                <ErrorMessage name="name" component="div" />
                            </div>
                            <div className='edit-form'>
                                <label htmlFor="description">Описание</label>
                                <Field as="textarea" name="description" />
                                <ErrorMessage name="description" component="div" />
                            </div>
                            <button type="submit" disabled={isSubmitting} style={{color: 'white', marginRight: '5px'}}>Сохранить</button>
                            <button type="button" style={{color: 'white'}} onClick={() => setEditingNews(null)}>Отмена</button>
                        </Form>
                    )}
                </Formik>
            )}

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