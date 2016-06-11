declare var SocketIO: any;
import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
var SocketIO = require('nativescript-socketio').SocketIO;
import {RouteParams, Router} from '@angular/router-deprecated';
import {Observable} from 'rxjs/Rx';
import {TimeFromNowPipe} from '../../pipes/timeFromNow.pipe';
declare var zonedCallback: Function;
@Component({
    selector: 'page-router-outlet',
    templateUrl: 'components/chat/chat.html',
    pipes: [TimeFromNowPipe]
})
export class ChatComponent implements OnInit {
    currentUser: string;
    list: Array<any>;
    socketIO;
    textMessage;
    constructor(private params: RouteParams, private router: Router) {

    }

    ngOnInit() {
        this.textMessage = '';
        this.currentUser = this.params.get('username');
        this.socketIO = new SocketIO(null, null, this.params.get('socket'));
        this.socketIO.on('new message', (data) => {
            this.list.push(data);
        });
        this.socketIO.on('disconnect', zonedCallback(() => {
            this.router.navigate(['/Login']);
        }));
        this.socketIO.on('getMessages', (data) => {
            this.list = [...data];
        });
        this.socketIO.emit('getMessages');

    }
    sendText() {

        const data = {
            username: this.currentUser,
            message: this.textMessage,
            timeStamp: +new Date()
        };

        this.socketIO.emit('new message', data);
        this.list.push(data);
        this.textMessage = '';
    }
    logOut() {
        this.socketIO.disconnect();
    }

}