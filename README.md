# DigUp-Backend

**DigUp** is Dartmouth’s first lost and found listing website designed to help users recover lost items. Over our time at Dartmouth, many of us have personally experienced or witnessed those around us lose expensive, often devastatingly personal, articles including jackets, car keys, and bikes. Based off the necessity and the goodwill of student hearts here at Dartmouth, our team plans to create a web application that expedites the lost&found process and return lost items in an efficient and organized fashion, all the while preserving anonymity (if desired). With the implementation of DigUp within the Dartmouth sphere, victims of forgetfulness seeking aid and those looking to complete their one good deed for the day are now able to integrate their objectives with the benefits going to both parties. Especially with the hectic influx of incoming freshman, outgoing seniors, and in between off-termers, our website would ameliorate the stress and reduce the anxiety of accidentally losing a valuable heirloom during the vulnerable transitioning phase and provide all students with a sense of ease knowing that DigUp is working around the clock to watch their backs.

## Sample Screenshots

Signin Page
![Signin Page](/img/Signin.png)

Signup Page
![Signup Page](/img/signup.png)

Main Screen
![main screen](/img/mainScreen.png)

Post
![post](/img/Post.png)

New Post
![new post](/img/newPost.png)

Messages
![messages](/img/messages.png)

Profile
![profile](/img/Profile.png)

## Architecture

TODO:  descriptions of code organization and tools and libraries used

Using Travis Cl to run automatic linting and automatic pushes to surge, Eslint with Airbnb config, and git-hooks to reduce the chances of accidentally ruining the repositories.






Libraries used in the front end:

`   "axios": "^0.13.1",
    "dropzone": "^4.3.0",
    "immutable": "^3.8.1",
    "jquery": "^3.1.0",
    "react": "^15.2.1",
    "react-dom": "^15.2.1",
    "react-dropzone": "^3.5.3",
    "react-redux": "^4.4.5",
    "react-router": "^2.5.2",
    "redux": "^3.5.2",
    "redux-thunk": "^2.1.0"`

Libraries used in the back end:

`    "aws-sdk": "^2.5.2",
    "babel-cli": "^6.11.4",
    "babel-preset-es2015": "^6.9.0",
    "babel-preset-stage-2": "^6.11.0",
    "bcrypt-nodejs": "0.0.3",
    "body-parser": "^1.15.2",
    "cors": "^2.7.1",
    "dotenv": "^2.0.0",
    "express": "^4.14.0",
    "jwt-simple": "^0.5.0",
    "mongoose": "^4.5.8",
    "passport": "^0.3.2",
    "passport-jwt": "^2.1.0",
    "passport-local": "^1.0.0"`


## Setup

### Front End Dev Environment

First, run `npm install` to fetch all the webpack dependencies.

Then `npm start` will start the front end website on http://localhost:8080.

### Back End Dev Environment

`npm run dev` will start the backend app on http://localhost:9090 in dev reloading mode.

Remember to change the server api url to
 `const ROOT_URL = 'http://localhost:9090/api';`

Also run the `mongod &` process in background, which the node app will connect to.


## Deployment

### Front End

After pushing to github, type command `npm run deploy` into console, and the website would be built and deployed to the default domain https://digup.surge.sh

### Back End

* The backend app for Digup is deployed at https://digup.herokuapp.com/api
* Heroku app has been set up to be connected to GitHub with automatic deploys. Whenever a pull-request is merged into master branch for server component, Heroku will pick up the change. Also, Heroku only updates if the Travis tests have completed successfully.

## Authors

Brian Francis, Adam Philipps, James Wang, James Edwards, Weijia Tang

## Acknowledgments
