import { Component } from '@angular/core';
import { Account } from './account.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private _account:Array<Account> = [
    {
      id:1,
      title: "ICICI Bank",
      description: "salary account",
      balance: 501.2
    },
    new Account(2,"State Bank of India","My college account",1024.1)  
  ]

  private _nextId = 3

  private createAcc(titleEl:any,descEL:any,balEl:any) {
    this._account.push(new Account(
                                this._nextId, //id of current instance
                                titleEl,
                                descEL,
                                balEl)
                              )
    this._nextId++
    titleEl.value = ""
    descEL.value = ""
    balEl.value = 0
  }
  //This method will delete the indexed account 1 at a time
  private removeAcc(index:number){
    this._account.splice(index,1)
  }
}
