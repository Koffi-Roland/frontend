import { AbstractService } from 'src/app/services/abstract.service';
import { Injectable } from '@angular/core';
import { Droit } from '../model/droit.model';
import { Observable, throwError } from 'rxjs';
import { Gamme } from '../model/gamme.model';
import { Types } from '../model/types.model';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { AppConfig } from 'src/app/app-config';
@Injectable()
export class PreconfigService {
    constructor(private http: HttpClient, private option: AbstractService, private appConfig: AppConfig) { }

    droitUrl: string = "droit";
    gammeUrl: string = "gamme";
    typeUrl: string = "type";
    /* ==============================Droit======================== */
    getUrl(url: string) {
        return this.appConfig.baseApiPath + url;
    }
    getAllDroits<Response>() {
        return this.http.get<Droit[]>(this.getUrl(this.droitUrl + '/list'));

    }
    getOneDroit<Response>(id: number) {
        return this.http.get(this.getUrl(this.droitUrl + '/details' + `?id=${id}`), { headers: this.option.getOption().headers, observe: 'response' });

    }
    public saveDroit(droit: Droit): Observable<HttpResponse<Droit>> {
        console.log("my url " + this.getUrl(this.droitUrl + '/add'));
        return this.http.post<Droit>(this.getUrl(this.droitUrl + '/add'), droit, { headers: this.option.getOption().headers, observe: 'response' });
    }

    public updateDroit(droit: Droit): Observable<HttpResponse<Droit>> {

        console.log("my url " + this.getUrl(this.droitUrl + '/update'));
        return this.http.put<Droit>(this.getUrl(this.droitUrl + '/update'), droit, { headers: this.option.getOption().headers, observe: 'response' });
    }
    onDeleteDroit(id: any) {
        return this.http.delete(this.getUrl(this.droitUrl + '/delete' + `?id=${id}`), { headers: this.option.getOption().headers, observe: 'response' });
    }
    /* ===========================================Gamme=========================================== */
    getAllGammes<Response>() {
        return this.http.get<Gamme[]>(this.getUrl(this.gammeUrl + '/list'));

    }
    getOneGamme<Response>(id: number) {
        return this.http.get(this.getUrl(this.gammeUrl + '/details' + `?id=${id}`), { headers: this.option.getOption().headers, observe: 'response' });

    }
    public saveGamme(gamme: Gamme): Observable<HttpResponse<Droit>> {
        console.log("my url " + this.getUrl(this.gammeUrl + '/add'));
        return this.http.post<Droit>(this.getUrl(this.gammeUrl + '/add'), gamme, { headers: this.option.getOption().headers, observe: 'response' });
    }

    public updateGamme(gamme: Gamme): Observable<HttpResponse<Gamme>> {

        console.log("my url " + this.getUrl(this.gammeUrl + '/update'));
        return this.http.put<Gamme>(this.getUrl(this.gammeUrl + '/update'), gamme, { headers: this.option.getOption().headers, observe: 'response' });
    }
    onDeleteGamme(id: any) {
        return this.http.delete(this.getUrl(this.gammeUrl + '/delete' + `?id=${id}`), { headers: this.option.getOption().headers, observe: 'response' });
    }
    /* ===============================================Type=============================================== */
    getAllTypes<Response>() {
        return this.http.get<Types[]>(this.getUrl(this.typeUrl + '/list'));

    }
    getOneType<Response>(id: number) {
        return this.http.get(this.getUrl(this.typeUrl + '/details' + `?id=${id}`), { headers: this.option.getOption().headers, observe: 'response' });

    }
    public saveType(type: Types): Observable<HttpResponse<Types>> {
        console.log("my url " + this.getUrl(this.typeUrl + '/add'));
        return this.http.post<Types>(this.getUrl(this.typeUrl + '/add'), type, { headers: this.option.getOption().headers, observe: 'response' });
    }

    public updateType(type: Types): Observable<HttpResponse<Types>> {

        console.log("my url " + this.getUrl(this.typeUrl + '/update'));
        return this.http.put<Types>(this.getUrl(this.typeUrl + '/update'), type, { headers: this.option.getOption().headers, observe: 'response' });
    }
    onDeleteType(id: any) {
        return this.http.delete(this.getUrl(this.typeUrl + '/delete' + `?id=${id}`), { headers: this.option.getOption().headers, observe: 'response' });
    }
    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            const x = 'Erreur *******';
            // A client-side or network error occurred. Handle it accordingly.
            // console.error('An error occurred:', error.error.message);
            return x;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,

            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    }


}