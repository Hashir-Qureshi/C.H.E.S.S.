# C.H.E.S.S. (Computerized.Homework.Exercise.SyStem.)

## Installations

After cloning the repo, the following commands can be run from the root folder:

`npm run server-install`: installs all dependencies for the back-end api server.

`npm run client-install`: installs all dependencies for the front-end React client.

## Running Development Servers

We recommend running both back-end and front-end servers simultaneosly using the command `npm run dev` from the root folder.

This will use the [Concurrently](https://www.npmjs.com/package/concurrently) `npm` package to run both servers at the same time.

However, if you wish to run the servers individually, use the following commands from the root folder:

`npm run server`: Starts the back-end server.

`npm run client`: Starts the front-end React server.
