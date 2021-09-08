<p align="center">
     <img src="https://i.postimg.cc/WpmxhFCx/zwallet6.png"   alt= border="0" />

</p>


---

##  About

Zwallet is a digital wallet apps that will really helps you to manage your e-money. Using Zwallet you'll be allowed to do some transaction with only a few taps on your screen. In other words, with this apps you can easily save money, transfer it to other, and also top up some moneys and add them to your Zwallet's balance.

##  Build With

- ReactJs
- Redux
- ExpressJs
- NodeJs
- MySQL
- JWT

#### Packages (Backend)
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^10.0.0",
    "express": "^4.17.1",
    "express-fileupload": "^1.2.1",
    "http-errors": "^1.8.0",
    "jsonwebtoken": "^8.5.1",
    "morgan": "^1.10.0",
    "multer": "^1.4.2",
    "mysql2": "^2.3.0",
    "nodemailer": "^6.6.3",
    "nodemon": "^2.0.9",
    "redis": "^3.1.2",
    "uuid": "^8.3.2",
    "xendit-node": "^1.14.0"

#### Packages (Frontend)
    "axios": "^0.21.1",
    "bootstrap": "^5.0.2",
    "chart.js": "^3.5.0",
    "jspdf": "^2.3.1",
    "prop-types": "^15.7.2",
    "react": "^17.0.2",
    "react-bootstrap": "^2.0.0-beta.4",
    "react-chartjs-2": "^3.0.4",
    "react-dom": "^17.0.2",
    "react-hook-form": "^7.12.2",
    "react-pin-input": "^1.0.1",
    "react-redux": "^7.2.4",
    "react-router-dom": "^5.2.0",
    "react-scripts": "4.0.3",
    "react-toastify": "^7.0.4",
    "redux-logger": "^3.0.6",
    "redux-thunk": "^2.3.0",
    "styled-components": "^5.3.0",
    "styled-media-query": "^2.1.2",
    "web-vitals": "^1.0.1"


##  How To Install?

- Clone These 2 Repos (Backend and Frontend)

```
git clone https://github.com/19damah23/Backend-mWallet
git clone https://github.com/dwinovic/zwallet

```

- Go To Folder Repo

```
cd zwallet-frontend
cd Backend-mWallet
```

- Install Module

```
npm install
```

- Type ` npm start` To Start Website


## API_URL Endpoint

#### Auth Endpoint

|  METHOD  |             API             |                    ACTIONS                    |
| :------: | :-------------------------: | :-------------------------------------------: |
|  `POST`  |       /auth/register       |      Register user       |
|  `GET`  | /auth/activate/:token |  Activation email and get token from email  |
|  `POST`  |        /auth/login         |        Sign in with your verified account        |
|  `POST`  |   /auth/setpin/:id    | Set pin for further transactions |


#### Users Endpoint

|  METHOD  |             API             |                    ACTIONS                    |
| :------: | :-------------------------: | :-------------------------------------------: |
|  `GET`   |       /users/:id       |              Get user by id             |
|  `GET`   |           /users            |               Get all users             |
|  `PATCH`   |       /users/:id       |              Edit phone number              |
|  `PATCH`   |       /users/avatar/:id       |              Edit avatar by id             |
|  `PATCH`   |       /users/password/:email       |              Edit password by email              |
| `DELETE` |       /users/:id        |             Delete user by id           |


#### Transaction Endpoint

|  METHOD  |       API        |          ACTIONS           |
| :------: | :--------------: | :------------------------: |
|  `POST`  |    /transactions    | Transfer money |
|  `GET`   | /transactions/history/:userId|    Get list transactions  |
|  `GET`   | /transactions/:userId |    Get transactions detail    |
|  `POST`   | /transactions/addvirtualacount/:userId |    Create virtual account    |
|  `POST`   | /transactions/topup |    Topup money    |


## Screenshots

### Customer Page

<p align="center">
  <span>
   <img src="https://i.postimg.cc/cCjZ0GLg/home.png"   alt= border="0" />

  </span>
</p>

### Admin Page

<p align="center">
  <span>

  </span>
</p>