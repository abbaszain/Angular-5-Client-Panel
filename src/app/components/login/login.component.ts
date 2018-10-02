import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  constructor(private authServe: AuthService,
    private router: Router,
    private fms: FlashMessagesService) { }

  ngOnInit() {
    this.authServe.getAuth().subscribe(auth => {
      if(auth){
        this.router.navigate(['/']);
      }
    });
  }
  onSubmit(){
    this.authServe.login(this.email, this.password).then(res => {
      this.fms.show('You are Logged in successfully', 
    {cssClass: 'alert-success', timeout: 4000});
    this.router.navigate(['/']);
    })
    .catch(err => {
      this.fms.show(err.message, 
    {cssClass: 'alert-danger', timeout: 4000});
    })
    }
  }
