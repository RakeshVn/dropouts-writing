import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clintele',
  templateUrl: './clintele.component.html',
  styleUrls: ['./clintele.component.css']
})
export class ClinteleComponent implements OnInit {

  slides = ['partner-1.png', 'partner-2.png', 'partner-3.png', 'partner-4.png', 'partner-5.png'];
  slideConfig = {
    autoplay: false,
    autoplaySpeed: 2000,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: `<div class='nav-btn next-slide'></div>`,
    prevArrow: `<div class='nav-btn prev-slide'></div>`,
    dots: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  constructor() { }

  ngOnInit() {
  }

}
