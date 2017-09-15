# Express-JWT-user-authentication-API-bolilerplate
Boilerplate for backend API user authentication with JWT

## Installation

```
npm install
```

## Usage
`npm run dev` will start a development server with [nodemon]()

`npm run prod` will start a production server


## File structure
```
├── app
│   ├── logs             # Contains all the logs
│   ├── models           # Contains all models
│   │   └── User.js      # User model
│   ├── routes           # contains all routes
│   │   ├── api          # where /api/ route functions are stored
│   │   │   └── user.js  # exports route functions to use in private.js or public.js
│   │   ├── index.js     # separates public from private routes with a middleware
│   │   ├── private.js   # contains all private routes
│   │   └── public.js    # contains all public routes
│   ├── server.js        # where the server starts and routes for the root path
│   └── utils.js         # useful functions used in the entire application
├── config.js            # where all JWT, Winston, Mongoose,... config goes
├── index.js             # entry point, where mongoose connects to mongodb
├── public               # public directory, should be used for serving static assets
│   └── index.html
```
## Static routes
`/` will serve files from `/public`

## Public Routes
**POST** `/api/register`

Parameters:
1. `email` **unique**
2. `first_name`
3. `last_name`
4. `password`

**POST** `/api/login`

Parameters:
1. `email`
2. `password`
Returns:
`token` jwt token

## Private Routes
In order to access private routes you **MUST** pass the `token` parameter that is given when logging in.

**GET** `/api/user` - Returns the user from the database, useful for refreshing user data.

**POST** `/api/user` - Updates user data

Parameters:

Any user field that you want to update, `_id`, `meta` and `__v` will be ignored.

**DELETE** `/api/user` - Deletes the user

