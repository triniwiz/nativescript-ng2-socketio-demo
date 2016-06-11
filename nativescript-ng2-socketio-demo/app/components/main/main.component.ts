import {Component} from '@angular/core';
import {RouteConfig} from '@angular/router-deprecated';
import {NS_ROUTER_DIRECTIVES, NS_ROUTER_PROVIDERS} from 'nativescript-angular/router';
import {LoginComponent} from '../login/login.component';
import {ChatComponent} from '../chat/chat.component';
@Component({
    selector: 'my-app',
    directives: [NS_ROUTER_DIRECTIVES],
    template: '<page-router-outlet></page-router-outlet>'
})
@RouteConfig([
    { path: '/login', component: LoginComponent, name: 'Login', useAsDefault: true },
    { path: '/chat', component: ChatComponent, name: 'Chat' }
])
export class MainComponent { }