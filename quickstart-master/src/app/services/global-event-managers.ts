   import { EventEmitter, Injectable } from "@angular/core";

@Injectable()
export class GlobalEventsManager { 
    public isLoggedIn: EventEmitter<boolean> = new EventEmitter();
    public userdetail: EventEmitter<any> = new EventEmitter();
    public roleid: EventEmitter<boolean> = new EventEmitter();
    constructor() { }

}
