import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  loggedIn: string;
  allowToRegister:boolean;
  constructor(
    private authServe: AuthService,
    private fms: FlashMessagesService,
    private router: Router,
    private setServe: SettingsService) { }

  ngOnInit() {
    this.allowToRegister=this.setServe.getSettings().showRegister;
    this.authServe.getAuth().subscribe((auth) => {
      if (auth) {
        this.isLoggedIn = true;
        this.loggedIn = auth.email;
      } else {
        this.isLoggedIn = false;
      }
    })
  }

  onLogOut() {
    this.authServe.logout();
    this.fms.show('Logged Out Successfully',
      {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/login']);
    }

}
