import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ROUTES } from './menu-items';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Agent } from 'src/app/agent/model/agent.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  showMenu = '';
  showSubMenu = '';
  currentUserInfo;
  profil;
  private currentUserSubject: BehaviorSubject<Agent>;
  public currentUser: Observable<Agent>;
  public sidebarnavItems: any[];
  // this is for the open close
  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }
  addActiveClass(element: any) {
    if (element === this.showSubMenu) {
      this.showSubMenu = '0';
    } else {
      this.showSubMenu = element;
    }
  }

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) {
    this.currentUserSubject = new BehaviorSubject<Agent>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentUserInfo=localStorage.getItem('currentUser');
  }

  // End open close
  ngOnInit() {
    this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem);
    this.showProfil();
  }
showProfil(){
if(localStorage.getItem('profil')=="true"){
this.profil=true;
}else{
  this.profil=false;
}
}
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/authentication/login']);

    //this.router.navigate(["/authentication/login"]);

  }
}
