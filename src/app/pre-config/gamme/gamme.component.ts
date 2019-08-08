import { Component, ViewChild } from '@angular/core';
import * as _ from 'underscore';

import { Http } from '@angular/http';
import { PagerService } from 'src/app/pager/index';
import { PreconfigService } from '../service/pre-config.service';
import { Gamme } from '../model/gamme.model';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-gamme',
  templateUrl: 'gamme.component.html',
  styleUrls: ['gamme.component.css']
})
export class GammeComponent {

  /* itemsPerPage: number;
  totalItems: any;
  page: any;
  previousPage: any; */

  // pager object
  pager: any = {};
  entity: Gamme = new Gamme(null, null, null);
  private _success = new Subject<string>();
  private _danger = new Subject<string>();


  staticAlertClosed = false;
  successMessage: string;
  dangerMessage: string;

  // paged items
  pagedItems: any[];

  allGammes: Gamme[];
  statusCode: any;
  msgSuccess: boolean = false;
  msgError: boolean = false;
  @ViewChild('f') form: any;
  entityUpdate: any;
  doUpdate: boolean = false;
  doCreate: boolean = true;
  p: number = 1;


  constructor(private http: Http, private pagerService: PagerService, private gammeService: PreconfigService) {

  }

  ngOnInit() {
    // get dummy data

    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = null);

    this._danger.subscribe((message) => this.dangerMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.dangerMessage = null);

    this.init();
    this.getAllGammes();

  }
  public changeSuccessMessage() {
    this._success.next(`Requête exécutée avec succès .`);
  }

  public changeDangerMessage() {
    this._danger.next(`Oups erreur.`);
  }

  /*  loadPage(page: number) {
       if (page !== this.previousPage) {
         this.previousPage = page;
         this.loadData();
       }
     }
   
     loadData() {
       this.dataService.query({
         page: this.page - 1,
         size: this.itemsPerPage,
       }).subscribe(
         (res: Response) => this.onSuccess(res.json(), res.headers),
         (res: Response) => this.onError(res.json())
         )
     } */

  getAllGammes(): Gamme[] {
    this.gammeService.getAllGammes()
      .subscribe(
        data => this.allGammes = data,
        errorCode => this.statusCode = errorCode);
    return this.allGammes;
  }
  forUpdate(gamme: any) {
    console.log("gamme helooooo" + JSON.stringify(gamme));
    /*update state*/
    this.doCreate = false;
    this.doUpdate = true;
    this.entityUpdate = gamme;
  }

  init() {
    this.doUpdate = false;
    this.doCreate = true;
  }

  onSubmit() {
    if (this.form.valid) {
      try {
        this.gammeService.saveGamme(this.entity).subscribe(
          res => {
            this.msgSuccess = true;
            this.getAllGammes();
            this.form.reset();
            this.changeSuccessMessage();

            //this.ngOnInit();

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

  onDelete(id: any) {
    if (id) {
      try {
        this.gammeService.onDeleteGamme(id).subscribe(res => {
          console.log(res);
          this.msgSuccess = true;
          this.getAllGammes();
          this.changeSuccessMessage();

        },
          error => {
            this.changeDangerMessage();

            console.error(error);
            this.msgError = true;
          });
      } catch (error) {
        console.log("exception e = " + error);
        console.log(" form end exeception");

      }


    }

  }


  onUpdate() {
    //if (id) {
    try {
      this.gammeService.updateGamme(this.entityUpdate).subscribe(res => {
        console.log(res);
        this.msgSuccess = true;
        this.getAllGammes();
        this.changeSuccessMessage();
        this.init();


      },
        error => {
          console.error(error);
          this.changeDangerMessage();
          this.msgError = true;
        });
    } catch (error) {
      console.log("exception e = " + error);
      console.log(" form end exeception");

    }


  }

  //}

}
