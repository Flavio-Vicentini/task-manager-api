<h1>Task Manager API</h1>

---

<h2>About</h2>
<p>Project development for The Complete Node.js Developer Course (Udemy) made by Andrew Mead. The project is an API Rest for task management with authentication, sending emails, avatar upload and create,list,update and delete tasks.</p>

<h2>Routes</h2>

Route         | Method   |  Body (JSON)              |     Response                                                |      Functionality
------        | -------  |  ----                     |     --------                                                |      --------
/users        |  POST    | name, email, password     |     age, _id, name, email, createdAt, updatedAt, token      |      Create the new user if doesn't exists.
/users/login  |  POST    | email, password           |     age, _id, name, email, createdAt, updatedAt, token      |      Logs the user on server.
/users/logout  |  POST    |              -           |                  Status code 200                            |      Logouts the user on server.
/users/logoutAll  |  POST    |              -        |                  Status code 200                            |      Logouts all user clients on server.
/users/me  |  GET    |              -                |                age, _id, name, email, createdAt, updatedAt  |      Return all user profile information.
