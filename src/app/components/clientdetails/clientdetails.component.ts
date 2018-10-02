import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from '../../models/Client';
@Component({
  selector: 'app-clientdetails',
  templateUrl: './clientdetails.component.html',
  styleUrls: ['./clientdetails.component.css']
})
export class ClientdetailsComponent implements OnInit {

  constructor(private clientServe: ClientService,
    private route: ActivatedRoute,
    private fms: FlashMessagesService,
    private router: Router) { }

  id: string;
  client: Client;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.clientServe.getClient(this.id).subscribe((client) => {
      if (client != null) {
        if (client.balance) {
          this.hasBalance = true;
        }
        this.client = client;
      }
    });
  }
  updateBalance() {
    this.clientServe.update(this.client);
    this.fms.show('Balance has been Updated', {
      cssClass: 'alert-success', timeout: 4000
    });
  }
  onDelete() {
    if(confirm('Do you want to remove this client?')){
    this.clientServe.delClient(this.client);
    this.fms.show(`Client ${this.client.firstName} ${this.client.lastName} has been removed`, {
      cssClass: 'alert-primary', timeout: 4000
    });
    this.router.navigate(['']);
    }
  }
}
