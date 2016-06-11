'use strict'
const express = require("express")
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);


let messageList = [];
let userList = [];
io.on('connection', function (socket) {
	socket.emit('connected',"Welcom")
	let addedUser = false;
	socket.on('add user', function (data) {
		if (addedUser) return;
		addedUser = true;
		socket.username = data.username;
		userList.push({username:data.username});
		socket.emit('login', {userList: userList})
		socket.broadcast.emit('user joined', {
			username: data.username
		})
	})

	socket.on('new message', function (data) {
        messageList.push(data);
		socket.broadcast.emit('new message', data);
	})

	socket.on('getUsers', function () {
		socket.emit('getUsers', userList);
	})
	socket.on('user count', function () {
		socket.emit('user count',userList.length );
	})
	socket.on('getMessages', function () {
		socket.emit('getMessages', messageList);
	})


	socket.on('disconnect', function () {
        if (addedUser) {
			for (let i = 0; i < userList.length; i++) {
				if (socket.username === userList[i].username) {
					userList.splice(i, 1);
				}
			}
			socket.broadcast.emit('user left', {
				username: socket.username
			})
        }
	});
});

server.listen(3000);