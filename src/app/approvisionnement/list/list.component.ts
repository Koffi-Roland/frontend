
import { Component, ViewChild } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbDateAdapter, NgbDateNativeAdapter, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Approvisionnement } from '../model/appro.model';
import { Boutique } from 'src/app/boutique/model/boutique.model';
import { BoutiqueService } from 'src/app/boutique/service/boutique.service';

@Component({
  templateUrl: 'list.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class ListComponent {
  @ViewChild('f') form: any;
  statusCode:any;  
  entity: Approvisionnement = new Approvisionnement(null);


  allBoutiques:Boutique[];
  constructor(private router: Router, private boutiqueService:BoutiqueService) {

  }

  ngOnInit() {
  

  }


  /*getAllBoutiques(): Boutique[] {
    this.boutiqueService.getAllBoutique()
      .subscribe(
        data => this.allBoutiques = data,
        errorCode => this.statusCode = errorCode);
    return this.allBoutiques;
  }*/

 



  
  onSubmit() {
   
  }
}
