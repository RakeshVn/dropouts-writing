import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
declare const $: any
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  counto = 0
  counters = {
    a: 5,
    b: 15000,
    c: 4800000
  }

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

  onService() {
    $(".collapse.show").collapse('hide')
  }

}
