import { Agent } from './../model/agent.model';
import { AgentService } from './../service/agent.service';
import { Component } from '@angular/core';
import { PagerService } from 'src/app/pager';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
@Component({
  templateUrl: 'list.component.html'
})
export class ListComponent {

  editUrl: string = "/agent/edit";
  // pager object
  pager: any = {};
  msgSuccess;
  msgError;
  statusCode;
  // paged items
  updateUrl: string = "/agent/update"
  pagedItems: any[];
  p: number = 1;
  allAgents: Agent[];
  private _success = new Subject<string>();
  private _danger = new Subject<string>();


  staticAlertClosed = false;
  successMessage: string;
  dangerMessage: string;
  constructor(private http: Http, private pagerService: PagerService, private router: Router, private agentService: AgentService) {

  }

  ngOnInit() {

    this.getAllAgents();

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

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.allAgents.length, page);

    // get current page of items
    this.pagedItems = this.allAgents.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
  backToEdit() {
    this.router.navigate([this.editUrl]);
  }
  public changeSuccessMessage() {
    this._success.next(`Requête exécutée avec succès .`);
  }

  public changeDangerMessage() {
    this._danger.next(`Oups erreur.`);
  }
  onDelete(id: any) {
    if (id) {
      try {
        this.agentService.deleteOneAgent(id).subscribe(res => {
          console.log(res);
          this.msgSuccess = true;
          this.changeSuccessMessage();
        },
          error => {
            console.error(error);
            this.msgError = true;
            this.changeDangerMessage();
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

  getAllAgents(): Agent[] {
    this.agentService.getAllAgent()
      .subscribe(
        data => {
          this.allAgents = data;
          console.log(this.allAgents);

        }
        ,
        errorCode => this.statusCode = errorCode);
    return this.allAgents;
  }

}
