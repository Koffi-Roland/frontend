import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { UserInfoService, LoginInfoInStorage } from '../user-info.service';
import { ApiRequestService } from './api-request.service';
import { SERVER_URL } from 'src/app/app.constants';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from '../abstract.service';
import { AppConfig } from 'src/app/app-config';

export interface LoginRequestParam {
    pseudoAgent: string;
    passwordAgent: string;
}

@Injectable()
export class LoginService {

    public landingPage: string = "home/dashboard";
    constructor(
        private router: Router,
        private http: HttpClient,
        private userInfoService: UserInfoService,
        private option: AbstractService,
        private appConfig: AppConfig
        /*         private apiRequest: ApiRequestService
 */    ) { }


    getToken(pseudoAgent: string, passwordAgent: string): Observable<any> {
        let me = this;

        let bodyData: LoginRequestParam = {
            "pseudoAgent": pseudoAgent,
            "passwordAgent": passwordAgent,
        }
        let loginDataSubject: Subject<any> = new Subject<any>(); // Will use this subject to emit data that we want after ajax login attempt
        let loginInfoReturn: LoginInfoInStorage; // Object that we want to send back to Login Page

        this.http.post(this.appConfig.baseApiPath + 'login', bodyData, { headers: this.option.getOption().headers, observe: 'response' })
            .subscribe(jsonResp => {
                try {
                    if (jsonResp !== undefined && jsonResp !== null && jsonResp.statusText === "ok") {
                        //Create a success object that we want to send back to login page
                        loginInfoReturn = {
                            "success": true,
                            "message": "passe authorisé",
                            "landingPage": this.landingPage,
                            "user": {
                                "id": jsonResp.body['id'],
                                "pseudoAgent": jsonResp.body['pseudoAgent'],
                                "displayName": jsonResp.body['nomAgent'] + " " + jsonResp.body['prenomAgent'],
                                "token": jsonResp.body['token'],
                                "connectedUser": jsonResp.body['connectedUser'],
                            }
                        };

                        // store username and jwt token in session storage to keep user logged in between page refreshes
                        this.userInfoService.storeUserInfo(JSON.stringify(loginInfoReturn.user));
                        // console.log("this.userInfoService.getUserInfo() = " + JSON.stringify(this.userInfoService.getUserInfo()));
                        console.log("jsonResp = " + JSON.stringify(jsonResp));
                    } else {
                        //Create a faliure object that we want to send back to login page
                        loginInfoReturn = {
                            "success": false,
                            "message": "acces denied",
                            "landingPage": "/authentication/login"
                        };
                    }
                    loginDataSubject.next(loginInfoReturn);
                } catch (err) {
                    // console.log(body);
                    console.log("success err = " + err);
                    throw err;
                }
            });

        return loginDataSubject;
    }

    logout(navigatetoLogout = true): void {
        // clear token remove user from local storage to log user out
        this.userInfoService.removeUserInfo();
        if (navigatetoLogout) {
            this.router.navigate(["/authentication/login"]);
        }
    }
}