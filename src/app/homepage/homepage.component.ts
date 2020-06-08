import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../services/common.service';
declare const $: any
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  @ViewChild('service1', { static: false }) service1
  @ViewChild('service2', { static: false }) service2
  @ViewChild('service3', { static: false }) service3
  counters = {
    a: 5,
    b: 15000,
    c: 4800000
  }
  services = {
    a: false,
    b: false,
    c: false
  }

  constructor(
    private _CommonService: CommonService
  ) { }

  ngOnInit() {
  }

  onSubmit(type, formData) {
    this._CommonService.post(`event/${type}`, formData).subscribe(res => {
      console.log(res)
    })
  }

  onService(type, service: HTMLElement) {

    for (const iterator in this.services) {
      if (iterator == type) {
        this.services[type] = !this.services[type]
        continue
      }
      this.services[iterator] = false
    }

    setTimeout(() => {
      if (type == 'a') {
        this.service1.nativeElement.scrollIntoView({ behavior: "smooth" });
      } else if (type == 'b') {
        this.service2.nativeElement.scrollIntoView({ behavior: "smooth" });
      } else {
        this.service3.nativeElement.scrollIntoView({ behavior: "smooth" });
      }
    }, 200);

  }

}
