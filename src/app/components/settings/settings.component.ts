import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Settings } from '../../models/Settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settings: Settings;

  constructor(
    private setServe: SettingsService,
    private router: Router,
    private fms: FlashMessagesService
  ) { }

  ngOnInit() {
    this.settings=this.setServe.getSettings();
  }
  onSubmit(){
    this.setServe.changeSettings(this.settings);
    this.fms.show('Settings have been changed as required', {
      cssClass: 'alert-primary', timeout: 4000
    });
    this.router.navigate(['/']);

  }

}
