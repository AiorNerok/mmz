# server lib:
* aiosqlite==0.17.0
* bcrypt==4.0.0
* databases==0.6.1
* fastapi==0.85.0
* passlib==1.7.4
* pydantic==1.10.2
* python-jose==3.3.0
* SQLAlchemy==1.4.41
* starlette==0.20.4
* uvicorn==0.18.3

# client lib:
* @headlessui/react: ^1.7.2,
* @heroicons/react: ^2.0.11,
* @tailwindcss/forms: ^0.5.3,
* @types/jest: ^27.5.2,
* @types/node: ^16.11.60,
* @types/react: ^18.0.21,
* @types/react-dom: ^18.0.6,
* axios: ^0.27.2,
* framer-motion: ^7.3.6,
* react: ^18.2.0,
* react-dom: ^18.2.0,
* react-router-dom: ^6.4.1,
* react-scripts: 5.0.1,
* recoil: ^0.7.5,
* typescript: ^4.8.3,

# Для запуска server-a:

cmd:
* cd server
* python -m venv venv
* source venv/bin/activate 
* pip freeze > requirements.txt
* uvicorn main:app *reload *host 127.0.0.1 *port 8000

server started on url: http://127.0.0.1:8000/


# Для запуска client-a
* cd client
* npm i
* npm run start

client started on url: http://127.0.0.1:3000/
