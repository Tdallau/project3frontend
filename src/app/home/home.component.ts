import { Component, OnInit, AfterViewInit, EventEmitter} from '@angular/core';
import { CommonService } from '../_services/common.service';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  makeChart = new EventEmitter<any>();

  private crime = {
    data : [],
    label : 'crime',
    color : 'rgba(255, 99, 132, 0.2)',
    horizontalLabel : []
  };
  private work = {
    data : [],
    label : 'work(x10)',
    color : 'rgba(54, 162, 235, 0.2)',
    horizontalLabel : []
  };
  private education = {
    data : [],
    label : 'education(x10)',
    color : 'rgba(255, 206, 86, 0.2)',
    horizontalLabel : []
  };

  private datasets = [
    {
      data : this.crime.data,
      label : this.crime.label,
      backgroundColor : this.crime.color,
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
    },
    {
      data : this.work.data,
      label : this.work.label,
      backgroundColor : this.work.color,
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    },
    {
      data : this.education.data,
      label : this.education.label,
      backgroundColor : this.education.color,
      borderColor: 'rgba(255, 206, 86, 1)',
      borderWidth: 1
    }
  ];

  public chart = [];
  public devide = 1;

  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.makeChart.subscribe(data => {
      const labels = this.commonService.merge_array(this.education.horizontalLabel, this.work.horizontalLabel);
      this.chart = new Chart('canvas', {
        type: 'line',
        data : {
          labels : labels,
          datasets : this.datasets
        },
        options: {
          scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
        }
      });
    });
    this.getCrime();
    this.getWork();
    this.getEducation();
  }

  private createChart() {
    this.makeChart.emit();
  }

  public getCrime(filter = 'Geregistreerde misdrijven') {
    // console.log(filter);
    this.commonService.getCrime(filter).subscribe((data: [any]) => {
      this.crime.data = data.map(res => res.amount);
      // this.crime.data.unshift(null, null, null, null);
      this.crime.horizontalLabel = data.map(res => res.year);

      const newLabel = 'Crime' + ' (' + filter + ')';

      this.updateDataSets(this.crime.label, this.crime.data, this.crime.horizontalLabel, newLabel);
      this.crime.label = newLabel;
      this.createChart();
    });
  }

  public getWork(filter = 'Banen') {
    this.commonService.getWork(filter).subscribe((data: [any]) => {
      this.work.data = data.map(res => res.amount / this.devide);
      // this.work.data.unshift(null, null, null, null, null);
      this.work.horizontalLabel = data.map(res => res.year);

      const newLabel = 'Work (x' + this.devide + ')' + ' (' + filter + ')';

      this.updateDataSets(this.work.label, this.work.data, this.work.horizontalLabel, newLabel);
      this.work.label = newLabel;
      this.createChart();
    });
  }

  public getEducation(filter = 'Totaal mannen en vrouwen') {
    this.commonService.getEducation(filter).subscribe((data: [any]) => {
      this.education.data = data.map(res => res.amount / this.devide);
      this.education.horizontalLabel = data.map(res => res.year);

      const newLabel = 'Education (x' + this.devide + ')' + ' (' + filter + ')';

      this.updateDataSets(this.education.label, this.education.data, this.education.horizontalLabel, newLabel );
      this.education.label = newLabel;
      this.createChart();
    });
  }

  public updateDataSets (label, data, horizontalLabel, newLabel) {
    this.datasets.forEach((element, key) => {
      if (element.label === label) {

        this.datasets[key].data = data;
        this.datasets[key].label = newLabel;
      }
    });
  }

  public updateDevide() {
    if (this.devide === 10) {
      this.devide = 1;
    } else {
      this.devide = 10;
    }
    this.getEducation();
    this.getWork();
  }

}
