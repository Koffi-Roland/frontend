import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Headers, URLSearchParams, Http } from '@angular/http';
import { Headers, URLSearchParams, Http, Response, RequestOptions, RequestMethod, ResponseContentType } from '@angular/http';
// import { Headers, URLSearchParams, Http, Observable, Response, RequestOptions, ResponseContentType } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';


// import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import { ApiRequestService } from './api/api-request.service';
import { AppConfig } from '../app-config';
// import { ResponseContentType } from '@angular/http/src/enums';
// import { RequestOptions } from '@angular/http/src/base_request_options';
// import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
// import 'rxjs/Rx';


// import { Response } from '@angular/http';
import 'rxjs/Rx';

// import { Http, Response, RequestOptions, ResponseContentType } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/Rx'; 


@Injectable()
export class AbstractService {

    constructor(public http: HttpClient,   private localStorage: LocalStorageService,
        private sessionStorage: SessionStorageService, public apiRequestService: ApiRequestService, public appConfig: AppConfig) {
    }



    getOption() {
        const token = this.localStorage.retrieve('authenticationToken') || this.sessionStorage.retrieve('authenticationToken');
        if (token === null) {
            const httpOptions = {
                headers: new HttpHeaders({ 'Content-Type': 'application/json' })
            }

            return httpOptions;
        } else {
            const httpOptions = {
                headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token })
            }
            return httpOptions;
        }
    }
    getHeaderString() {
        const token = this.localStorage.retrieve('authenticationToken') || this.sessionStorage.retrieve('authenticationToken');
        if (token === null) {

            return new HttpHeaders({ 'Content-Type': 'application/json' })

        } else {

            return new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token })

        }
    }


   // public headers: Headers = this.apiRequestService.appendAuthHeader();



  /*   getUrl(url: string) {
        return this.appConfig.baseApiPath + url;
    }

    getPrintFile(url: string) {
        return this.apiRequestService.get(url);
    }

    public getFile(path: string): Observable<Blob> {
        let options = this.apiRequestService.getFileRequestOptions(RequestMethod.Get, path);

        return this.http.get(path, options)
            .map((response: Response) => <Blob>response.blob())
            .catch(this.handleError);
    } */

   /* getAll(url: string): Observable<any[]> {
        return this.apiRequestService.get(url);
    }

    getOneWithParams(cpParams: URLSearchParams, url: string): Observable<any> {
        return this.apiRequestService.get(url, cpParams);
    }

    getAllEntitiesByPage(page?: number, size?: number, pageableEntityUrl?: string): Observable<any> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('page', typeof page === "number" ? page.toString() : "0");
        params.set('size', typeof size === "number" ? size.toString() : "3");
        return this.getOneWithParams(params, pageableEntityUrl);
    }



    getAllWithParams(cpParams: URLSearchParams, url: string): Observable<any> {
        return this.apiRequestService.get(url, cpParams);
    }

    getAllByEntityId(paramKey: string, entityId: string, url: string): Observable<any[]> {
        let cpParams = new URLSearchParams();
        cpParams.set(paramKey, entityId);
        return this.apiRequestService.get(url, cpParams);
    }

    getOne(paramKey: string, entityId: string, url: string): Observable<any> {
        let cpParams = new URLSearchParams();
        cpParams.set(paramKey, entityId);
        return this.apiRequestService.get(url, cpParams);
    }




    saveOne(entity: any, url: string): Promise<any> {
        return this.http
            .post(this.getUrl(url), JSON.stringify(entity), { headers: this.headers })
            .toPromise()
            .then(res => res.json().data as any)
            .catch(this.handleError);
    }

    saveOneR(entity: any, url: string): Promise<any> {
        return this.http
            .post(this.getUrl(url), JSON.stringify(entity), { headers: this.headers })
            .toPromise();
    }

    saveObsOne(entity: any, url: string): Observable<any> {
        return this.apiRequestService.post(url, entity);
    }

    updateOne(entity: any, url: string): Promise<any> {
        const urls = `${this.getUrl(url)}`;

        return this.http
            .put(urls, JSON.stringify(entity), { headers: this.headers })
            .toPromise()
            .then(this.extractDonnee)
            .catch(this.handleError);
    }

    // updateOne(entity: any, url: string): Promise<any> {
    //     const urls = `${this.getUrl(url)}`;
    //     console.log("LURL   " + urls);
    //     console.log("heloèèèèèèèèèèèèèèèèèççççççççççççççççççççç  "+JSON.stringify(entity));
    //     return this.http
    //         .put(urls, JSON.stringify(entity), { headers: this.headers })
    //         .toPromise()
    //         .then(() => entity)
    //         .catch(this.handleError);
    // }

    extractDonnee(res: Response) {
        let body = res.json();
        return body || {};
    }

    updateObsOne(entity: any, url: string): Observable<any> {
        return this.apiRequestService.put(url, entity);
    }

    deleteOne(entityId: any, url: string): Promise<void> {
        const urls = `${this.getUrl(url)}/${entityId}`;
        console.log("LURL   " + urls);
        return this.http.delete(urls, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }


    getOnEntity(entityId: any, url: string): Promise<void> {
        const urls = `${this.getUrl(url)}/${entityId}`;
        console.log("LURL   " + urls);
        return this.http.get(urls, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    deleteObsOne(entityId: any, url: string): Observable<void> {
        const urls = `${url}/${entityId}`;
        return this.apiRequestService.delete(urls);
    }




    public handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
*/

}
