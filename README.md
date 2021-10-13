# simple-auth-app
Simple role based authentication app with MERN stack for Ecologital.

Here are the steps that you need to follow to run the app on your machine, Incase you need

there are 4 git branches including the main.
1. main  -> which include nothing
2. app-frontend   ->  this branch includes the frontend app
3. app-backend   ->   this branch includes the backend app
4. app  ->  this branch includes the full-stack app (merged - app-frontend & app-backend)

1. Clone the repository and switch to the branch app.
2. Run "npm install" from the root of project directory.
3. Navigate to the client directory which is inside of the root directory and Run "npm install".
4. Set your mongo database connection string in config.env file which is in config folder inside the root directory.
5. To start the development servers simultaneously for both backend and frontend, Run "npm run dev" from the root directory.

OR

You can run frontend and backend separately,
commands:
1. frontend-only  ->  Run "npm start" from the client directory.
2. backend-only   ->  Run "npm run server" from the root directory.
