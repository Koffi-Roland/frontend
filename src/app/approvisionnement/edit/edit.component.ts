
import { Component, ViewChild } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbDateAdapter, NgbDateNativeAdapter, NgbDate, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Approvisionnement } from '../model/appro.model';
import { Boutique } from 'src/app/boutique/model/boutique.model';
import { BoutiqueService } from 'src/app/boutique/service/boutique.service';
import { Agent } from 'src/app/agent/model/agent.model';
import { ApproService } from '../service/approvisionnement.service';
import { ProduitService } from 'src/app/produit/service/produit.service';
import { Gamme } from 'src/app/pre-config/model/gamme.model';
import { Types } from 'src/app/pre-config/model/types.model';
import { PreconfigService } from 'src/app/pre-config/service/pre-config.service';
import { ExemplairesProduits } from '../model/exemplaireproduits.model';

@Component({
  templateUrl: 'edit.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class EditComponent {

  @ViewChild('f') form: any;

  @ViewChild(NgbTabset)
  private tabset: NgbTabset;
  statusCode: any;
  //barcode: any;
  allGammes: any[];
  allTypes: any[];
  user;
  entity: Approvisionnement = new Approvisionnement(null);
  entityExemplaire: ExemplairesProduits = new ExemplairesProduits(null);
  _gamme;
  _type;
  msgError;
  id;
  arrayTab = new Array();
  editBoutiqueUrl: string = "/boutique/edit";
  private _success = new Subject<string>();
  private _danger = new Subject<string>();
  msgSuccess: any;
  justified = "justified";
  staticAlertClosed = false;
  successMessage: string;
  dangerMessage: string;
  public barcode: any;
  private currentUserSubject: BehaviorSubject<Agent>;
  public currentUser: Observable<Agent>;
  allBoutiques: Boutique[];
  allProducts: any[];
  constructor(private router: Router, private preconfigService: PreconfigService, private boutiqueService: BoutiqueService, private approService: ApproService, private produitService: ProduitService) {
    this.currentUserSubject = new BehaviorSubject<Agent>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.user = JSON.parse(localStorage.getItem('currentUser'));


  }

  ngOnInit() {
    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = null);

    this._danger.subscribe((message) => this.dangerMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.dangerMessage = null);
    this.getAllBoutiques();
    this.getAllProduits();
    this.getAllGammes();
    this.getAllTypes();



  }
  public changeSuccessMessage() {
    this._success.next(`Requête exécutée avec succès .`);
  }

  public changeDangerMessage() {
    this._danger.next(`Oups erreur.`);
  }

  getAllBoutiques(): Boutique[] {
    this.boutiqueService.getAllBoutique()
      .subscribe(
        data => this.allBoutiques = data,
        errorCode => this.statusCode = errorCode);
    return this.allBoutiques;
  }


  getAllProduits(): any[] {
    this.produitService.getAllSimpleProduit()
      .subscribe(
        data => {
          this.allProducts = data

          /*  for (let i = 0; i < this.allProducts.length; i++) {
              console.log(this.allProducts[i]);
            }*/

        },
        errorCode => this.statusCode = errorCode);
    return this.allProducts;
  }

  backToEditBoutique() {
    this.router.navigate([this.editBoutiqueUrl]);
  }

  getAllGammes(): Gamme[] {
    this.preconfigService.getAllGammes()
      .subscribe(
        data => this.allGammes = data,
        errorCode => this.statusCode = errorCode);
    return this.allGammes;
  }
  getAllTypes(): Types[] {
    this.preconfigService.getAllTypes()
      .subscribe(
        data => this.allTypes = data,
        errorCode => this.statusCode = errorCode);
    return this.allTypes;
  }



  onSubmit() {

    if (this.form.valid) {
      this.entity.idAgent = this.user;

      console.log(this.entity);

      try {
        this.approService.save(this.entity).subscribe(
          res => {
            this.msgSuccess = true;
            this.form.reset();
            localStorage.setItem('idappro', res.body[0].id);

            console.log("retour" + JSON.stringify(res.body));
            /*     for (let i = 0; i < res.body[0].id; i++) {
              console.log(this.allProducts[i]);
            } */
            console.log("retour" + res.body[0].id);

            this.changeSuccessMessage();

            this.tabset.select("tab-exemple");

          }, error => {
            console.error(error);
            this.changeDangerMessage();
            this.msgError = false;
          }
        );
      } catch (error) {
        console.log("exception e = " + error);
        console.log(" form end exeception");

      }


    } else {
      console.log("Form not Submitted!");
      //            this.ngOnInit();
    }


  }


  onFinal() {


    localStorage.getItem('gamme');
    localStorage.getItem('type');
    localStorage.getItem('exemplaire');
    try {
      this.entityExemplaire.idappro = localStorage.getItem('idappro');
      this.approService.saveExemplaire(this.entityExemplaire).subscribe(
        res => {
          this.msgSuccess = true;
          // this.form.reset();
          this.changeSuccessMessage();
          //  this.tabset.select("tab-exemple");
          console.log("retour" + res);
        }, error => {
          console.error(error);
          this.changeDangerMessage();
          this.msgError = false;
        }
      );
    } catch (error) {
      console.log("exception e = " + error);
      console.log(" form end exeception");

    }
    // this.changeSuccessMessage();

  }





  goToFinal() {
    if (this.form.valid) {
      this.arrayTab = new Array();
      localStorage.setItem('gamme', this._gamme);
      localStorage.setItem('type', this._type);
      localStorage.setItem('exemplaire', this.entityExemplaire.toString());
      this.tabset.select("tab-final");
      this.arrayTab.push(this.entityExemplaire);
      console.log("55555555" + this.arrayTab);
      console.log("xxxx" + JSON.stringify(this.entityExemplaire));


    }
  }

}
