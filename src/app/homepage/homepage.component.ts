import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(
    private _CommonService: CommonService
  ) { }

  ngOnInit() {
  }

  onSubmit(type, formData) {
    console.log(type, formData)
    this._CommonService.post(`event/${type}`, formData).subscribe(res => {
      console.log(res)
    })
  }

}
