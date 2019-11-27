import { Component } from '@angular/core';
import { BankList, banksExample } from './shared/entities/bank.entities';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';


  constructor() {
  }
}
