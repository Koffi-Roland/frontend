export class Agent {

    public id?: number;
    public nomAgent?: string;
    public prenomAgent?: string;
    public sexeAgent?: string;
    public dateNaisAgent?: string;
    public adresseAgent?: string;
    public contactAgent?: string;
    public pseudoAgent?: string;
    public passwordAgent?: string;
    public photoProfil?: Blob;


    constructor(id: number/*, nomAgent: string, prenomAgent: string, sexeAgent: string, dateNaisAgent: string, adresseAgent: string, contactAgent: string, pseudoAgent: string, passwordAgent: string*/) {
        this.id = id;
        /* this.nomAgent = nomAgent;
         this.prenomAgent = prenomAgent;
         this.sexeAgent = sexeAgent;
         this.dateNaisAgent = dateNaisAgent;
         this.adresseAgent = adresseAgent;
         this.contactAgent = contactAgent;
         this.pseudoAgent = pseudoAgent;
         this.passwordAgent = passwordAgent;*/

    }
}