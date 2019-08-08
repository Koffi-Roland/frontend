import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Agent } from '../agent/model/agent.model';
import { AppConfig } from '../app-config';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<Agent>;
    public currentUser: Observable<Agent>;
    public appConfig: AppConfig;
    profil;

    constructor(private http: HttpClient, private router: Router,
    ) {
        this.currentUserSubject = new BehaviorSubject<Agent>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): Agent {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>('http://smbackin.nogss.com/' + 'login', { username, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user) {
                    // console.log("je suis la");
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('id', user.id);
                    localStorage.setItem('connected', "true");

                    if (user.profil) {
                        this.profil = true;
                        localStorage.setItem('profil', this.profil);

                    } else {
                        this.profil = false;
                        localStorage.setItem('profil', this.profil);
                    }

                    this.currentUserSubject.next(user);
                }
                // console.log("je suis dehors");

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('id');
        localStorage.removeItem('profil');
        localStorage.setItem('connected','false');
        


        this.currentUserSubject.next(null);

    }
}