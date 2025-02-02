# Skype-like React.js Chat App with Socket.io

## Description

Simple skype-like chat app with a simple node server. Own idea. WIP

## Steps to run the repo

In your terminal, ```cd server``` and run ```node index.js``` to launch the server on localhost:5000. 
The server will be listening for the events emitted from the client-side app. 
Keep the server running and nodemon listening for changes.

Open second terminal making sure you have done ```cd app```. 
Now run ```yarn install``` to install client dependencies. 
Then, ```yarn run``` to run the chat app on localhost:8000. 
Voila, the app should be up and running!

Run the app on two or more seperate ports to imitate chat and see all the features of the application.

## Steps to demo live

Simple live demo https://chatapp32.web.app/ (front end on Firebase, backend on Heroku). 

Open in two tabs to imitate user interaction.


## App features

General:

- send messages between two or more users on the same channel

Home UI:

- display active chat rooms,
- join a room: create a new one or pick an existing one,
- add username before joining,

Chat UI:

- display info that a given user's in the process of typing a message,
- display time and user to all messages sent,
- display date if first message of the day,
- display all users who joined the channel, updates when user leaves the channel / disconnects etc.