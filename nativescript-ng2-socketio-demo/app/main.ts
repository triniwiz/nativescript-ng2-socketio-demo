// this import should be first in order to load some required settings (like globals and reflect-metadata)
import {nativeScriptBootstrap} from "nativescript-angular/application";
import {MainComponent} from './components/main/main.component';
import {NS_ROUTER_PROVIDERS} from 'nativescript-angular/router';
nativeScriptBootstrap(MainComponent, [NS_ROUTER_PROVIDERS]);