import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
    public authChange = new Subject<boolean>();
    private user: User = { email: '', userId: '' };
    constructor(private router: Router, private http: HttpClient) { }


    registerUser(authData: AuthData) {
        /*         this.user = {
                    email: authData.email,
                    userId: Math.round(Math.random() * 1000).toString()
                } */
        this.http
            .post('http://localhost:3000/users', {
                email: authData.email,
                userId: Math.round(Math.random() * 1000).toString(),
                password: authData.password
            })
            .subscribe(data => {
                console.log(data)
            });
        this.authSuccessfully();
    }

    login(authData: AuthData) {
        //fake login
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 1000).toString()
        }
        this.authSuccessfully();
    }

    logout() {
        this.user = { email: '', userId: '' }; //fake
        this.authChange.next(false);
        this.router.navigate(['/login']);
    }

    getUser() {
        return { ...this.user };
    }

    isAuth() {
        return this.user.userId !== '';
    }

    private authSuccessfully() {
        this.authChange.next(true);
        this.router.navigate(['/training']);
    }
}