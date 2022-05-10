# Penn Marketplace

## Description
A Penn exclusive marketplace where people within the community can buy and sell goods and services to each other.

## Table of Content
1. [Problem Statement](#problem-statement)
2. [Features](#features)
3. [Project Folder Structure](#project-folder-structure)
4. [How to Run the Project](#how-to-run-the-project)
5. [Technologies](#technologies)
6. [Mobile App](#mobile-app-version)
7. [Additional)(#additional)
8. [Credit](#credit)


## Problem Statement
Over the course of the years, many students buy and use a multitude of items and services. We believe that recycling some of these items and services through the Penn community would help reduce waste to the environment while connecting students to cheaper options for their educational needs. Since buyers and sellers are from the same Penn community, this app would lower costs for students looking to buy something (e.g. used textbooks, workbooks, clothes, furniture, etc…).

Furthermore, there are a variety of platforms and websites that students usually list their items on, oftentimes leading to meetups with strangers. By using our app, we can limit the transaction population to the Penn community and reduce the risk of “shady” meetups.

## Features
* Users can create an account and signup with their Penn credentials
* Users can login into their account with their Penn email and password
  * Users will be locked out of their account for 30 minutes if they enter their password incorrectly more than 3 times
  * Users can reset their password if they forgot their password
* Users can access their dashboard to:
  * View their own profile information
  * View their transaction history
  * View their reviews from other users
  * View their followers
  * View their blocked users
  * Search for users to follow
* Users can post two types of listings:
  * A regular listing with a set price
  * A bid listing with a bidding price that the seller can accept
* Users can add images, descriptions, and tags to listings
* Users can view the most recent listings on the homepage
* Users can search for items using the search bar
  * Users can create tagged searches by applying search tags
* Users can add items to the watchlist
* Users can add items to their shopping cart
* Users can checkout their shopping cart and commit a transaction
* Users can message other users that they follow or users that follow them
* Users will be notified in real time when:
  * Another user messages them
  * Another user follows them
  * Another user buys one of their items
  * A seller accepts their bid on an item
* Users have the ability to delete their account


## Project Folder Structure
    .
    ├── backend
    │   ├── middleware                         
    │   ├── models                            
    │   ├── routes                            
    │   ├── package.json
    │   ├── server.js
    ├── frontend
    │   ├── public
    │   ├── src
    │   │   ├── login
    │   │   │   ├── components
    │   │   │   ├── data
    │   │   │   ├── images
    │   │   ├── account
    │   │   │   ├── assets
    │   │   │   ├── components
    │   │   ├── buyer
    │   │   │   ├── assets
    │   │   │   ├── components
    │   │   │   ├── styles
    │   │   ├── homepage
    │   │   │   ├── assets
    │   │   │   ├── components
    │   │   │   ├── styles
    │   │   ├── searchbar
    │   │   │     ├── assets
    │   │   │     ├── components
    │   │   ├── seller
    │   │   │     ├── assets
    │   │   │     ├── components
    │   │   │     ├── styles
    │   │   ├── App.js
    │   │   ├── index.js
    │   ├── package.json
    └── README.md
    
  ## How to Run the Project
  ```
  git clone the-repository
  cd backend
  npm install
  npm start
  cd frontend
  npm install
  npm start
  ```
  The project should run on localhost:3000 and the server is ran on localhost:8080
  
  ## Technologies
  The project was built with the following technologies:
-   MongoDB
-   Mongoose
-   Express.js
-   Axios
-   Bcrypt
-   React
-   React Bootstrap
-   React Router
-   Node.js
-   Nodemon
-   Jest
-   React Testing Library
-   Cypress

## Mobile App Version
https://github.com/cis350/project-penn-marketplace-mobile

## Additional
Wireframes/Prototypes: https://www.figma.com/file/marQmxMbckwwOOu7QvdPoF/Sprint-2-Wireframes?node-id=0%3A1
API Documentation: https://app.swaggerhub.com/apis/cis350-penn-mp/CIS350-Team22-Penn-Marketplace-API/1.0.0

## Credit
| Name      | GitHub Username |
| ----------- | ----------- |
| Raymon Shi      | [raymon-shi](https://github.com/raymon-shi)       |
| Cindy Chen   | [cindych](https://github.com/cindych)        |
| Harrison Ly   | [hly8](https://github.com/hly8)        |
| Damon Luong   | [damon-luong](https://github.com/damon-luong)        |
| Fei Liu   | [FeiLCube](https://github.com/FeiLCube)        |

