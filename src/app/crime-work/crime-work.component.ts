import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { CommonService } from '../_services/common.service';

@Component({
  selector: 'app-crime-work',
  templateUrl: './crime-work.component.html',
  styleUrls: ['./crime-work.component.css']
})
export class CrimeWorkComponent implements OnInit {

  @ViewChild(BaseChartDirective) public chart: BaseChartDirective;

  constructor(private mainService: CommonService) {
    this.change();
    // this.getWork();
    // this.getEducation();
  }

  public info: string;
  private prevDatasets;
  private datasets = [];
  private data = [];
  private show = false;
  private crime_end_type = 'Geregistreerde misdrijven';
  private crime_type = 'totaal';
  private crime_types = [];

  private work_value_type = 'Banen';
  private branch_type = 'A-U Alle economische activiteiten';
  private worker_type = 'Totaal';
  private work_value_types = [];

  private labels = [];

  private options = {
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Criminaliteit ->',
          fontSize: 20
        },
        ticks: {
          beginAtZero: false,
          // display: false;
        }
      }],
      xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Werk ->',
            fontSize: 20
          }
      }]
    }
  };

  ngOnInit() {
    console.log('running');
    this.mainService.getCrimeType().subscribe((data: [any]) => {
      this.crime_types = data;
      console.log(this.crime_types);
    });
    this.mainService.getWorkValueType().subscribe((data: [any]) => {
      this.work_value_types = data;
      console.log(this.work_value_types);
    });
  }

  initData() {
    this.mainService.getCrime('Geregistreerde misdrijven', 'totaal').subscribe((crime: [any]) => {
      console.log(crime);
      crime.forEach(e => {
        this.data.push({
          year : e.year,
          crime_amount : e.amount,
          education_amount : 0,
          work_amount : 0
        });
      });
      this.mainService.getWork('Banen', 'Totaal', 'A-U Alle economische activiteiten').subscribe((work: [any]) => {
        console.log(work);
        work.forEach(el => {
          // console.log(element);
          this.data.forEach(e => {
            if (e.year === el.year) {
              e.work_amount = el.amount;
              // console.log(e);
            }
          });
        });
        this.mainService.getEducation('Totaal mannen en vrouwen', 'Totaal').subscribe((data: [any]) => {
          data.forEach(el => {
            // console.log(element);
            this.data.forEach(e => {
              if (e.year === el.year) {
                e.education_amount = el.amount;
                // console.log(e);
              }
            });
          });
          console.log(this.data);
          console.log(this.data.map(res => ({x : res.education_amount, y : res.crime_amount})));
          this.datasets = [{
            label: 'vergelijking',
            data: this.data.map(res => ({x : res.work_amount, y : res.crime_amount}))
          }];
          this.labels = this.data.map(res => res.work_amount);
          this.show = true;
        });
      });

    });
  }



  change() {
    this.initData();

    console.log(this.data);
    console.log(this.data.length);

    // this.datasets = [{
    //   label: 'test',
    //   data: )
    // }];

    // this.labels = ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2018'];
  }

  clickData_WrongAnimation() {
    this.labels.shift();
    this.chart.datasets[0].data.shift();

    const random = Math.round((Math.random() * (20 - 0)) + 0);
    this.chart.datasets[0].data.push(random);
    this.labels.push('Caption');

    // once new data is computed and datasets are updated, tell our baseChart the datasets changed
    this.chart.ngOnChanges({
      datasets: {
        currentValue: this.chart.datasets,
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true
      }
    });
  }

  clickData_CorrectAnimation() {
    const random = Math.round((Math.random() * (29 - 0)) + 0);

    const newData = this.datasets[0].data.slice();
    newData.shift();
    newData.push(random);

    this.datasets = [{
      label: '# of Votes',
      data: newData
    }];
  }

  crimeFilter(crime_end_type = 'Geregistreerde misdrijven', crime_type = 'totaal'): void {
    // const cet = crime_end_type !== undefined ? this.crime_end_type : 'Geregistreerde misdrijven';
    // const ct = crime_type !== undefined ? this.crime_type : 'totaal';
    this.crime_end_type = crime_end_type;
    this.crime_type = crime_type;
    console.log(crime_end_type);
    console.log(crime_type);
    this.mainService.getCrime(crime_end_type, crime_type).subscribe((crime: [any]) => {
      console.log(crime);
      crime.forEach(el => {

        this.data.forEach(e => {
          if (e.year === el.year) {
            e.crime_amount = el.amount;
          }
        });
      });
      // console.log(this.data);
      this.datasets = [{
        label: 'vergelijking',
        data: this.data.map(res => ({x : res.work_amount, y : res.crime_amount}))
      }];
    });
  }


  workFilter(wvtName = 'Banen', typeName = 'Totaal', branch = 'A-U Alle economische activiteiten'): void {

    this.work_value_type = wvtName;
    this.worker_type = typeName;
    this.branch_type = branch;

    console.log(wvtName);
    console.log(typeName);
    console.log(branch);
    this.mainService.getWork(wvtName, typeName, branch).subscribe((work: [any]) => {
      console.log(work);
      work.forEach(el => {

        this.data.forEach(e => {
          if (e.year === el.year) {
            console.log(el.amount);
            e.work_amount = el.amount;
          }
        });
      });
      // console.log(this.data);
      this.datasets = [{
        label: 'vergelijking',
        data: this.data.map(res => ({ x: res.work_amount, y: res.crime_amount }))
      }];
      this.chart.chart.config.data.labels = this.data.map(res => res.work_amount);
    });
  }
}
