import { Types } from "src/app/pre-config/model/types.model";
import { Gamme } from "src/app/pre-config/model/gamme.model";

export class Produit {

  public id?: number;
  public libProduit?: string;
  public descriptionProduit?: string;
  public capitalTotalProduit?: string;
  public capitalUnitaireProduit?: string;
  public interetTotalProduit?: string;
  public interetUnitaireProduit?: string;
  public pourcRedProduit?: string;
  public qteStock?: string;
  public qteAvAlertFinStock?: string;
  public nbreJoursAlertAvPeremption?: string;
  public finStock?: Date;
   public photoProduit: Blob;
   public perimed?: Date;
  public type?: Types;
  public gamme?: Gamme;
  /* public lignes?: string;
  public exemplaires?: string; */


  constructor(id: number/*, libProduit: string, descriptionProduit: string, capitalTotalProduit: string, capitalUnitaireProduit: string, interetUnitaireProduit: string, pourcRedProduit: string, qteStock: string, qteAvAlertFinStock: string, nbreJoursAlertAvPeremption: string, finStock: Date, perimed: Date*/) {
    this.id = id;
    /*  this.libProduit = libProduit;
      this.descriptionProduit = descriptionProduit;
      this.capitalTotalProduit = capitalTotalProduit;
      this.capitalUnitaireProduit = capitalUnitaireProduit;
      this.interetUnitaireProduit = interetUnitaireProduit;
      this.pourcRedProduit = pourcRedProduit;
      this.qteStock = qteStock;
      this.qteAvAlertFinStock = qteAvAlertFinStock;
      this.nbreJoursAlertAvPeremption = nbreJoursAlertAvPeremption;
      this.finStock = finStock;
      this.perimed = perimed;*/

  }
}