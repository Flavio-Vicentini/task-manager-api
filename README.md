<h1>Task Manager API</h1>

---

<h2>About</h2>
<p>Project development for The Complete Node.js Developer Course (Udemy) made by Andrew Mead. The project is an API Rest for task management with authentication, sending emails, avatar upload and create,list,update and delete tasks.</p>
<p>The technologies used for the development were NodeJS (Express,Multer,JWT) and MongoDB (Mongoose).</p>



<h2>Getting Started</h2>
<p>To run this project on a developer environment you can follow the steps bellow:</p>

1. Create an account on the site https://sendgrid.com/ and take the API key;
2. Donwload and configure the MongoDB on https://www.mongodb.com/try/download/community;
3. Choose a folder and on terminal execute git clone https://github.com/Flavio-Vicentini/task-manager-api.git;
4. On archive src/emails/account.js insert the email registered in the *from* field of functions *sendWelcomeEmail* and *sendCancelationEmail*;
5. Create a folder on the root called *config* and an archive called *dev.env*;
6. On this archive you have to configure the developer environment writing the following variables:
    * PORT = a port for your server to receive and send requests (Ex: 3000)  
    * SEND_GRID_API_KEY = the api key generated when registering on the sendgrid website
    * JWT_SECRET= any word to generate the JWT signature
    * MONGODB_URL= mongodb://127.0.0.1:27017/your-mongodb-name
7. Finally at the terminal run *npm install* and then *npm run dev*

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
/users/:id/avatar  |  GET    |  -      |          Image File                                                       |      Return user avatar.
/users/me/avatar  |  DELETE    |  -                          |          Status code 200                            |      Delete user avatar.
/tasks  |  POST    |  description, completed (true or false)   |  _id, owner,description,completed,createdAt,updateAt |   Create a new user task.
/tasks  |  GET    |  -                      |  _id, owner,description,completed,createdAt,updateAt for each task    |     List all user tasks.
/tasks/:id  |  GET    |  -                      |  _id, owner,description,completed,createdAt,updateAt              |     List task by id.
/tasks/:id  |  PATCH    |  description,completed   |  _id, owner,description,completed,createdAt,updateAt           |     Update task by id.
/tasks/:id  |  DELETE    |  -                    |  _id, owner,description,completed,createdAt,updateAt           |       Delete task by id.
