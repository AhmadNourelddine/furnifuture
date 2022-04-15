<img src="./readme/title1.svg"/>

<div align="center">

>FurniFuture is a website to buy and sell furniture online while being able to connect with shipping services.  

**[PROJECT PHILOSOPHY](https://github.com/julescript/well_app#-project-philosophy) • [WIREFRAMES](https://github.com/julescript/well_app#-wireframes) • [TECH STACK](https://github.com/julescript/well_app#-tech-stack) • [IMPLEMENTATION](https://github.com/julescript/well_app#-impplementation) • [HOW TO RUN?](https://github.com/julescript/well_app#-how-to-run)**

</div>

<br><br>


<img src="./readme/title2.svg"/>

>Users can search for furniture and shipping services, both of which can be added to the cart.
>
>The website gives space to those who provide shipping services to create shipping accounts, taking part in the available shipping services on the website.

### User Stories
- As a user, I want to browse furniture for sale, so that I can find the product I seek for
- As a user, I want to sell my used furniture to find a quick purchase
- As a user, I want to promote my furniture shipping service, so that I can find more clients online

<br><br>

<img src="./readme/title3.svg"/>

> This design was planned before on paper, then moved to Figma app for the fine details.
Note that i didn't use any styling library or theme, all from scratch and using pure css modules

| Landing  | Buy  |
| -----------------| -----|
| ![Landing](./readme/pages-figma/figma-about-page.png)| ![Buy](./readme/pages-figma/buy-page-figma.png) |


<br><br>

<img src="./readme/title4.svg"/>

Here's a brief high-level overview of the tech stack the Well app uses:

- This project uses ["ReactJs"](https://reactjs.org/) Library for the frontend.
- For persistent storage (database), the app uses ["MongoDB"](https://www.mongodb.com/).
- This project uses ["Laravel"](https://laravel.com/) FrameWork for the backend.
- To query and manipulate data from MongoDB, this project uses ["Jenssengers"](https://jenssegers.com/) This library extends the original Laravel classes, so it uses exactly the same methods.
- For Push notification, this project uses ["Firebase Cloud Messaging"](http://firebase.google.com/) for realtime database.                
- The website uses the font ["Poppins"](https://fonts.google.com/specimen/Poppins) as its main font, and the design of the app adheres to the material design guidelines.



<br><br>
<img src="./readme/title5.svg"/>

> Uing the above mentioned tech stacks and the wireframes build with figma from the user sotries we have, the implementation of the app is shown as below, these are screenshots from the real app


| Landing  | Buy  |
| -----------------| -----|
| ![Landing](./readme/pages/About-page.png) | ![Buy](./readme/pages/buy-page.png) |



<hr/>


| Buy  | Add to Cart  |
| -----------------| -----|
| ![Buy](./readme/pages-gif/buy-page-gif.gif)| ![Add to Cart](./readme/pages-gif/open-furniture-modal.gif) |

| Cart  | Purchase |
| -----------------| -----|
| ![Cart](./readme/pages-gif/navigate-cart-gif.gif) | ![Purchase](./readme/pages-gif/navigate-cart-gif.gif) |

| Delivery  | Click Create Button  |
| -----------------| -----|
| ![Delivery](./readme/pages-gif/click-create-delivery-profile.gif) | ![Click Create Button](./readme/pages-gif/delivery-page-gif.gif) |

| Create Shipping Profile |  Shipping Profile  |
| -----------------| -----|
| ![Create Shipping Profile](./readme/pages-gif/create-shipping-profile-gif.gif) | ![Shipping Profile](./readme/pages-gif/shipping-profile-gif.gif) |



<!-- <div align="center">

  <p>Search Furniture in Buy Page and Purchase in Cart Page</p>
  <img src="./readme/pages-gif/buy-page-gif.gif" width="33%"/>
  <img src="./readme/pages-gif/open-furniture-modal.gif" width="33%"/>
  <img src="./readme/pages-gif/purchase-gif.gif" width="33%"/>
 
  <p>Delivery Page</p>
  <img src="./readme/pages-gif/delivery-page-gif.gif" width="45%"/>
  <img src="./readme/pages-gif/click-create-delivery-profile.gif"  width="45%"/>
  
  <p>Cart Page</p>
  <img src="./readme/pages-gif/cart-gif-gif.gif"  width="45%"/>
  <img src="./readme/pages-gif/navigate-cart-gif.gif"  width="45%"/>
   
  <p>Shipping Profile</p>
  <img src="./readme/pages-gif/create-shipping-profile-gif.gif"  width="45%"/>
  <img src="./readme/pages-gif/shipping-profile-gif.gif"  width="45%"/>

</div> -->

<br><br>
<img src="./readme/title6.svg"/>

> This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo
   ```sh
   git clone https://github.com/AhmadNourelddine/furnifuture.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `config.js`
   ```js
   const API_KEY = 'ENTER YOUR API';
   ```

