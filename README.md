# DigUp-Backend

**DigUp** is Dartmouth’s first lost and found listing website designed to help users recover lost items. Over our time at Dartmouth, many of us have personally experienced or witnessed those around us lose expensive, often devastatingly personal, articles including jackets, car keys, and bikes. Based off the necessity and the goodwill of student hearts here at Dartmouth, our team plans to create a web application that expedites the lost&found process and return lost items in an efficient and organized fashion, all the while preserving anonymity (if desired). With the implementation of DigUp within the Dartmouth sphere, victims of forgetfulness seeking aid and those looking to complete their one good deed for the day are now able to integrate their objectives with the benefits going to both parties. Especially with the hectic influx of incoming freshman, outgoing seniors, and in between off-termers, our website would ameliorate the stress and reduce the anxiety of accidentally losing a valuable heirloom during the vulnerable transitioning phase and provide all students with a sense of ease knowing that DigUp is working around the clock to watch their backs.

## Sample Screenshots

Signin Page
![Signin Page](/img/Signin.png)

Signup Page
![Signup Page](/img/Signup.png)

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
Using Travis Cl to run automatic linting and automatic pushes to surge, Eslint with Airbnb config, and git-hooks to reduce the chances of accidentally ruining the repositories.


TODO:  descriptions of code organization and tools and libraries used

## Setup

TODO: how to get the project dev environment up and running, npm install etc

## Deployment

### Front End

After pushing to github, type command `npm run deploy` into console, and the website would be built and deployed to the default domain https://digup.surge.sh

### Back End

* The backend app for Digup is deployed at https://digup.herokuapp.com/api
* Heroku app has been set up to be connected to GitHub with automatic deploys. Whenever a pull-request is merged into master branch for server component, Heroku will pick up the change. Also, Heroku only updates if the Travis tests have completed successfully.

## Authors

Brian Francis, Adam Philipps, James Wang, James Edwards, Weijia Tang

## Acknowledgments
