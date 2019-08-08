import { Client } from './../model/client.model';
import { AbstractService } from './../../services/abstract.service';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse, HttpClient, HttpResponse } from '@angular/common/http';
import { AppConfig } from 'src/app/app-config';
@Injectable()
export class ClientService  {
    constructor(private http: HttpClient, private option: AbstractService,private appConfig: AppConfig) { }

    clientUrl: string = "client"

    /* ============================== */
    getUrl(url: string) {
        return this.appConfig.baseApiPath + url;
    }
    getAllClient<Response>(){
        return this.http.get<Client[]>(this.getUrl(this.clientUrl+'/list'));

    }
    getOneClient<Response>(id: number){
        return this.http.get(this.getUrl(this.clientUrl+'/details' + `?id=${id}`),{headers:this.option.getOption().headers ,observe:'response'});

    }
    public save(client:Client) : Observable<HttpResponse<Client>>{
        console.log("my url "+this.getUrl(this.clientUrl+'/add'));
        return this.http.post<Client>(this.getUrl(this.clientUrl+'/add'), client,{headers:this.option.getOption().headers ,observe:'response'});
      }
    
      public updateOneClient(client:Client) : Observable<HttpResponse<Client>>{
    
        console.log("my url "+this.getUrl(this.clientUrl+'/update'));
        return this.http.put<Client>(this.getUrl(this.clientUrl+'/update'), client,{headers:this.option.getOption().headers ,observe:'response'});
      }
      deleteOneClient(id: any) {
        return this.http.delete(this.getUrl(this.clientUrl+'/delete'+`?id=${id}`),{headers: this.option.getOption().headers, observe: 'response' });
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