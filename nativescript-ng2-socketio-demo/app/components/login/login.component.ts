declare var SocketIO: any;
import {Component, OnInit} from '@angular/core';
var SocketIO = require('nativescript-socketio').SocketIO;
import {Router} from '@angular/router-deprecated';
const SERVER = 'http://localhost:3000';
import {ChatComponent} from '../chat/chat.component';

declare var zonedCallback: Function;

@Component({
    selector: 'page-router-outlet',
    templateUrl: 'components/login/login.html'
})
export class LoginComponent implements OnInit {
    socketIO;
    username;
    constructor(private router: Router) {
        this.username = 'Triniwiz'
    }
    ngOnInit() {
        this.socketIO = new SocketIO(SERVER, {});
        this.socketIO.on('login', zonedCallback((data) => {
            this.router.navigate(["/Chat", { username: this.username, socket: this.socketIO.instance }])
        }));
    }
    join() {
        this.socketIO.emit('add user', { username: this.username });
    }

}