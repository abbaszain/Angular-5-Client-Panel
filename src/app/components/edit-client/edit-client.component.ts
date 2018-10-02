import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from '../../models/Client';
import { Settings } from '../../models/Settings';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client={
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };
  editBalance:boolean;
  constructor(
    private clientServe: ClientService,
    private route: ActivatedRoute,
    private fms: FlashMessagesService,
    private router: Router,
    private setServe: SettingsService
  ) { }

  ngOnInit() {
    this.editBalance=this.setServe.getSettings().showBalOnEdit;
    this.id = this.route.snapshot.params['id'];
    this.clientServe.getClient(this.id).subscribe((client) => this.client = client);
  }

  onSubmit({value,valid}:{value:Client, valid: boolean}){
    if(!valid){
      this.fms.show('Please fill up the form correctly', {
        cssClass: 'alert-danger', timeout: 4000 
      });
    }else{
      value.id=this.id;
      this.clientServe.update(value);
      this.fms.show('Client info updated', {
        cssClass: 'alert-success', timeout: 4000 
      });
      this.router.navigate([`/client/${value.id}`])
    }
  }
}
