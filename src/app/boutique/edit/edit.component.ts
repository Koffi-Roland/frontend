import { BoutiqueService } from './../service/boutique.service';
import { Boutique } from './../model/boutique.model';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
@Component({
  templateUrl: 'edit.component.html'
})
export class EditComponent {
  listUrl: string = "/boutique/list";

  msgSuccess: boolean = false;
  msgError: boolean = false;
  @ViewChild('f') form: any;
  entity: Boutique = new Boutique(null);
  private _success = new Subject<string>();
  private _danger = new Subject<string>();


  staticAlertClosed = false;
  successMessage: string;
  dangerMessage: string;
  constructor(private router: Router, private boutiqueService: BoutiqueService) {

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
  }
  public changeSuccessMessage() {
    this._success.next(`Requête exécutée avec succès .`);
  }

  public changeDangerMessage() {
    this._danger.next(`Oups erreur.`);
  }
  backToList() {
    this.router.navigate([this.listUrl]);

  }
  onSubmit() {
    if (this.form.valid) {
      try {
        this.boutiqueService.save(this.entity).subscribe(
          res => {
            this.msgSuccess = true;
            console.log(this.entity);
            this.form.reset();
            this.changeSuccessMessage();

            console.log(res);
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
}
