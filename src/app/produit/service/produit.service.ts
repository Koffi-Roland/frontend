import { AbstractService } from 'src/app/services/abstract.service';
import { Injectable } from '@angular/core';
import { Produit } from '../model/produit.model';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { AppConfig } from 'src/app/app-config';
import { Gamme } from 'src/app/pre-config/model/gamme.model';
import { Types } from 'src/app/pre-config/model/types.model';
@Injectable()
export class ProduitService {
    constructor(private http: HttpClient, private option: AbstractService, private appConfig: AppConfig) { }

    produitUrl: string = "produit"
    gammeUrl: string = "gamme";
    typeUrl: string = "type";


    getUrl(url: string) {
        return this.appConfig.baseApiPath + url;
    }
    public getAllGamme<Response>() {
        console.log("my url fff " + this.getUrl(this.gammeUrl + '/list'));
        return this.http.get<Gamme[]>(this.getUrl(this.gammeUrl + '/list'));
    }

    public getAllType<Response>() {
        console.log("my url fff " + this.getUrl(this.typeUrl + '/list'));
        return this.http.get<Types[]>(this.getUrl(this.typeUrl + '/list'));
    }

    getAllProduit<Response>() {
        return this.http.get<any[]>(this.getUrl(this.produitUrl + '/list'));

    }

    getAllSimpleProduit<Response>() {
        return this.http.get<any[]>(this.getUrl(this.produitUrl + '/list/simple'));

    }
    getOneProduit<Response>(id: number) {
        return this.http.get(this.getUrl(this.produitUrl + '/details' + `?id=${id}`), { headers: this.option.getOption().headers, observe: 'response' });

    }
    public save(produit: Produit): Observable<HttpResponse<Produit>> {

        console.log("my url " + this.getUrl(this.produitUrl + '/add'));


        return this.http.post<Produit>(this.getUrl(this.produitUrl + '/add'), produit, { headers: this.option.getOption().headers, observe: 'response' });
    }

    public updateOneProduit(produit: Produit): Observable<HttpResponse<Produit>> {

        console.log("my url " + this.getUrl(this.produitUrl + '/update'));
        return this.http.put<Produit>(this.getUrl(this.produitUrl + '/update'), produit, { headers: this.option.getOption().headers, observe: 'response' });
    }
    onDeleteProduit(id: any) {
        return this.http.delete(this.getUrl(this.produitUrl + '/delete' + `?id=${id}`), { headers: this.option.getOption().headers, observe: 'response' });
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