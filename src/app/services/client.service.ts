import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Client } from '../models/Client';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class ClientService {

  clientsCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;

  constructor(private afs: AngularFirestore) { 
    this.clientsCollection=this.afs.collection('clients',(ref)=> 
    ref.orderBy('lastName','asc'));
  }

  getClients():Observable<Client[]>{
    this.clients=this.clientsCollection.snapshotChanges().map((changes)=>{
      return changes.map((action) => {
        const data = action.payload.doc.data() as Client;
        data.id= action.payload.doc.id;
        return data;
      });
    });
    return this.clients;
  }

  addClient(client: Client){
    this.clientsCollection.add(client);
  }

  getClient(id):Observable<Client>{
    this.clientDoc=this.afs.doc<Client>(`clients/${id}`);
    this.client=this.clientDoc.snapshotChanges().map((action) =>{
      if(action.payload==null){
        return null;
      }else{
        const data=action.payload.data() as Client;
        data.id=action.payload.id;
        return data;
      }
    });
    return this.client;
  }
  update(client: Client){
    this.clientDoc = this.afs.doc(`clients/${client.id}`);
    this.clientDoc.update(client);
  }
  delClient(client: Client){
    this.clientDoc=this.afs.doc(`clients/${client.id}`);
    this.clientDoc.delete();
  }
}
