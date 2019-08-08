import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AgentService } from '../service/agent.service';
@Component({
  templateUrl: 'update.component.html'
})
export class UpdateComponent {
  listUrl: string = "/agent/list";
  msgSuccess: any;
  msgError: any;
  feminin: any;
  masculin: any;
  image;
  id;
  statusCode;
  entityUpdate:any;
  @ViewChild('f') form: any;
  constructor(private router: Router, private agentService: AgentService, private route: ActivatedRoute,) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    console.log(" id = " + this.id);
  }

  ngOnInit() {
    this.agentService.getOneAgent(this.id).subscribe(
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
        this.entityUpdate.photoProfil = this.image;
        console.log("entity" + JSON.stringify(this.entityUpdate));
        this.agentService.updateOneAgent(this.entityUpdate).subscribe(res => {
          this.form.reset();
          this.msgSuccess = true;
          this
        },
          error => {
            this.msgError = true;

          }
        );
      } catch (error) {
        console.log("exception e = " + error);
        console.log(" form end exeception");
      }

    }
  }
}
