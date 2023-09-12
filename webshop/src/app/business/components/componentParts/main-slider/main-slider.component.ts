import { Component } from '@angular/core';


@Component({
  selector: 'app-main-slider',
  templateUrl: './main-slider.component.html',
  styleUrls: ['./main-slider.component.scss']
})
export class MainSliderComponent {
   products: { name: string; image: string; price: number; inventoryStatus : number}[] = [
    {
        name: "Fejsze",
        image: "https://p1.akcdn.net/full/382975373.juco-kanadai-fejsze-1800g-14165.jpg",
        price: 1400,
        inventoryStatus: 10
    },
    {
      name: "Kasza",
      image: "url",
      price: 2000,
      inventoryStatus: 20
    }
]




    responsiveOptions = [
        {
            breakpoint: '1199px',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '991px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 1,
            numScroll: 1
        }
    ];
}



