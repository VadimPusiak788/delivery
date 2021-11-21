1) Встановіть потрібні Python бібліотеки.
Щоб не використовувати глобальні бібліотеки, використовуємо venv.

```bash
$ python -m venv env
$ source env/bin/activate # якщо у вас Linux і bash*
$ pip install -r requirements.txt
```
* якщо у вас не Linux і bash, шукайте команду для активаціі venv тут
https://docs.python.org/3/library/venv.html

2) Запустіть міграції Django
```bash
$ python manage.py migrate
```

3) Запустіть збірку js
```bash
$ cd frontend
$ npm run dev
```

4) Запустіть Django сервер
```bash
$ cd ..
$ python manage.py runserver
```

5) Відкривайте http://localhost:8000/test у браузері
