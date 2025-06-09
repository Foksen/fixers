# Fixers - Система управления заявками на ремонт

Система для управления заявками на ремонт, разработанная с использованием Django (бэкенд) и Next.js (фронтенд).

## Контейнеризация

Проект контейнеризирован с использованием Docker и Docker Compose. Структура включает:

- **PostgreSQL** - Сервер базы данных
- **Django** - API бэкенда
- **Next.js** - Фронтенд-приложение
- **Nginx** - Веб-сервер и обратный прокси

## Начало работы

### Требования

- Docker и Docker Compose, установленные на вашем компьютере
- Git для клонирования репозитория

### Установка

1. Клонируйте репозиторий:
   ```
   git clone https://github.com/your-username/fixers.git
   cd fixers
   ```

2. Создайте файл `.env` в корневой директории со следующими переменными (измените при необходимости):
   ```
   # Настройки базы данных
   DB_NAME=fixers_db
   DB_USER=fixers_user
   DB_PASSWORD=fixers_password
   DB_HOST=db
   DB_PORT=5432

   # Настройки Django
   SECRET_KEY=your-secret-key-change-in-production
   DEBUG=false
   PRODUCTION=true
   ALLOWED_HOSTS=localhost,127.0.0.1,backend

   # Настройки электронной почты
   EMAIL_HOST_USER=your-email@gmail.com
   EMAIL_HOST_PASSWORD=your-email-password

   # Настройки NextAuth
   NEXTAUTH_URL=http://localhost
   NEXTAUTH_SECRET=your-nextauth-secret-key-change-in-production
   ```

3. Создайте файл `.env` в директории `frontend/fixers-app` с публичными переменными:
   ```
   NEXT_PUBLIC_BACKEND_URL=http://localhost/api
   NEXT_PUBLIC_CLIENT_BACKEND_URL=http://localhost/api
   ```

4. Соберите и запустите контейнеры:
   ```
   docker-compose up -d --build
   ```

5. Приложение должно быть доступно по следующим адресам:
   - Фронтенд: http://localhost/
   - API бэкенда: http://localhost/api/
   - Административный интерфейс: http://localhost/admin/

6. Учетные данные администратора по умолчанию:
   - Логин: admin
   - Пароль: adminpassword

## Разработка

### Локальный запуск без Docker

#### Бэкенд (Django)

1. Перейдите в директорию бэкенда:
   ```
   cd backend
   ```

2. Создайте виртуальное окружение и активируйте его:
   ```
   python -m venv venv
   source venv/bin/activate  # На Windows: venv\Scripts\activate
   ```

3. Установите зависимости:
   ```
   pip install -r requirements.txt
   ```

4. Выполните миграции:
   ```
   cd fixers
   python manage.py migrate
   ```

5. Запустите сервер разработки:
   ```
   python manage.py runserver
   ```

#### Фронтенд (Next.js)

1. Перейдите в директорию фронтенда:
   ```
   cd frontend/fixers-app
   ```

2. Установите зависимости:
   ```
   npm install
   ```

3. Запустите сервер разработки:
   ```
   npm run dev
   ```

### Внесение изменений

- **Бэкенд**: После внесения изменений в код Django перезапустите контейнер:
  ```
  docker-compose restart backend
  ```

- **Фронтенд**: После внесения изменений в код Next.js пересоберите контейнер:
  ```
  docker-compose up -d --build frontend
  ```

## Развертывание в продакшн

Для развертывания в продакшн рекомендуется:

1. Изменить `SECRET_KEY` и `NEXTAUTH_SECRET` на сильные уникальные значения
2. Установить `DEBUG=false` в файле `.env`
3. Обновить `ALLOWED_HOSTS` и `NEXTAUTH_URL`, включив ваше доменное имя
4. Настроить корректные параметры электронной почты
5. Рассмотреть возможность использования стратегии резервного копирования базы данных

