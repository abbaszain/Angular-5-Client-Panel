import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients:Client[];
  total:number=0;
  isLoaded:boolean=false;
  constructor(private clientServe: ClientService) { }

  ngOnInit() {
    this.isLoaded=false;
    this.clientServe.getClients().subscribe((clients) =>{
      //The traditional way to add up the balance
      /*  clients.forEach((cur,index) =>{
      this.total+=parseFloat(cur.balance.toString());
      });*/
     this.clients=clients; 
      //A modern javascript way to add up the balance
      this.total=this.getTotalOwed();
      this.isLoaded=true;
    });
  }
  getTotalOwed(){
    const total=this.clients.reduce((total,client) => {
      return total + parseFloat(client.balance.toString());
    },0);
    return total;
  }
}
