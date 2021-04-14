<h1>Task Manager API</h1>

---

<h2>About</h2>
<p>Project development for The Complete Node.js Developer Course (Udemy) made by Andrew Mead. The project is an API Rest for task management with authentication, sending emails, avatar upload and create,list,update and delete tasks.</p>



<h2>Getting Started</h2>
<p>To run this project you can follow the steps bellow:</p>
1. Create an account on the site https://sendgrid.com/ and take the API key.
2. Donwload and configure the MongoDB on https://www.mongodb.com/try/download/community.
3. 

<h2>Routes</h2>

Route         | Method   |  Body (JSON)              |     Response                                                |      Functionality
------        | -------  |  ----                     |     --------                                                |      --------
/users        |  POST    | name, email, password     |     age, _id, name, email, createdAt, updatedAt, token      |      Create the new user if doesn't exists.
/users/login  |  POST    | email, password           |     age, _id, name, email, createdAt, updatedAt, token      |      Logs the user on server.
/users/logout  |  POST    |              -           |                  Status code 200                            |      Logouts the user on server.
/users/logoutAll  |  POST    |              -        |                  Status code 200                            |      Logouts all user clients on server.
/users/me  |  GET    |              -                |                age, _id, name, email, createdAt, updatedAt  |      Return all user profile information.
/users/me  |  PATCH    |  name, email, password,email      |          age, _id, name, email, createdAt, updatedAt  |      Update all user profile information.
/users/me  |  DELETE    |  -                         |          age, _id, name, email, createdAt, updatedAt        |      Delete user profile.
/users/me/avatar  |  POST    |  Form-Data Image File(jpg,jpeg e png)      |          Status code 200               |      Upload user avatar.
/users/me/avatar  |  DELETE    |  -                          |          Status code 200                            |      Delete user avatar.
/tasks  |  POST    |  description, completed (true or false)   |  _id, owner,description,completed,createdAt,updateAt |   Create a new user task.
/tasks  |  GET    |  -                      |  _id, owner,description,completed,createdAt,updateAt for each task    |     List all user tasks.
/tasks/:id  |  GET    |  -                      |  _id, owner,description,completed,createdAt,updateAt              |     List task by id.
/tasks/:id  |  PATCH    |  description,completed   |  _id, owner,description,completed,createdAt,updateAt           |     Update task by id.
/tasks/:id  |  DELETE    |  -                    |  _id, owner,description,completed,createdAt,updateAt           |       Delete task by id.
