import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../_services/common.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-crime-education',
  templateUrl: './crime-education.component.html',
  styleUrls: ['./crime-education.component.css']
})
export class CrimeEducationComponent implements OnInit {

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
  private gender = 'Totaal mannen en vrouwen';
  private education_type = 'Totaal';
  private crime_types = [];
  private education_types = [];


  private labels = [];

  private options = {
    tooltips: {
      callbacks: {
        title: function (tooltipItem, data) {
          const title = [data.datasets[0].data[tooltipItem[0].index].label];
          return title;
        },
        label: function (tooltipItem, data) {
          const label = ['Opleiding: ' + tooltipItem.xLabel, 'Criminaliteit: ' + tooltipItem.yLabel];

          return label;
        }
      }
    },
    legend: {
      display: false
    },
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
          labelString: 'Opleiding ->',
          fontSize: 20
        }
      }],
    }
  };

  ngOnInit() {
    console.log('running');
    this.mainService.getCrimeType().subscribe((data: [any]) => {
      this.crime_types = data;
      console.log(this.crime_types);
    });
    this.mainService.getEducationType().subscribe((data: [any]) => {
      this.education_types = data;
      console.log(this.education_types);
    });
  }

  initData() {
    this.mainService.getCrime('Geregistreerde misdrijven', 'totaal').subscribe((crime: [any]) => {
      console.log(crime);
      crime.forEach(e => {
        this.data.push({
          year: e.year,
          crime_amount: e.amount,
          education_amount: 0,
          work_amount: 0
        });
      });
      this.mainService.getWork('Banen', 'Totaal', 'A-U Alle economische activiteiten').subscribe((work: [any]) => {
        console.log(work);
        work.forEach(el => {
          // console.log(element);
          this.data.forEach(e => {
            if (e.year === el.year) {
              e.work_amount = +el.amount;
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
          console.log(this.data.map(res => ({ x: res.education_amount, y: res.crime_amount })));
          this.datasets = [{
            // label: 'vergelijking',
            data: this.data.map(res => ({ x: res.education_amount, y: res.crime_amount, label: res.year }))
          }];
          this.labels = this.data.map(res => res.education_amount);
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
        // label: 'vergelijking',
        data: this.data.map(res => ({ x: res.education_amount, y: res.crime_amount, label: res.year }))
      }];
    });
  }

  educationFilter(gender = 'Totaal mannen en vrouwen', eduTypeName = 'Totaal'): void {
    // const cet = crime_end_type !== undefined ? this.crime_end_type : 'Geregistreerde misdrijven';
    // const ct = crime_type !== undefined ? this.crime_type : 'totaal';
    this.gender = gender;
    this.education_type = eduTypeName;
    console.log(gender);
    console.log(eduTypeName);
    this.mainService.getEducation(gender, eduTypeName).subscribe((education: [any]) => {
      console.log(education);
      education.forEach(el => {

        this.data.forEach(e => {
          if (e.year === el.year) {
            console.log(el.amount);
            e.education_amount = el.amount;
          }
        });
      });
      // console.log(this.data);
      this.datasets = [{
        // label: 'vergelijking',
        data: this.data.map(res => ({ x: res.education_amount, y: res.crime_amount, label: res.year }))
      }];
      this.chart.chart.config.data.labels = this.data.map(res => res.education_amount);
    });
  }

}

