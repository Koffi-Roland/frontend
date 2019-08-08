import { Agent } from './../model/agent.model';
import { AgentService } from './../service/agent.service';
import { Component, ViewChild } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbDateAdapter, NgbDateNativeAdapter, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
@Component({
  templateUrl: 'edit.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class EditComponent {
  listUrl: string = "/agent/list";
  msgSuccess: any;
  msgError: any;
  feminin: any;
  masculin: any;
  image;
  entity: Agent = new Agent(null);
  @ViewChild('f') form: any;
  private _success = new Subject<string>();
  private _danger = new Subject<string>();


  staticAlertClosed = false;
  successMessage: string;
  dangerMessage: string;
  constructor(private router: Router, private agentService: AgentService) {

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
        this.entity.photoProfil = this.image;
        console.log("entity" + JSON.stringify(this.entity));
        this.agentService.save(this.entity).subscribe(res => {
          this.form.reset();
          this.msgSuccess = true;
          this.changeSuccessMessage();
        },
          error => {
            this.changeDangerMessage();
            this.msgError = true;
            console.error(error);

          }
        );
      } catch (error) {
        console.log("exception e = " + error);
        console.log(" form end exeception");
      }

    }
  }
}
