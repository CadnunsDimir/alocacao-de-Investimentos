import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { AppComponent } from '../app.component';
import { Bank } from '../shared/entities/bank.entities';
import { BankStorageService } from '../shared/services/bank-storage/bank-storage.service';


@Component({
  selector: 'app-new-bank',
  templateUrl: './new-bank.component.html',
  styleUrls: ['./new-bank.component.css']
})
export class NewBankComponent implements OnInit {

  formulario: FormGroup;
  
  constructor(private app: AppComponent, 
    private formBuilder: FormBuilder,
    private storage: BankStorageService) {
    app.title = "Cadastrar Instituição"
   }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      name: [null],
      stockAmount: [null],
      depositaryReceiptAmount: [null],
      savingsAmount: [null],
      treasuryBondsAmount: [null],
      accountBalance: [null]
    });
  }
  onSubmit(){
    const bank: Bank = this.formulario.value;
    console.log(bank);
    this.storage.insertBank(bank);
    this.formulario.reset();
  }
}
