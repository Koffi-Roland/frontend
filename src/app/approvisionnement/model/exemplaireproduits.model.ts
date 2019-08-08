import { Agent } from '../../agent/model/agent.model';
import { Boutique } from '../../boutique/model/boutique.model';
import { Produit } from 'src/app/produit/model/produit.model';


export class ExemplairesProduits {

    public id?: number;
    public idappro:string;
    public agent?: Agent;
    public barcode?: string;
    public datefabrication?: Date;
    public dateperemption?: Date;
    public dateapprovisionnement?: Date;
    public datevente?: Date;
    public reductionspeciale?: number;
    public pureel?: number;
    public capitalreel?: number;
    public interetreel?: number;
    public produit?: Produit;

    constructor(id: number) {
        this.id = id;
 

    }
}