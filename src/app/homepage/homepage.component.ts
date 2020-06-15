import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonService } from '../services/common.service';
import { ActivatedRoute } from '@angular/router';
declare const $: any
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

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
  cwServices = {
    a: false,
    b: false,
    c: false,
    d: false,
    e: false,
    f: false,
    g: false,
    h: false
  }
  @ViewChild('service3', { static: false }) services3: ElementRef
  @ViewChild('clintele', { static: false }) clintele: ElementRef

  constructor(
    private _CommonService: CommonService,
    private _ActivatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this._ActivatedRoute.queryParams.subscribe(params => {
      if (params.scr && params.scr == 'our-services') {
        this.services.c = true
        setTimeout(() => { this.services3.nativeElement.scrollIntoView({ behavior: "smooth" }) }, 200);
      }
    })

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
      service.scrollIntoView({ behavior: "smooth" });
    }, 200);

  }

  onCWService(type, service: HTMLElement) {

    for (const iterator in this.cwServices) {
      if (iterator == type) {
        this.cwServices[type] = !this.cwServices[type]
        continue
      }
      this.cwServices[iterator] = false
    }

    setTimeout(() => {
      service.scrollIntoView({ behavior: "smooth" });
    }, 200);

  }

}
