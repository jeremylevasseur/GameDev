# This is a skeleton Node, Socket.io, and Phaser project

## Node Running Instructions
---
#### Make sure you have Nodemon installed
Run the following command:
```
npm install -g nodemon
```
If you are using linux, you'll need to put ```sudo``` in front of the command.

#### Running the Node server with Nodemon (live updates)
Navigate to the folder that contains the *index.js* file and run the following command.
```
npm install
```
Wait for the command to finish running.
```
nodemon index.js
```
The output will eventually say the server is listening at a specific port. Go to localhost:PORTNUMBER in your browser.

## Docker Running Instructions
---
Navigate to this directory (the one that contains the docker-compose.yml file) and run the following command:

```
docker-compose up --build
```

### Socket.io Notes
---
Here is a list (not exhaustive) of socket commands:
socket.emit('message', "this is a test"); //sending to sender-client only
socket.broadcast.emit('message', "this is a test"); //sending to all clients except sender
socket.broadcast.to('game').emit('message', 'nice game'); //sending to all clients in 'game' room(channel) except sender
socket.to('game').emit('message', 'enjoy the game'); //sending to sender client, only if they are in 'game' room(channel)
socket.broadcast.to(socketid).emit('message', 'for your eyes only'); //sending to individual socketid
io.emit('message', "this is a test"); //sending to all clients, include sender
io.in('game').emit('message', 'cool game'); //sending to all clients in 'game' room(channel), include sender
io.of('myNamespace').emit('message', 'gg'); //sending to all clients in namespace 'myNamespace', include sender
socket.emit(); //send to all connected clients
socket.broadcast.emit(); //send to all connected clients except the one that sent the message
socket.on(); //event listener, can be called on client to execute on server
io.sockets.socket(); //for emiting to specific clients
io.sockets.emit(); //send to all connected clients (same as socket.emit)
io.sockets.on() ; //initial connection from a client.