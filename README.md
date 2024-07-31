## Nest + Vite ReactTS + PostgreSQL + Redis + Sequelize

## Jest тестирование
npm run test

## Nest 
npm run start

## Vite React 
npm run dev

## Api для работы с Postman

### Статьи
- Добавление статьи
POST: http://localhost:5000/api/news/create

 -Пример запроса JSON:
 ```
{
    "name": "Статья",
    "description": "Описание статьи",
    "published": "2024-06-30T12:20:00Z",
    "authorId": 1
}
```

- Получение всех статей
GET: http://localhost:5000/api/news/list

- Получение статей по автору
GET: http://localhost:5000/api/news/list/author/:authorId

- Получение статей по названию статьи
GET: http://localhost:5000/api/news/list/name/:name

- Получение статьи по id
GET: http://localhost:5000/api/news/:id

- Изменение статьи по id
PATCH: http://localhost:5000/api/news/:id
 
 -Пример запроса JSON:
```
{
    "name": "Статья2",
    "description": "Описание статьи",
    "published": "2024-06-30T12:20:00Z",
    "authorId": 1
}
```
- Удаление статьи по id
DELETE: http://localhost:5000/api/news/:id

### Пользователи
- Register
POST: http://localhost:5000/api/users/register

 -Пример запроса JSON:
``` 
{
    "name": "user",
    "email": "user2@gmail.com",
    "password": "123123"
}
```
 -Ответ JSON:
```
{
    "token": "eyJhbGciOi...."   
}
```
- Login
POST: http://localhost:5000/api/users/login

 -Пример запроса JSON:
```
{
    "email": "user1@gmail.com",
    "password": "123123"
}
```
 -Ответ JSON:
```
{
    "token": "eyJhbGciOi...."   
}
```
- Auth (проверка токена)
POST: http://localhost:5000/api/users/auth

 -Пример запроса JSON:
```
{
    "id": "1",
    "email": "user1@gmail.com",
    "role": "user"
}
```
 -Ответ JSON:
```
{
    "token": "eyJhbGciOi...."   
}
```
