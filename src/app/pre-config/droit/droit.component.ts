import { PreconfigService } from './../service/pre-config.service';
import { Component, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { PagerService } from 'src/app/pager';
import { Droit } from '../model/droit.model';
import { keyframes } from '@angular/animations';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
@Component({
    templateUrl: 'droit.component.html'
})
export class DroitComponent {

    pager: any = {};
    entity: Droit = new Droit(null, null, null, null);
    // paged items
    pagedItems: any[];
    statusCode: any;
/*     allDroits: Droit[];
 */    msgSuccess: boolean = false;
    msgError: boolean = false;
    @ViewChild('f') form: any;
    entityUpdate: any;
    doUpdate: boolean = false;
    doCreate: boolean = true;
    allDroits: Droit[];
    p: number = 1;
    private _success = new Subject<string>();
    private _danger = new Subject<string>();
    staticAlertClosed = false;
    successMessage: string;
    dangerMessage: string;
    constructor(private http: Http, private pagerService: PagerService, private droitService: PreconfigService) {

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
        this.getAllDroits();
        this.init();
    }

    public changeSuccessMessage() {
        this._success.next(`Requête exécutée avec succès .`);
    }

    public changeDangerMessage() {
        this._danger.next(`Oups erreur.`);
    }

    getAllDroits(): Droit[] {
        this.droitService.getAllDroits()
            .subscribe(
                data => this.allDroits = data,
                errorCode => this.statusCode = errorCode);
        console.log(this.allDroits);
        return this.allDroits;
    }
    forUpdate(droit: any) {
        console.log("droit" + JSON.stringify(droit));
        /*update state*/
        this.doCreate = false;
        this.doUpdate = true;
        this.entityUpdate = droit;
    }
    init() {
        this.doUpdate = false;
        this.doCreate = true;
    }

    onSubmit() {
        if (this.form.valid) {
            try {
                this.droitService.saveDroit(this.entity).subscribe(
                    res => {
                        this.msgSuccess = true;
                        this.form.reset();
                        this.getAllDroits();

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

    onDelete(id: any) {
        if (id) {
            try {
                this.droitService.onDeleteDroit(id).subscribe(res => {
                    console.log(res);
                    this.msgSuccess = true;
                    this.getAllDroits();

                },
                    error => {
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
        // if (id) {
        try {
            this.droitService.updateDroit(this.entityUpdate).subscribe(res => {
                console.log(res);
                this.msgSuccess = true;
                this.getAllDroits();
                this.changeSuccessMessage();
                this.init();

            },
                error => {
                    console.error(error);
                    this.msgError = true;
                });
        } catch (error) {
            console.log("exception e = " + error);
            console.log(" form end exeception");

        }


        // }

    }



}
