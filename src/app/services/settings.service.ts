import { Injectable } from '@angular/core';
import { Settings } from '../models/Settings';

@Injectable()
export class SettingsService {

  settings: Settings={
    showRegister: false,
    hideBalOnAdd: false,
    showBalOnEdit: false
  }
  constructor() { 
    if(localStorage.getItem('settings')!=null){
      this.settings=JSON.parse(localStorage.getItem('settings'));
    }
  }
  getSettings(){
    return this.settings;
  }

  changeSettings(settings: Settings){
    localStorage.setItem('settings',JSON.stringify(this.settings));
  }
}
