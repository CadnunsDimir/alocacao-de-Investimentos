import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BankList, Bank } from '../../entities/bank.entities';

@Injectable({
  providedIn: 'root'
})
export class BankStorageService {

  private storageKey = "57e0eeae-1ae8-4d5b-b6d9-7a334a0b9bde";

  private $_banks: BehaviorSubject<BankList>;

  constructor() {
    const banks = (JSON.parse(localStorage.getItem(this.storageKey)) || []) as Bank[];
    if(banks.length == 0){
      localStorage.setItem(this.storageKey, JSON.stringify(banks));
    }

    this.$_banks = new BehaviorSubject<BankList>(new BankList(banks));
  }

  get $banks() {
    return this.$_banks.asObservable();
  }

  bankListFromStorage() {
    const banks = (JSON.parse(localStorage.getItem(this.storageKey)) || []) as Bank[];
    if(banks.length == 0){
      localStorage.setItem(this.storageKey, JSON.stringify(banks));
    }

    return banks;
  }

  insertBank(bank: Bank){
    const banks = this.bankListFromStorage();
    banks.push(bank);
    this.saveListOnStorage(banks);
  }

  private saveListOnStorage(banks: Bank[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(banks));
    this.$_banks.next(new BankList(banks));
  }

  updateBankByName(oldName: String, bank: Bank){
    const banks = this.bankListFromStorage();
    banks.forEach(dbEntity => {
      if(dbEntity.name === oldName){
        for (const campo in dbEntity) {
          if (dbEntity.hasOwnProperty(campo)) {
            dbEntity[campo] = bank[campo];
          }
        }
      }
    });
    this.saveListOnStorage(banks);
  }
}
