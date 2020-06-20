import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-query-details',
  templateUrl: './query-details.component.html',
  styleUrls: ['./query-details.component.css']
})
export class QueryDetailsComponent implements OnInit {

  eventsData = []
  viewImage: ''
  page = 1
  limit = 10
  totalPages = []

  constructor(
    private _CommonService: CommonService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getEvents()
  }

  getEvents() {
    this._CommonService.get('event/query', { page: this.page }).subscribe(res => {
      this.eventsData = res['data']
      let totalRecords = res['totalRecords']
      this.totalPages = Array(Math.ceil(totalRecords / this.limit)).fill(0).map((x, i) => i + 1);
    }, err => {
      console.error(err)
    })
  }


  open(content, type, modalDimension, image) {
    this.viewImage = image
    if (modalDimension === 'sm' && type === 'modal_mini') {
      this.modalService.open(content, { windowClass: 'modal-mini', size: 'sm', centered: true }).result.then((result) => { }, (reason) => { });
    } else if (modalDimension === '' && type === 'Notification') {
      this.modalService.open(content, { windowClass: 'modal-danger', centered: true }).result.then((result) => { }, (reason) => { });
    } else {
      this.modalService.open(content, { centered: true }).result.then((result) => { }, (reason) => { });
    }
  }

  onPageChange(page) {

    if (page == 'prev') {
      this.page--;
      page = this.page = this.page <= 0 ? 1 : this.page
    } else if (page == 'next') {
      this.page++;
      page = this.page = this.page >= this.totalPages.length ? this.totalPages.length : this.page
    } else {
      this.page = page
    }

    this.getEvents()

  }

  onRespond(id, status) {
    this._CommonService.put(`event/action/query/${id}`, {}, { accepted: status ? 'accepted' : 'rejected' }).subscribe(res => {
      this.getEvents()
    }, err => {
      console.error(err)
    })
  }

  onDelete(type, id) {
    this._CommonService.delete(`event/${type}/${id}`).subscribe(res => {
      this.getEvents()
    }, err => {
      console.error(err)
    })
  }

}
