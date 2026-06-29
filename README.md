# Сайт для котокафе "КОфеТерий" в г. Ярославле 
## Стек технологий: 
* Frontend: React, CSS Modules, Typescript
* Backend: Nest.js, PostgreSQL, TypeORM. Argon2 для хэширования паролей, sharp для сжатия фотографий (и перевода в .webp), passport session для авторизации
* Docker-compose для контейнеризации

## Функции приложения: 
В общедоступном модуле: 
* Представление информации о кафе: цены, правила, контакты
* Представление всех живущих в котокафе котиков, а также пристроенных. 
* Интерактивная галерея, в которую любой пользователь может загрузить свои фото (отобразятся после одобрения администратором)
* Функция отправления заявки на пристройство: пользователь заполняет информацию о себе, затем анкету
  
В модуле администратора:
* вход в приложение с помощью логина и пароля; возможность управления пользователями. 
* Редактирование всей размещённой информации: коты, цены, правила, фото в галерее и на стартовой странице
* Редактирование анкеты. Управление заявками. Управление данными о хозяевах и потенциальных хозяевах котов
* Одобрение / отклонение снимков, загружаемых пользователями (и загрузка своих)
## Скриншоты: 
### Главная страница: 
<img width="1891" height="800" alt="image" src="https://github.com/user-attachments/assets/2091fd7d-bdc5-4cfe-a252-91931ef60a37" />
<img width="1888" height="848" alt="image" src="https://github.com/user-attachments/assets/2903434d-dc86-4345-9488-52a02b518e39" />
<img width="1879" height="848" alt="image" src="https://github.com/user-attachments/assets/27d917ed-ec62-4c35-a2e9-9393449d85f9" />
<img width="1883" height="843" alt="image" src="https://github.com/user-attachments/assets/2be6a694-554d-48d7-8548-1910d7051ed4" />

### Страница "Наши котики": 
<img width="1884" height="845" alt="image" src="https://github.com/user-attachments/assets/558f65ce-f505-4eeb-a8a6-5be444185859" />
<img width="1880" height="835" alt="image" src="https://github.com/user-attachments/assets/9db05b68-5734-4e08-8a36-1866819a511f" />

### Страница "Галерея": 
<img width="1879" height="845" alt="image" src="https://github.com/user-attachments/assets/eeee4ff5-97bf-4e57-b915-4de67c6cd69a" />
<img width="1879" height="843" alt="image" src="https://github.com/user-attachments/assets/0fdc7f9b-dce0-4bad-8159-2bdfb0cf6057" />
<img width="1908" height="1000" alt="image" src="https://github.com/user-attachments/assets/5cb1d241-c68b-4ef9-90eb-a05cc0baf2a1" />
<img width="1551" height="162" alt="image" src="https://github.com/user-attachments/assets/57c83abf-6c4f-4a0d-ac16-801dec08324f" />

### Заявка на пристройство 
<img width="1881" height="838" alt="image" src="https://github.com/user-attachments/assets/32bf8e19-a488-4a11-8ebb-2ffea4d4a7ea" />
<img width="1876" height="842" alt="image" src="https://github.com/user-attachments/assets/ab24fde2-d9f6-4953-8081-4e18069d7c1e" />
![Uploading image.png…]()

### Модуль адимнистратора. Вход (логин, пароль) 
<img width="833" height="654" alt="image" src="https://github.com/user-attachments/assets/c8a8273a-88e5-4f7f-82b2-89eff31b0ba5" />
### Котики и их редактирование 
котики (админ)
<img width="1560" height="889" alt="image" src="https://github.com/user-attachments/assets/19854684-c4d9-45bc-a220-de0933fd8777" />
статусы (админ) 
<img width="1568" height="735" alt="image" src="https://github.com/user-attachments/assets/7c7b6728-2cf3-4a40-a3e7-48f7ec3631fe" />
правила (админ) 
<img width="1595" height="837" alt="image" src="https://github.com/user-attachments/assets/43fdf632-a21a-47f7-9b09-103dd7a98c0e" />
заявки (админ)
<img width="1599" height="797" alt="image" src="https://github.com/user-attachments/assets/6d338bc2-1a6a-4ca4-bdcf-7f0ce0d19171" />
вопросы (админ) 
<img width="1584" height="881" alt="image" src="https://github.com/user-attachments/assets/c814ce3f-54a6-4b62-beea-62898e063f4f" />
лэндинг (админ) 
<img width="1543" height="826" alt="image" src="https://github.com/user-attachments/assets/267edbbc-196f-448c-940b-529d7b9c58d8" />
галерея (админ)
<img width="1511" height="713" alt="image" src="https://github.com/user-attachments/assets/00a38595-88b6-434e-aba9-3436f8428abd" />

### Схема базы данных проекта 
<img width="1214" height="828" alt="catCafe" src="https://github.com/user-attachments/assets/1a5a1cf7-68a9-417c-86b4-8ab9947df88d" />
На данный момент приложение находится в разработке, планируется реализация ещё нескольких функций











