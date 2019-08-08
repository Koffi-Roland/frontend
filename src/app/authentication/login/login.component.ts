import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/api/login.service.old';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { first } from 'rxjs/operators';
@Component({
    selector: 'app-login',
    styleUrls: ['./login.component.css'],
    templateUrl: './login.component.html'
})
export class LoginComponent {
    returnUrl: string;
    @ViewChild('f') form: any;

    constructor(private router: Router, private loginService: LoginService,
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService) {
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/home/dashboard']);
        }
    }

    loginform = true;
    recoverform = false;
    errMsg: any;
    model: any = {};
    pseudo: any;
    password: any;
    msg: any;
    showRecoverForm() {
        this.loginform = !this.loginform;
        this.recoverform = !this.recoverform;
    }


    ngOnInit() {
        // this.loginService.logout(false);
        // get return url from route parameters or default to '/'
        this.returnUrl = /*this.route.snapshot.queryParams['returnUrl'] ||*/ '/home/dashboard';
        console.log("xxxxx" + this.route.snapshot.queryParams['returnUrl']);
    }

    login() {
        if (this.form.invalid) {
            return;
        }


        this.authenticationService.login(this.model.pseudo, this.model.password)
            .pipe(first())
            .subscribe(

                data => {
                    this.router.navigate([this.returnUrl]);
                   // this.router.navigate(['/agent/edit']);

                    console.log("success login");
                },
                error => {
                    //this.alertService.error(error);
                    console.error("hello error login");
                    this.errMsg = true;
                    this.msg = "Mot de passe ou login incorrect";
                });
    }

}
