import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SettingsService } from '../services/settings.service';


@Injectable()
export class SettingsGuard implements CanActivate{
    constructor(
        private setServe: SettingsService,
        private router: Router
    ){}
    canActivate():boolean{
        if(this.setServe.getSettings().showRegister){
            return true;
        }
        else{
            this.router.navigate(['/login']);
            return false;
        }
    }
}