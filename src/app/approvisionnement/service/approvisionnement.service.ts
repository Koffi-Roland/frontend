import { Approvisionnement } from './../model/appro.model';
import { AbstractService } from './../../services/abstract.service';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AppConfig } from 'src/app/app-config';
import { ExemplairesProduits } from '../model/exemplaireproduits.model';
@Injectable()
export class ApproService {

    constructor(private http: HttpClient, private option: AbstractService, private appConfig: AppConfig) { }

    approUrl: string = "approv"



    getUrl(url: string) {
        return this.appConfig.baseApiPath + url;
    }
    getAllAppro<Response>() {
        return this.http.get<Approvisionnement[]>(this.getUrl(this.approUrl + '/list'));

    }
    getOneBoutique<Response>(id: number) {
        return this.http.get(this.getUrl(this.approUrl + '/details' + `?id=${id}`), { headers: this.option.getOption().headers, observe: 'response' });

    }
    public save(appro: Approvisionnement): Observable<HttpResponse<Approvisionnement>> {
        console.log("my url " + this.getUrl(this.approUrl + '/add'));
        return this.http.post<Approvisionnement>(this.getUrl(this.approUrl + '/add'), appro, { headers: this.option.getOption().headers, observe: 'response' });
    }


    public saveExemplaire(exemplaire: ExemplairesProduits): Observable<HttpResponse<ExemplairesProduits>> {
        console.log("my url " + this.getUrl(this.approUrl + '/content/add'));
        return this.http.post<ExemplairesProduits>(this.getUrl(this.approUrl + '/add'), exemplaire, { headers: this.option.getOption().headers, observe: 'response' });
    }

    /* 
    
    */

    public updateOneAppro(appro: Approvisionnement): Observable<HttpResponse<Approvisionnement>> {

        console.log("my url " + this.getUrl(this.approUrl + '/update'));
        return this.http.put<Approvisionnement>(this.getUrl(this.approUrl + '/update'), appro, { headers: this.option.getOption().headers, observe: 'response' });
    }
    deleteOneBoutique(id: any) {
        return this.http.delete(this.getUrl(this.approUrl + '/delete' + `?id=${id}`), { headers: this.option.getOption().headers, observe: 'response' });
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