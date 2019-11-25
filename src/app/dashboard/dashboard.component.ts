import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { BankList, banksExample } from '../shared/entities/bank.entities';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  pieChart: [];

  lineChartData: ChartDataSets[] = [
    { data: [], label: 'investimentos' },
  ];

  lineChartLabels: Label[] = [];

  lineChartOptions = {
    responsive: true,
  };

  // lineChartColors: Color[] = [
  //   {
  //     borderColor: 'black',
  //     backgroundColor: 'rgba(255,255,0,0.28)',
  //   },
  // ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'pie';
  bankList: BankList;
  cardContents: { label: Label; value: number; percent: number; }[];

  constructor() {
    this.bankList = new BankList(banksExample);
    console.log(JSON.stringify(this.bankList));

    this.lineChartLabels = ['ações', 'CDB', 'poupança', 'TD', 'saldo contas'];
    let dataValues = [this.bankList.stockAmount, this.bankList.depositaryReceiptAmount, this.bankList.savingsAmount, this.bankList.treasuryBondsAmount, this.bankList.accountBalance];
    
    const sum = dataValues.reduce((acc, value)=> acc + value);
    const dataPercentual = dataValues.map((value) => parseInt((value / sum * 10000).toString()) / 100);

    this.lineChartData[0].data = dataPercentual;

    this.cardContents = this.lineChartLabels.map((v, i) => { return {
      label: v,
      value: parseInt((dataValues[i] * 100).toString()) / 100,
      percent: dataPercentual[i]
    };})
  }

  ngOnInit(): void {

  }
}
