import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clintele',
  templateUrl: './clintele.component.html',
  styleUrls: ['./clintele.component.css']
})
export class ClinteleComponent implements OnInit {

  title = 'owlcarouselinAngular';
  Images = ['../assets/images/partner-1.jpg', '../assets/images/partner-1.jpg', '../assets/images/partner-1.jpg'];

  constructor() { }

  ngOnInit() {
  }

}
