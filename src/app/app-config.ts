import { SERVER_URL } from 'src/app/app.constants';
import { Injectable } from '@angular/core';

/**
 * This is a singleton class
 */
@Injectable()
export class AppConfig {
    //Provide all the Application Configs here
    //Deploy command
    //ng build --prod --base-href . --deploy-url /nagos/
    //ou
    //ng build --prod --base-href /nagos/ --deploy-url /nagos/

    public version: string = "1.0.0";
    public locale: string = "en-US";
    public currencyFormat = { style: "currency", currency: "USD" };
    public dateFormat = { year: 'numeric', month: 'short', day: 'numeric' };

    // API Related configs
    //public apiPort: string = "4200";

    // public apiPort: string = "8085";//Development mode
    // public apiPort: string = "8084";//Development mode
    public apiPort: string = "";//Production mode

    public apiProtocol: string;
    public apiHostName: string;
    public baseApiPath: string;

    constructor() {
        if (this.apiProtocol === undefined) {
            this.apiProtocol = window.location.protocol;
        }
        /*  if (this.apiHostName === undefined) {
             this.apiHostName = window.location.hostname;
             console.log("this.apiHostName === " + this.apiHostName);
         }
         if (this.apiPort === undefined) {
             this.apiPort = window.location.port;
         }
         if (this.apiHostName.includes("infomud") || this.apiHostName.includes("heroku")) {
             this.baseApiPath = this.apiProtocol + "//" + this.apiHostName + "/";
         } else {
             this.baseApiPath = this.apiProtocol + "//" + this.apiHostName + ":" + this.apiPort + "/";
         }
         console.log("GlobalVariables.appContext === " + GlobalVariables.appContext); */
        this.baseApiPath = this.apiProtocol + "//" + GlobalVariables.appContext + "/";;
        if (this.locale === undefined) {
            this.locale = navigator.language;
        }
    }
}
//Development mode
/* export const GlobalVariables = Object.freeze({
    inProduction: false,
    appContext: "nagos",
}); */
//Production mode
export const GlobalVariables = Object.freeze({
    //     inProduction: true,
    appContext: SERVER_URL,
});

