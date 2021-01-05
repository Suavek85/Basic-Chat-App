# Skype-like React.js Chat App with Socket.io

## Description

Simple skype-like chat app with a simple node server. Own idea.

## Steps to run

In your terminal, ```cd server``` and run ```node index.js``` to launch the server on localhost:5000. The server will be listening for the events emitted from the client-side app. Keep the server running and nodemon listening for changes.

Open second terminal making sure you have ```cd app```. Now run ```yarn install``` to install client dependencies. Then, ```yarn run``` to run the chat app on localhost:8000. Voila, the app should be up and running!

Run the app on two or more seperate ports to imitate chat and see all the features of the application.

## App features

General:

- send messages between two or more users on the same channel

Chat UI:

- displays info that a given user's in the process of typing a message,
- displays time and user to all messages sent,
- displays date if first message of the day,
- displays all users who joined the channel, updates when user leaves the channel / disconnects etc.


