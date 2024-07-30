import { makeAutoObservable } from "mobx";

export type UserType = {
    name: string;
    email: string;
    role: string;
   
}

export default class UserStore {
    private _isAuth: boolean = false;
    private _user: UserType | null = null; 

    constructor() {
        makeAutoObservable(this);
    }

    setIsAuth(bool: boolean) {
        this._isAuth = bool;
    }

    setUser(user: UserType | null) { 
        this._user = user;
    }

    get isAuth(): boolean {
        return this._isAuth;
    }

    get user(): UserType | null { 
        return this._user;
    }
}