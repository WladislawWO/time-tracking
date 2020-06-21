import { AuthService } from './../auth/auth.service';
import { UserDataService } from './../user-data.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { Goals, FbResponce } from '../interface';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss'],
})
export class StatisticComponent implements OnInit {
  public lineChartData: ChartDataSets[] = [
    { data: [], label: this.route.snapshot.params.id },
    // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    // {
    //   data: [180, 480, 770, 90, 1000, 270, 400],
    //   label: 'Series C',
    //   yAxisID: 'y-axis-1',
    // },
  ];
  public lineChartLabels: Label[] = [];
  // public lineChartLabels: Label[] = [
  //   'January',
  //   'February',
  //   'March',
  //   'April',
  //   'May',
  //   'June',
  //   'July',
  // ];
  public lineChartOptions: ChartOptions & { annotation: any } = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,255,255,0.1)',
          },
          ticks: {
            fontColor: 'rgba(255,255,255,0.1)',
          },
        },
      ],
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno',
          },
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    {
      // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
    },
    {
      // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)',
    },
    {
      // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(
    private route: ActivatedRoute,
    private user: UserDataService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    let dates = [],
      times = [],
      programming = [],
      reading = [],
      english = [];
    this.auth.getUserState().subscribe((user) => {
      this.user.getStatisticData(user).subscribe((res: FbResponce[]) => {
        if (dates.length > 0) return;
        if (this.route.snapshot.params.id === 'All') {
          res.map((g) => {
            dates.push(g.data.date.split('-')[0]);
            programming.push(g.data.programming);
            reading.push(g.data.reading);
            english.push(g.data.english);
          });

          this.lineChartData = [
            { data: programming, label: 'programming' },
            { data: reading, label: 'reading' },
            { data: english, label: 'english' },
          ];
          this.lineChartLabels = dates;
          if (dates.length < 7) {
            if (dates.length !== 0) {
              const date = new Date();
              for (let i = dates.length; i < 7; i++) {
                date.setDate(date.getDate() + 1);
                programming.push(date.getDate());
                english.push(date.getDate());
                reading.push(date.getDate());
                times.push(0);
              }
            }
          }
          this.chart.update();
        } else {
          res.map((g) => {
            dates.push(g.data.date.split('-')[0]);
            times.push(g.data[this.route.snapshot.params.id]);
          });

          this.lineChartData = [
            { data: times, label: this.route.snapshot.params.id },
          ];
          this.lineChartLabels = dates;
          if (dates.length < 7) {
            if (dates.length !== 0) {
              const date = new Date();
              for (let i = dates.length; i < 7; i++) {
                date.setDate(date.getDate() + 1);
                dates.push(date.getDate());
                times.push(0);
              }
            }
          }
          this.chart.update();
        }
      });
    });
  }

  public randomize(): void {
    for (let i = 0; i < this.lineChartData.length; i++) {
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        this.lineChartData[i].data[j] = this.generateNumber(i);
      }
    }
    this.chart.update();
  }

  private generateNumber(i: number) {
    return Math.floor(Math.random() * (i < 2 ? 100 : 1000) + 1);
  }

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public hideOne() {
    const isHidden = this.chart.isDatasetHidden(1);
    this.chart.hideDataset(1, !isHidden);
  }

  public pushOne() {
    this.lineChartData.forEach((x, i) => {
      const num = this.generateNumber(i);
      const data: number[] = x.data as number[];
      data.push(num);
    });
    this.lineChartLabels.push(`Label ${this.lineChartLabels.length}`);
  }

  public changeColor() {
    this.lineChartColors[2].borderColor = 'green';
    this.lineChartColors[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
  }

  public changeLabel() {
    this.lineChartLabels[2] = ['1st Line', '2nd Line'];
    // this.chart.update();
  }
}
