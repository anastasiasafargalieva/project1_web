# project1_web
This is a project 1 of Web SoftWare developmnet course. 
The application can be tried here: https://project1-anastasia-safargaliev.herokuapp.com/projects
To run the application locally use ElephantSQL service and include your database information in the app.js file in the following order:

const client = new Client({
  hostname: "hostname-possibly-at-elephantsql.com",
  database: "database-name",
  user: "user-name-typically-same-as-database-name",
  password: "password",
  port: 5432,
});

For submission purposes database information is changed to following: 

const CONCURRENT_CONNECTIONS = 2;
const connectionPool = new Pool({
}, CONCURRENT_CONNECTIONS);

The application is launched using a file called app.js, which is in the root folder.
