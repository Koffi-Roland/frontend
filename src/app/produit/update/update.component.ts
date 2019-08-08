import { Component, ViewChild, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProduitService } from '../service/produit.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Produit } from '../model/produit.model';
import { Types } from 'src/app/pre-config/model/types.model';
import { Gamme } from 'src/app/pre-config/model/gamme.model';
import { PreconfigService } from 'src/app/pre-config/service/pre-config.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
@Component({
  templateUrl: 'update.component.html'
})
export class UpdateComponent {
  listUrl: string = "/product/list";

  msgSuccess: boolean = false;
  msgError: boolean = false;
  entityUpdate: any;
  id;
  statusCode;
  allGammes: any[];
  allTypes: any[];
  image;
  storeImage: File;
  photoProduit;
  libTypes;
  descriptionTypes;
  libGamme;
  message: string;
  descriptionGamme;
  entity: Produit = new Produit(null);
  entityType: Types = new Types(null, null, null);
  entityGamme: Gamme = new Gamme(null, null, null);
  @ViewChild('f') form: any;
  @ViewChild('fGamme') formGamme: any;
  @ViewChild('fType') formType: any;
  modalRef: BsModalRef;

  private _success = new Subject<string>();
  private _danger = new Subject<string>();
  file: File;

  staticAlertClosed = false;
  successMessage: string;
  dangerMessage: string;
  constructor(private router: Router, private modalService: BsModalService, private route: ActivatedRoute, private preconfigService: PreconfigService, private produitService: ProduitService) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    console.log(" id = " + this.id);
  }

  ngOnInit() {
    this.produitService.getOneProduit(this.id).subscribe(
      (res) => {

        this.entityUpdate = res.body;

        console.log('entity update' + JSON.stringify(this.entityUpdate));
      },
      err => {
        console.log('erreur de id' + JSON.stringify(err));
        this.statusCode = err.statuts;
      }

    );
    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = null);

    this._danger.subscribe((message) => this.dangerMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.dangerMessage = null);

    this.getAllGammes();
    this.getAllTypes();
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  /*   confirm(): void {
      this.message = 'Confirmed!';
      this.modalRef.hide();
    } */

  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }
  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var lecteur: FileReader = new FileReader();

    lecteur.onloadend = (e) => {
      this.image = lecteur.result;
      console.log(lecteur.result);
    }
    lecteur.readAsDataURL(file);
  }
  backToList() {
    this.router.navigate([this.listUrl]);

  }
  onSubmit() {
    if (this.form.valid) {
      try {
        this.produitService.updateOneProduit(this.entityUpdate).subscribe(
          res => {
            this.msgSuccess = true;
            this.form.reset();

            console.log(res);
          }, error => {
            console.error(error);
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
  saveType() {
    /*  if (this.formType.valid) { */
    try {
      this.entityType.libType = this.libTypes;
      this.entityType.descriptionType = this.descriptionTypes;

      this.preconfigService.saveType(this.entityType).subscribe(
        res => {
          this.msgSuccess = true;
          this.entityType.libType = null;
          this.entityType.descriptionType = null;
          this.modalRef.hide();

          console.log(res);
        }, error => {
          console.error(error);
          this.msgError = false;
        }
      );
    } catch (error) {
      console.log("exception e = " + error);
      console.log(" form end exeception");

    }

    /*  } else {
       console.log("Form not Submitted!");
       //            this.ngOnInit();
     } */
  }

  saveGamme() {
    //if (this.formGamme.valid) {
    try {
      this.entityGamme.libGamme = this.libGamme;
      this.entityGamme.descriptionGamme = this.descriptionGamme;

      this.preconfigService.saveGamme(this.entityGamme).subscribe(
        res => {
          this.msgSuccess = true;
          //this.formGamme.close();
          this.entityGamme.libGamme = null;
          this.entityGamme.descriptionGamme = null;
          this.modalRef.hide();


          console.log(res);
        }, error => {
          console.error(error);
          this.msgError = false;
        }
      );
    } catch (error) {
      console.log("exception e = " + error);
      console.log(" form end exeception");

    }


    /*  } else {
       console.log("Form not Submitted!");
       //            this.ngOnInit();
     } */
  }
}
