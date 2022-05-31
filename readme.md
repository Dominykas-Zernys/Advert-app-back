# Advertise Yourself

'Advertise Yourself' is a web application built using Node.js and React. Its purpose is to let users promote their products, services, events, etc. All users can see the adverts that are submitted to the website, but only registered users can share new adverts. Users can also see only their own adverts in their own user page. You can search for adverts by their title, also filter by category.

When creating a new advert, you can select which style you want them to appear. There are 8 styles in total, with varying color schemes, borders, shadows and fonts. On the home page and user page you can only see the banners(smaller versions of the adverts), only after clicking on one you can see the full advert.

This is the back-end code for the application. The front-end can be found [here](https://github.com/Dominykas-Zernys/ay-app-front). The full running application can also be found on Digital Ocean, [here](https://ay-app-front-4isc7.ondigitalocean.app/).

## Application structure

The back-end of the 'Advertise Yourself' application has the main **server.js** file where server is launched, **route** files where endpoints are described and middleware added, **controllers** that control the request and response functions, and **models** where Sql commands are sent. There is also a **helpers.js** file where all the helper and middleware functions are stored.

## Middleware

For more secure user authentification, **bcryptjs** is used to encrypt and verify passwords, **JWT token** is used for efficient login and logout, **Joi** is used to ensure a valid data is submitted from the client's side and **multer** is used to verify and upload images to database.

## Npm packages

### All packages used in this application:

- bcryptjs
- cors
- dotenv
- express
- image-size
- joi
- joi-image-extension
- jsonwebtoken
- lodash
- morgan
- multer
- mysql2

## Database

The server sends and receives data from mySql database, stored in Digital Ocean. The database consists of 3 tables:

- Users. columns include id, email, username and password;
- Adverts. columns include id, user_id, category_id, image_src, description, email, phone, created_at, short_description, style_id, title and banner_img;
- Categories. columns include id, email, username and password.

## How to use

### In order to use this application:

- Clone or download the master branch of this repository;
- Install npm packages using 'npm install' command in the main folder's terminal;
- Rename '.env.example' file to '.env' and change the angle brackets and text inside them to the variable values.
- Use command 'npm start' to start your application.
