import { Component, Input, ViewChild, ElementRef, AfterViewInit, ViewRef } from '@angular/core';

@Component({
  selector: 'tile',
  standalone: true,
  imports: [],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.css'
})
// export class TileComponent {
//   @ViewChild('myElement', {static: false}) myElementRef!: ElementRef;

//   ngAfterViewInit() {
//     const innerHTML = this.myElementRef.nativeElement.innerHTML;
//     console.log(innerHTML);
//   }

//   constructor() {
//   }
// }

export class TileComponent implements AfterViewInit {
  @Input() tileClass!: string;
  @ViewChild('tileText') tileText!: ElementRef;

  constructor() { }

  ngAfterViewInit() {
    console.log('Tile class:', this.tileClass);
    if (this.tileText) {
      const paragraphClass = this.tileText.nativeElement.innerHTML;
      console.log('Paragraph class:', paragraphClass);
    } else {
      console.error('Tile text element not found.');
    }

    switch (this.tileClass){
      case 'tileTemperature': { 
        this.tileText.nativeElement.innerHTML = 'Temperature'; 
        break; 
      }
      case 'tileHumidity': { 
        this.tileText.nativeElement.innerHTML = 'Humidity'; 
        break; 
      }
      case 'tilePressure': { 
        this.tileText.nativeElement.innerHTML = 'Pressure'; 
        break; 
      }
      case 'tileRain': { 
        this.tileText.nativeElement.innerHTML = 'Rain'; 
        break; 
      }
      case 'tileWindSpeed': { 
        this.tileText.nativeElement.innerHTML = 'Wind Speed'; 
        break; 
      }
      case 'tileWindDirection': { 
        this.tileText.nativeElement.innerHTML = 'Wind Direction'; 
        break; 
      }
      case 'tileLight': { 
        this.tileText.nativeElement.innerHTML = 'Light'; 
        break; 
      }
      case 'tilePm10': { 
        this.tileText.nativeElement.innerHTML = 'PM 10'; 
        break; 
      }
      case 'tilePm25': { 
        this.tileText.nativeElement.innerHTML = 'PM 25'; 
        break; 
      }
      default: { 
        this.tileText.nativeElement.innerHTML = 'Unknown'; 
        break; 
      } 
    }

  }
  
}
