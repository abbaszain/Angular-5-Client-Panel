import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from '../../models/Client';
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';
import { ClientService } from '../../services/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };

  @ViewChild('clientForm') form: any;

  disableBalanceOnAdd: boolean;
  constructor(
    private fms: FlashMessagesService,
    private clientServe: ClientService,
    private router: Router,
    private route: ActivatedRoute,
  private setServe: SettingsService) { }

  ngOnInit() {
    this.disableBalanceOnAdd=this.setServe.getSettings().hideBalOnAdd;
  }
  newClient({ value, valid }: { value: Client, valid: boolean }) {
    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }
    if (!valid) {
      //Show error
      this.fms.show('Form cannot be submitted due to some errors. Please check it out closely.', {
        cssClass: 'alert-danger', timeout: 5000
      });
    } else {
      //Add new client
      this.clientServe.addClient(value);
      //Redirect to dash
      this.fms.show('Client added successfully', {
        cssClass: 'alert-success', timeout: 5000
      });
      this.router.navigate(['']);
    }
  }
}
