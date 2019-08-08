import { BoutiqueService } from './../service/boutique.service';
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { PagerService } from 'src/app/pager';
import { Router } from '@angular/router';
import { Boutique } from '../model/boutique.model';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
@Component({
  templateUrl: 'list.component.html'
})
export class ListComponent {

  editUrl: string = "/boutique/edit";
  updateUrl: string = "/boutique/update";
  // pager object
  pager: any = {};
  msgSuccess: any;
  msgError: any;
  // paged items
  pagedItems: any[];
  statusCode: any;
  allBoutiques: Boutique[];
  p: number = 1;
  private _success = new Subject<string>();
  private _danger = new Subject<string>();


  staticAlertClosed = false;
  successMessage: string;
  dangerMessage: string;
  constructor(private http: Http, private pagerService: PagerService, private router: Router, private boutiqueService: BoutiqueService) {

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
    this.pager = this.pagerService.getPager(this.allBoutiques.length, page);

    // get current page of items
    this.pagedItems = this.allBoutiques.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
  backToEdit() {
    this.router.navigate([this.editUrl]);

  }

  onDelete(id: any) {
    if (id) {
      try {
        this.boutiqueService.deleteOneBoutique(id).subscribe(res => {
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

  getAllBoutiques(): Boutique[] {
    this.boutiqueService.getAllBoutique()
      .subscribe(
        data => this.allBoutiques = data,
        errorCode => this.statusCode = errorCode);
    return this.allBoutiques;
  }


}
