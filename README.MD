<p align="center">
     <img src="https://i.postimg.cc/158kKTHz/logoblanja.png"   alt= border="0" />

</p>

<p align="center">
    <br />
    <br />
    <br />
    <a href="https://fe-ecommerce-blanja.vercel.app/login">View Demo</a>
    ·
    <a href="https://github.com/CandaMuammal/BackEnd-Ecommerce-Blanja/issues">Report Bug</a>
    ·
  </p>


---


## Contents

- [About](#about)
- [Packages](#Packages)
- [Installation](#installation)
- [Endpoint](#endpoint)
- [Authors](#authors)

##  About

<p align="justify">Blanja is an ecommerce website that'll allows you (customers) to buy something sold by the sellers. The customers can add their picked items to the cart and then go to the checkout page to pay everything that's in the cart.
The sellers will send your items to the address that the customers filled in the profile page. So with this kind of apps, will make us easier to shop online.
</p>

##  Packages


#### Built Wth
- ExpressJs
- NodeJs
- MySQL
- JWT

#### Packages (Backend)
      "bcrypt": "^5.0.1",
    "bcryptjs": "^2.4.3",
    "cookie-parser": "^1.4.5",
    "cors": "^2.8.5",
    "dotenv": "^10.0.0",
    "eslint": "^7.30.0",
    "express": "^4.17.1",
    "http-errors": "^1.8.0",
    "ip": "^1.1.5",
    "jsonwebtoken": "^8.5.1",
    "md5": "^2.3.0",
    "morgan": "^1.10.0",
    "multer": "^1.4.2",
    "mysql2": "^2.2.5",
    "nodemailer": "^6.6.3",
    "redis": "^3.1.2",
    "uuid": "^8.3.2"


## Installation

- Clone This Repo to your local

```
git clone https://github.com/CandaMuammal/BackEnd-Ecommerce-Blanja
```

- Go To Folder Repo

```
cd BackEnd-Ecommerce-Blanja
```

- Install Module

```
npm install
```

- Type ` npm start` To Start Website

<br/>

## Blanja Ecommerce - Frontend

:rocket: [`Frontend Blanja Ecommerce`](https://github.com/CandaMuammal/FE-Ecommerce-Blanja)

<br/>

## Endpoint


#### Product Endpoint

|  METHOD  |             API             |                    ACTIONS                    |
| :------: | :-------------------------: | :-------------------------------------------: |
|  `DELETE`   |       /delete/:id       |               delete product           |
|  `POST`   |           /product/     |               add product             |
|  `GET`   |       /product/:id      |              get product by id             |
| `PUT` |       /product/:id        |            update product           |
| `GET` |       /product        |             get all product           |


#### History Endpoint

|  METHOD  |             API             |                    ACTIONS                    |
| :------: | :-------------------------: | :-------------------------------------------: |
|  `DELETE`   |       /history/:id       |               delete history           |
|  `POST`   |           /history/     |               add history             |
|  `GET`   |       /history/:id      |              get history by id             |
| `PUT` |       /history/:id        |            update history           |
| `GET` |       /history        |             get all history           |

#### User Endpoint

|  METHOD  |             API             |                    ACTIONS                    |
| :------: | :-------------------------: | :-------------------------------------------: |
|  `POST`   |       /user/registerCustomer/       |              register user customer           |
|  `POST`   |       /user/registerSeller/       |              register user seller          |
|  `POST`   |           /user/login     |               login user             |
|  `GET`   |       /user/:id      |              get user by id             |
| `PUT` |       /user/  :id    |            update user           |


## Authors

:rocket: [Canda Muammal](https://github.com/CandaMuammal)
