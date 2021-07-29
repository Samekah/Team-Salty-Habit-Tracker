# Habitual

Pre-Requisites
=======================
- Have docker installed on your machine
- Have node and http-server installed

Installation
=======================

Backend

1. Clone the repository
2. cd into the repo folder
3. Spin up the dev servers by running `docker compose up`
4. Wait for all docker containers to be ready (look for the following log messages)
  - debug_dev_db (database system is ready to accept connections)
  - debug_dev_api (Express now departing from port 3000!)
5. Create a `.env` file inside the api folder with a key of `ACCESS_TOKEN_SECRET`

Frontend

1. cd into the client folder
2. run http-server to start the server o port 8080


Usage
=======================

Front End
1. Open a browser 
2. Navigate to http://localhost:8080
3. Click register to navigate to the sign up page
4. Enter the form and click Register (this will also log you in)
5. Dashboard displays your current habits and streaks
a. To mark a habit as complete for the day click the +
b. To set up a new habit click Add A habit

Add A Habit
1. Choose a category
2. Choose a habit
3. Choose a frequency
4. Choose a start date
5. Submit - this will save your habit and return you to the dashboard


Available APIs
#### GET
- `/` - Greeting message
- `/category` - Retrieve all habit categories
- `/habit` - Retrieve all habits
- `/habit/{id}` - Retrieve a single habit by id
- `/category/{id}` - Retrieve a single category by id
- `/user/{username}/` - Retrieve a user id by username
- `/user/{id}/habit` - Retrieve a user habits by id

#### POST

- `/auth/register` - Create a user 
    This requires a json payload in the following format...
    ```
    {
        "username": "",
        "email": "",
        "first_name": "",
        "last_name": "",
        "password": ""
    }
    ```

- `/auth/login` - Authenticate and create a JWT
    This requires a json payload in the following format...
    ```
    {
        "username":"",
        "password":""
    }
    ```

- `/user/{id}/habit` - Create a new user habit
    This requires a json payload in the following format...
    ```
    {
        "habitId": "",
        "frequencyId": "",
        "startDate": ""
    }
    ```

startDate is in YYYY-MM-DD format

- `/user/{id}/habit/{userHabitId}` - Create a completion record for a user habit
    This requires no json payload and will create a record for today's date

######## CHANGELOG ##########

- setup backend server with express
- add docker code to run a postgres db
- setup scripts for db
- add register and login pages
- add generic auth code
- create user models and methods
- add login and register routes
- add welcome splash screen
- basic dashboard page with initial elements
- auth route and logic
- habit create page
- model and methods for categories
- JWT implemented
- routes and controllers for categories
- habits by category route added
- improve user routes
- welcome page carousel added
- dashboard js functionality  
- splashscreen, register and login styling
- user habits models and routes
- connect create a habit to API
- quote of the day added to dashboard
- create a habit button generation logic
- added code for heroku deployment
- connect dashboard with user habit endpoint
- add frequency model and routes
- register validation
- UI tweaks
- create a habit logic added 
- update README


########### BUGS / OUTSTANDING DEV ###########

- [] Error Reporting on the login and register page
- [] Settings page to allow changes to user details
- [] Logic to refresh JWTs
- [] Testing suite
- [] Improve server side validation