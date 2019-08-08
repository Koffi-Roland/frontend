import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import * as _ from 'underscore';

import { Http } from '@angular/http';
import { PagerService } from 'src/app/pager/index';
import { Types } from '../model/types.model';
import { PreconfigService } from '../service/pre-config.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
@Component({
    templateUrl: 'type.component.html'
})
export class TypeComponent {

    pager: any = {};
    entity: Types = new Types(null, null, null);
    // paged items
    pagedItems: any[];
    statusCode: any;
    msgSuccess: boolean = false;
    msgError: boolean = false;
    @ViewChild('f') form: any;
    entityUpdate: any;
    doUpdate: boolean = false;
    doCreate: boolean = true;
    p: number = 1;
    allTypes: Types[];
    private _success = new Subject<string>();
    private _danger = new Subject<string>();
    staticAlertClosed = false;
    successMessage: string;
    dangerMessage: string;
    constructor(private http: HttpClient, private pagerService: PagerService, private typeService: PreconfigService) {

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
        // initialize to page 1
        // this.setPage(1);
        this.init();
        this.getAllTypes();
    }
    public changeSuccessMessage() {
        this._success.next(`Requête exécutée avec succès .`);
    }

    public changeDangerMessage() {
        this._danger.next(`Oups erreur.`);
    }

    getAllTypes(): Types[] {
        this.typeService.getAllTypes()
            .subscribe(
                data => {
                    this.allTypes = data;
                    //this._allTypes = Array.of(this.allTypes);
                    //  console.log("info" + JSON.stringify(this._allTypes));
                }
                ,
                errorCode => this.statusCode = errorCode);
        return this.allTypes;
    }
    forUpdate(types: any) {
        console.log("types" + JSON.stringify(types));
        /*update state*/
        this.doCreate = false;
        this.doUpdate = true;
        this.entityUpdate = types;
    }
    init() {
        this.doUpdate = false;
        this.doCreate = true;
    }

    onSubmit() {
        if (this.form.valid) {
            try {
                this.typeService.saveType(this.entity).subscribe(
                    res => {
                        this.msgSuccess = true;
                        this.getAllTypes();

                        this.form.reset();
                        this.changeSuccessMessage();

                        console.log(res);
                    }, error => {
                        this.changeDangerMessage();
                        this.msgError = false;
                        console.log(error);
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
                this.typeService.onDeleteType(id).subscribe(res => {
                    console.log(res);
                    this.msgSuccess = true;
                    this.getAllTypes();
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
        //  if (id) {
        try {
            this.typeService.updateType(this.entityUpdate).subscribe(res => {
                console.log(res);
                this.msgSuccess = true;
                this.getAllTypes();
                this.changeSuccessMessage();

                this.init();

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

    // }

}
