import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email:string;
  password: string;
  constructor(
    private setServe: SettingsService,
    private authServe: AuthService,
    private router: Router,
    private fms: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onSubmit(){
    this.authServe.register(this.email,this.password).then(res => {
      this.fms.show('Registered',{
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/login']);
    }).catch(err => {
      this.fms.show(err.message,{
        cssClass: 'alert-danger', timeout: 4000
      })
    });
  }
}
