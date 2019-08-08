import { Agent } from '../../agent/model/agent.model';
import { Boutique } from '../../boutique/model/boutique.model';


export class Approvisionnement {

    public id?: number;
    public idBoutique?: Boutique;
    public DteApprov?: Date;
    public idAgent?: Agent;
  


    constructor(id: number/*, libBoutique: string, adresseBoutique: string, adresseGpsBoutique: string, codeBoutique: string, contactBoutique: string*/) {
        this.id = id;
     

    }
}