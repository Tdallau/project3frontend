import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { CommonService } from '../_services/common.service';

@Component({
  selector: 'app-work-education',
  templateUrl: './work-education.component.html',
  styleUrls: ['./work-education.component.css']
})
export class WorkEducationComponent implements OnInit {

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
  private gender = 'Totaal mannen en vrouwen';
  private education_type = 'Totaal';
  private education_types = [];

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
          labelString: 'Werk ->',
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
      }]
    }
  };

  ngOnInit() {
    console.log('running');
    this.mainService.getEducationType().subscribe((data: [any]) => {
      this.education_types = data;
      console.log(this.education_types);
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
          console.log(this.data.map(res => ({x : res.education_amount, y : res.crime_amount})));
          this.datasets = [{
            label: 'vergelijking',
            data: this.data.map(res => ({x : res.education_amount, y : res.work_amount}))
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
        label: 'vergelijking',
        data: this.data.map(res => ({x : res.education_amount, y : res.work_amount}))
      }];
      this.chart.chart.config.data.labels = this.data.map(res => res.education_amount);
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
        data: this.data.map(res => ({ x: res.education_amount, y: res.work_amount }))
      }];
    });
  }

}
