import { Component, OnInit } from '@angular/core';
import { BankStorageService } from '../shared/services/bank-storage/bank-storage.service';
import { Observable } from 'rxjs';
import { BankList, Bank } from '../shared/entities/bank.entities';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-my-accounts',
  templateUrl: './my-accounts.component.html',
  styleUrls: ['./my-accounts.component.scss']
})
export class MyAccountsComponent implements OnInit {
  $banks: Observable<BankList>;

  constructor(private app: AppComponent, private storage: BankStorageService) {
    this.app.title = 'Minhas Contas';
    this.$banks = storage.$banks;
  }

  ngOnInit() {
  }
}
