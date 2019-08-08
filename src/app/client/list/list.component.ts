import { Client } from './../model/client.model';
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { PagerService } from 'src/app/pager';
import { Router } from '@angular/router';
import { ClientService } from '../service/client.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
@Component({
  templateUrl: 'list.component.html'
})
export class ListComponent {


  editUrl: string = "/client/edit"
  updateUrl: string = "/client/update"
  // pager object
  pager: any = {};
  statusCode: any;
  // paged items
  pagedItems: any[];
  msgError: any;
  msgSuccess: any;
  allClients:Client[];
  p: number = 1;
  private _success = new Subject<string>();
  private _danger = new Subject<string>();


  staticAlertClosed = false;
  successMessage: string;
  dangerMessage: string;
  constructor(private http: Http, private pagerService: PagerService, private router: Router, private clientService: ClientService) {

  }
  ngOnInit() {
    // get dummy data


    // initialize to page 1
    // this.setPage(1);
    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = null);

    this._danger.subscribe((message) => this.dangerMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.dangerMessage = null);
    this.getAllClients();
  }

  public changeSuccessMessage() {
    this._success.next(`Requête exécutée avec succès .`);
  }

  public changeDangerMessage() {
    this._danger.next(`Oups erreur.`);
  }
  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.allClients.length, page);

    // get current page of items
    this.pagedItems = this.allClients.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
  backToEdit() {
    this.router.navigate([this.editUrl]);
  }

  onDelete(id: any) {
    if (id) {
      try {
        this.clientService.deleteOneClient(id).subscribe(res => {
          console.log(res);
          this.msgSuccess = true;
          this.changeSuccessMessage();
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

  }


  goToUpdate(id: any) {
    if (id) {
      this.router.navigate([this.updateUrl, id]);
      console.error("updateCurrent in id = " + id);
    }

    // console.error("update id = " + id);
  }

  getAllClients(): Client[] {
    this.clientService.getAllClient()
      .subscribe(
        data => this.allClients = data,
        errorCode => this.statusCode = errorCode);
    return this.allClients;
  }


}
