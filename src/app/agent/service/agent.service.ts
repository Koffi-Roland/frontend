import { Agent } from './../model/agent.model';
import { AbstractService } from "src/app/services/abstract.service";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { AppConfig } from 'src/app/app-config';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
@Injectable()
export class AgentService {

    constructor(private http: HttpClient, private option: AbstractService, private appConfig: AppConfig) { }


    agentUrl: string = "agent"


    /* ====================== */

    getUrl(url: string) {
        return this.appConfig.baseApiPath + url;
    }

    getAllAgent<Response>() {
        return this.http.get<Agent[]>(this.getUrl(this.agentUrl + '/list'));

    }
    getOneAgent<Response>(id: number) {
        return this.http.get(this.getUrl(this.agentUrl + '/details' + `?id=${id}`), { headers: this.option.getOption().headers, observe: 'response' });

    }
    public save(agent: Agent): Observable<HttpResponse<Agent>> {
        console.log("my url " + this.getUrl(this.agentUrl + '/add'));
        return this.http.post<Agent>(this.getUrl(this.agentUrl + '/add'), agent, { headers: this.option.getOption().headers, observe: 'response' });
    }

    public updateOneAgent(agent: Agent): Observable<HttpResponse<Agent>> {

        console.log("my url " + this.getUrl(this.agentUrl + '/update'));
        return this.http.put<Agent>(this.getUrl(this.agentUrl + '/update'), agent, { headers: this.option.getOption().headers, observe: 'response' });
    }
    deleteOneAgent(id: any) {
        return this.http.delete(this.getUrl(this.agentUrl + '/delete' + `?id=${id}`), { headers: this.option.getOption().headers, observe: 'response' });
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