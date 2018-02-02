# JWT-user-authentication-API-bolilerplate

[![Build Status](https://travis-ci.org/alexcambose/JWT-user-authentication-API-bolilerplate.svg?branch=master)](https://travis-ci.org/alexcambose/JWT-user-authentication-API-bolilerplate)

Express JSON API with JWT user authentication.

## Installation

```
npm install
```

## Usage
`npm run dev` will start a development server with [nodemon](https://nodemon.io/)

`npm run prod` will start `NODE_ENV=production` production server

## File structure
```
├── app
│   ├── controllers
│   │   └── user.js         # Exports functions to use in routers
│   ├── logs                # Contains all the logs
│   ├── models              # Contains all models
│   │   └── User.js         # User model
│   ├── routes              # contains all routes
│   │   ├── api             # where /api/ routes are stored
│   │   │   ├── index.js    # separates public from private routes with a middleware
│   │   │   ├── private.js  # contains all private routes
│   │   │   └── public.js   # contains all public routes
│   │   └── index.js        # where / routes are stored
│   ├── server.js           # where the server starts and routes for the root path
│   └── utils.js            # useful functions used in the entire application
├── config.js               # where all JWT, Winston, Mongoose,... config goes
├── index.js                # entry point, where mongoose connects to mongodb
├── public                  # public directory, should be used for serving static assets
│   └── index.html
```
## Static routes
`/` will serve files from `/public`

## Public Routes
**POST** `/api/user/register`

Parameters:
1. `email` **unique**
2. `first_name`
3. `last_name`
4. `password`

**POST** `/api/user/login`

Parameters:
1. `email`
2. `password`

Returns:

* `user` user object
* `token` jwt token

## Private Routes
In order to access private routes you **MUST** pass the `token` parameter that is given when logging in.

**GET** `/api/user` - Returns the user from the database, useful for refreshing user data.

**POST** `/api/user` - Updates user data

Parameters:

Any user field that you want to update, `_id`, `meta` and `__v` will be ignored.

**POST** `/api/user/checkpassword` - Returns true if the provided *password* is the same as the user's one

Parameters:
`password` Current user password that you want to check.


**DELETE** `/api/user` - Deletes the user

## Examples
**Login** example
```js
fetch('http://localhost:3000/api/user/login', {
        method: 'POST',
        body: JSON.stringify({
            email: 'someemail@domain.com',
            password: 'thepassword'
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(res => res.json())
    .then(res => {
        if(res.success){ // {success: true, user: {...}, token: "..."}
            localStorage.setItem('token', res.token);
            localStorage.setItem('user', JSON.stringify(res.user)); // *optional*
        }else{ // {success: false, message: "..."}
            console.log(res.message);
        }
    })
    .catch(error => {
        // some server error
        console.log("Error connecting to server: " + error);
    });
```

**Update user**
```js
 fetch('http://localhost:3000/api/user', {
        method: 'POST',
        body: JSON.stringify({
            token: localStorage.getItem('token'),
            first_name: 'Jomajino'
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(res => res.json())
    .then(res => {
        if(res.success){ // {success: true}
            //update the user in local storage
            let user = JSON.parse(localStorage.getItem('user'));
            user.first_name = 'Jomajino';
            localStorage.setItem('user', JSON.stringify(user));
        }else{ // {success: false, message: "..."}
            console.log(res.message);
        }
    })
    .catch(error => {
        // some server error
        console.log("Error connecting to server: " + error);
    });
```
