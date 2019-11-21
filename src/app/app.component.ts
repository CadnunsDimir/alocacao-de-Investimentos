import { Component } from '@angular/core';
import { BankList, banksExample } from './shared/entities/bank.entities';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  banks;
  stock: any[];
  bankList: BankList;

  constructor() {
    this.bankList = new BankList(banksExample);
    console.log(JSON.stringify(this.bankList));

    this.banks = this.bankList.banks.map(x=> x.name);
    this.stock = this.bankList.banks.map(x=> x.stockAmount);
  }
}
