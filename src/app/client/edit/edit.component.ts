import { ClientService } from './../service/client.service';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../model/client.model';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
@Component({
  templateUrl: 'edit.component.html'
})
export class EditComponent {
  listUrl: string = "/client/list";

  entity: Client = new Client(null);
  statusCode: any;

  msgSuccess: boolean = false;
  msgError: boolean = false;
  @ViewChild('f') form: any;
  private _success = new Subject<string>();
  private _danger = new Subject<string>();


  staticAlertClosed = false;
  successMessage: string;
  dangerMessage: string;
  constructor(private router: Router, private clientService: ClientService) {

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

  onSubmit() {
    if (this.form.valid) {
      try {
        this.clientService.save(this.entity).subscribe(
          res => {
            this.msgSuccess = true;
            this.form.reset();
            this.changeSuccessMessage();
            console.log(this.entity);
          }, error => {
            this.changeDangerMessage();
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

  backToList() {
    this.router.navigate([this.listUrl]);

  }
}
