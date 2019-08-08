export class Client {

    public id?: number;
    public nomClient?: string;
    public prenomClient?: string;
    public contactClient?: string;
    public adresseClient?: string;

    constructor(id: number /*, nomClient: string, prenomClient: string, contactClient: string, adresseClient: string*/) {
        this.id = id;
        /*  this.nomClient = nomClient;
         this.prenomClient = prenomClient;
         this.adresseClient = contactClient;
         this.contactClient = adresseClient; */

    }
}