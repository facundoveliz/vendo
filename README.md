# 🗒️ Description

This is an application that I made for practicing purposes. Is made with React and Sass in the front-end, Node and Express using MongoDB as database for the back-end.

## Features

- Authentication and validation system, both in the back and the front end
- Ecommerce system for adding products to a cart and purchasing them.
- Admin panel for visualizing, adding, editing and removing users, products and orders.
- User and admin roles, with they respective protected routes.
- Image uploading with AWS Buckets.
- Profile viewing/editing

### Demo

You can visit the website by clicking [here](https://vendo-ecommerce.facundoveliz.monster/).

You can use this example account with admin privileges:

    johndoe@gmail.com:johndoepassword

But please, feel free to register and test the app.

# 📦 Installation

    yarn && yarn --cwd ./client

    yarn dev

Remember to make the .env file following .env.example. If you're in Windows, change **export** to **set** in ./client/package.json
