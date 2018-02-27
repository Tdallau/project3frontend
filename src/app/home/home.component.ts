import { Component, OnInit } from '@angular/core';
import { CommonService } from '../_services/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private data;

  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.test()
  }

  test(): void {
    this.commonService.getData()
        .subscribe(
          data =>  this.data = data
        );
  }

}
