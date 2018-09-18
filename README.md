# LiveSafe Full Stack Developer Homework Assessment

------

By [Elijah Offutt](https://elijahoffutt.github.io/porto/)



## Overview 

------

The technologies used in this assessment are Node+Express for the server, Axios for HTTP requests and MongoDB+Mongoose for my data persistence.



## Installation 

------

### MongoDB

For a full list of instructions on how to install and run a MongoDB Server visit the official MongoDB website [here](https://university.mongodb.com/?_ga=2.176296229.1819828306.1534163145-147668577.1533921355). Once you have MongoDB installed, open a command prompt/terminal and run

```js
"mongod"
```

Once you have a the server running, navigate to your MongoDB GUI of choice and add a database named "lvsf" with a collection named "items". You are not ready to connect your serve.

### Server 

Navigate to the, root directory in the project folder. Once you are in the root, run 

```js
npm install 
nodemon app.js
```

Your server will be running on port 5000. Update the mongoose.connection to the proper MongoDB URL and restart. Once the server is running it will detect if the database already has data and if it does not it will auto populate it for you with hacker news items. 

### Front End

Navigate to the angular directory and install angular decencies before running the "ng server" command. Run the front end like you would normally start a angular project and navigate to port 4200. Thanks for installing. 

















