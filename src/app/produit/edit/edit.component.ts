import { Component, ViewChild, TemplateRef } from '@angular/core';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Route, Router } from '@angular/router';
import { PreconfigService } from 'src/app/pre-config/service/pre-config.service';
import { Gamme } from 'src/app/pre-config/model/gamme.model';
import { Types } from 'src/app/pre-config/model/types.model';
import { Produit } from '../model/produit.model';
import { ProduitService } from '../service/produit.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
@Component({
  templateUrl: 'edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],


})
export class EditComponent {

  closeResult: string;
  listUrl: string = "/product/list"
  allGammes: any[];
  allTypes: any[];
  statusCode;
  image;
  storeImage: File;
  photoProduit;
  libTypes;
  descriptionTypes;
  libGamme;
  descriptionGamme;
  entity: Produit = new Produit(null);
  entityType: Types = new Types(null, null, null);
  entityGamme: Gamme = new Gamme(null, null, null);

  msgSuccess: any;
  msgError: any;
  @ViewChild('f') form: any;
  @ViewChild('fGamme') formGamme: any;
  @ViewChild('fType') formType: any;
  modalRef: BsModalRef;
  message: string;
  private _success = new Subject<string>();
  private _danger = new Subject<string>();
  file: File;

  staticAlertClosed = false;
  successMessage: string;
  dangerMessage: string;
  constructor(private modalService: BsModalService, private router: Router, private preconfigService: PreconfigService, private produitService: ProduitService) { }

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

    this.getAllGammes();
    this.getAllTypes();
  }
  public changeSuccessMessage() {
    this._success.next(`Requête exécutée avec succès .`);
  }

  public changeDangerMessage() {
    this._danger.next(`Oups erreur.`);
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
  /*  open(content) {
     this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
       this.closeResult = `Closed with: ${result}`;
     }, (reason) => {
       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
     });
   }
 
 
   private getDismissReason(reason: any): string {
     if (reason === ModalDismissReasons.ESC) {
       return 'by pressing ESC';
     } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
       return 'by clicking on a backdrop';
     } else {
       return `with: ${reason}`;
     }
   } */
  backToList() {
    this.router.navigate([this.listUrl]);

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
  onSubmit() {
    if (this.form.valid) {
      try {
        //console.log("entity" + JSON.stringify(this.entity));
        this.entity.photoProduit = this.image;


        // console.log("image send" + this.file.name);


        this.produitService.save(this.entity).subscribe(res => {
          this.form.reset();
          this.msgSuccess = true;
          this.changeSuccessMessage();
        },
          error => {
            this.msgError = true;
            this.changeDangerMessage();

          }
        );
      } catch (error) {
        console.log("exception e = " + error);
        console.log(" form end exeception");
      }

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
