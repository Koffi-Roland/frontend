import { Component, ViewChild } from '@angular/core';
import { BoutiqueService } from '../service/boutique.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  templateUrl: 'update.component.html'
})
export class UpdateComponent {
  listUrl: string = "/boutique/list";

  msgSuccess: boolean = false;
  msgError: boolean = false;
  @ViewChild('f') form: any;
  entityUpdate: any;
  id;
  statusCode;
  constructor(private router: Router, private route: ActivatedRoute, private boutiqueService: BoutiqueService) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    console.log(" id = " + this.id);
  }

  ngOnInit() {
    this.boutiqueService.getOneBoutique(this.id).subscribe(
      (res) => {

        this.entityUpdate = res.body;

        console.log('entity update' + JSON.stringify(this.entityUpdate));
      },
      err => {
        console.log('erreur de id' + JSON.stringify(err));
        this.statusCode = err.statuts;
      }

    );

  }
  backToList() {
    this.router.navigate([this.listUrl]);

  }
  onSubmit() {
    if (this.form.valid) {
      try {
        this.boutiqueService.updateOneBoutique(this.entityUpdate).subscribe(
          res => {
            this.msgSuccess = true;
            this.form.reset();

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


    } else {
      console.log("Form not Submitted!");
      //            this.ngOnInit();
    }

  }
}
