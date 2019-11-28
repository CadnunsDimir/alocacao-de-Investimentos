import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { BankList, banksExample, Bank } from '../shared/entities/bank.entities';
import { AppComponent } from '../app.component';
import { BankStorageService } from '../shared/services/bank-storage/bank-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  pieChart: [];

  investimentsData: ChartDataSets[] = [
    { data: [], label: 'investimentos' },
  ];

  investmentLabels: Label[] = [];

  chartOptions = {
    responsive: true,
  };

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'pie';
  bankList: BankList;
  cardContents: { label: Label; value: number; percent: number; }[];
  typesData: ChartDataSets[];
  typesLabels: Label[];
  cardContents2: { label: Label; value: number; percent: number; }[];

  constructor(private app: AppComponent, private storage: BankStorageService) {

    this.app.title = 'Meus Investimentos';
    
    this.updateValues(new BankList([]));

    this.storage.$banks.subscribe(banks =>{
      this.updateValues(banks);
    });
  }

  valuesAndPercentual(dataValues: number[]) {
    const sum = dataValues.reduce((acc, value)=> acc + value);
    const dataPercentual = dataValues.map((value) => parseInt((value / sum * 10000).toString()) / 100);
    return {values: dataValues, percentuals: dataPercentual};
  }

  updateValues(banks: BankList){
    this.bankList = banks;
    console.log(JSON.stringify(this.bankList));

    this.investmentLabels = ['ações', 'CDB', 'poupança', 'TD', 'saldo contas'];

    const infos = this.valuesAndPercentual([this.bankList.stockAmount, this.bankList.depositaryReceiptAmount, this.bankList.savingsAmount, this.bankList.treasuryBondsAmount, this.bankList.accountBalance]);

    this.investimentsData[0].data = infos.percentuals;

    this.cardContents = this.cards(this.investmentLabels, infos.percentuals, infos.values);

    const infos2 = this.valuesAndPercentual([this.bankList.fixedeIncomeAmount, this.bankList.variableIncomeAmount]);

    this.typesData = [
      { data: infos2.percentuals, label: 'investimentos' },
    ];

    this.typesLabels = ['renda fixa', 'renda variavel'];

    this.cardContents2 = this.cards(this.typesLabels, infos2.percentuals, infos2.values);
  }

  cards(labels: Label[], perc: number[], values: number[]) {
    return labels.map((v, i) => ({
      label: v,
      value: parseInt((values[i] * 100).toString()) / 100,
      percent: perc[i]
    }));
  }

  ngOnInit(): void {

  }

  indice = 0;

  adicionaBancoFake() {
    this.storage.insertBank(banksExample[this.indice % banksExample.length]);
    this.indice++;
  }
}
