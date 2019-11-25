import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { BankList, banksExample } from '../shared/entities/bank.entities';
import { AppComponent } from '../app.component';

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

  constructor(private app: AppComponent) {

    this.app.title = 'Meus Investimentos';
    
    this.bankList = new BankList(banksExample);
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

    this.cardContents2 = this.cards(this.typesLabels, infos2.percentuals, infos2.values)
    
  }

  valuesAndPercentual(dataValues: number[]) {
    const sum = dataValues.reduce((acc, value)=> acc + value);
    const dataPercentual = dataValues.map((value) => parseInt((value / sum * 10000).toString()) / 100);
    return {values: dataValues, percentuals: dataPercentual};
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
}
