import { Boutique } from './../model/boutique.model';
import { AbstractService } from './../../services/abstract.service';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AppConfig } from 'src/app/app-config';
@Injectable()
export class BoutiqueService {

  constructor(private http: HttpClient, private option: AbstractService, private appConfig: AppConfig) { }

  boutiqueUrl: string = "boutique"



  getUrl(url: string) {
    return this.appConfig.baseApiPath + url;
  }
  getAllBoutique<Response>() {
    return this.http.get<Boutique[]>(this.getUrl(this.boutiqueUrl + '/list'));

  }
  getOneBoutique<Response>(id: number) {
    return this.http.get(this.getUrl(this.boutiqueUrl + '/details' + `?id=${id}`), { headers: this.option.getOption().headers, observe: 'response' });

  }
  public save(boutique: Boutique): Observable<HttpResponse<Boutique>> {
    console.log("my url " + this.getUrl(this.boutiqueUrl + '/add'));
    return this.http.post<Boutique>(this.getUrl(this.boutiqueUrl + '/add'), boutique, { headers: this.option.getOption().headers, observe: 'response' });
  }

  public updateOneBoutique(boutique: Boutique): Observable<HttpResponse<Boutique>> {

    console.log("my url " + this.getUrl(this.boutiqueUrl + '/update'));
    return this.http.put<Boutique>(this.getUrl(this.boutiqueUrl + '/update'), boutique, { headers: this.option.getOption().headers, observe: 'response' });
  }
  deleteOneBoutique(id: any) {
    return this.http.delete(this.getUrl(this.boutiqueUrl + '/delete' + `?id=${id}`), { headers: this.option.getOption().headers, observe: 'response' });
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