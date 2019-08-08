import { Produit } from './../model/produit.model';
import { ProduitService } from './../service/produit.service';
import { PreconfigService } from './../../pre-config/service/pre-config.service';
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { PagerService } from 'src/app/pager';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DomSanitizer } from "@angular/platform-browser";
@Component({
  templateUrl: 'list.component.html'
})
export class ListComponent {
  editUrl: string = "/product/edit";
  updateUrl: string = "/product/update";
  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];
  msgSuccess;
  msgError;
  statusCode: any;
  allProducts: Produit[];
  p: number = 1;
  image;
  staticAlertClosed = false;
  successMessage: string;
  dangerMessage: string;
  private _success = new Subject<string>();
  private _danger = new Subject<string>();

  constructor(private http: Http, private pagerService: PagerService, private router: Router, private preconfig: PreconfigService, private produitService: ProduitService, private domSanitizer: DomSanitizer) {

  }

  ngOnInit() {
    this.getAllProduits();
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
  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.allProducts.length, page);

    // get current page of items
    this.pagedItems = this.allProducts.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
  backToEdit() {
    this.router.navigate([this.editUrl]);
  }

  onDelete(id: any) {
    if (id) {
      try {
        this.produitService.onDeleteProduit(id).subscribe(res => {
          console.log(res);
          this.msgSuccess = true;
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


  goToUpdate(id: any) {
    if (id) {
      this.router.navigate([this.updateUrl, id]);
      console.error("updateCurrent in id = " + id);
    }

    // console.error("update id = " + id);
  }

  getAllProduits(): any[] {
    this.produitService.getAllProduit()
      .subscribe(
        data => {
          this.allProducts = data

          for (let i = 0; i < this.allProducts.length; i++) {
            console.log(this.allProducts[i]);
          }

        },
        errorCode => this.statusCode = errorCode);
    return this.allProducts;
  }


}
