import { makeAutoObservable } from "mobx";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
    id: number;
    name: string;
    email: string;
    role: string;
}

export type UserType = {
    id: number;
    name: string;
    email: string;
    role: string;
}

export default class UserStore {
    private _isAuth: boolean = false;
    private _user: UserType | null = null; 

    constructor() {
        makeAutoObservable(this);
        this.checkAuth();
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

    // Метод для проверки аутентификации
    checkAuth() {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const user = jwtDecode<CustomJwtPayload>(token);
                this.setUser({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                });
                this.setIsAuth(true);
            } catch (error) {
                console.error("Invalid token", error);
                localStorage.removeItem('token'); 
            }
        }
    }
}    