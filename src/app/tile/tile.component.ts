import { Component, Input, ViewChild, ElementRef, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherDataService } from '../weather-data.service';
import { NgApexchartsModule } from "ng-apexcharts";
import ApexCharts from 'apexcharts';

@Component({
  selector: 'tile',
  standalone: true,
  imports: [
    CommonModule,
    NgApexchartsModule
  ],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.css'
})
export class TileComponent implements AfterViewInit {
  @Input() tileClass!: string;
  @ViewChild('tileText') tileText!: ElementRef;
  @ViewChild('tileContent') tileContent!: ElementRef;
  @ViewChild('tileContentIcon') tileContentIcon!: ElementRef;
  @ViewChild('tileContentValue') tileContentValue!: ElementRef;
  @ViewChild('pieChart') pieChart!: ElementRef;

  weatherDataService: WeatherDataService = inject(WeatherDataService);

  constructor() {
  }

  ngAfterViewInit() {
    switch (this.tileClass){
      case 'tileTemperature': {
        this.tileContentIcon.nativeElement.innerHTML = '<svg fill="#ffffff" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>temperature-half</title> <path d="M20.75 6.008c0-6.246-9.501-6.248-9.5 0v13.238c-1.235 1.224-2 2.921-2 4.796 0 3.728 3.022 6.75 6.75 6.75s6.75-3.022 6.75-6.75c0-1.875-0.765-3.572-2-4.796l-0.001-0zM16 29.25c-2.9-0-5.25-2.351-5.25-5.251 0-1.553 0.674-2.948 1.745-3.909l0.005-0.004 0.006-0.012c0.13-0.122 0.215-0.29 0.231-0.477l0-0.003c0.001-0.014 0.007-0.024 0.008-0.038l0.006-0.029v-13.52c-0.003-0.053-0.005-0.115-0.005-0.178 0-1.704 1.381-3.085 3.085-3.085 0.060 0 0.12 0.002 0.179 0.005l-0.008-0c0.051-0.003 0.11-0.005 0.17-0.005 1.704 0 3.085 1.381 3.085 3.085 0 0.063-0.002 0.125-0.006 0.186l0-0.008v13.52l0.006 0.029 0.007 0.036c0.015 0.191 0.101 0.36 0.231 0.482l0 0 0.006 0.012c1.076 0.966 1.75 2.361 1.75 3.913 0 2.9-2.35 5.25-5.25 5.251h-0zM16.75 21.367v-7.866c0-0.414-0.336-0.75-0.75-0.75s-0.75 0.336-0.75 0.75v0 7.866c-1.164 0.338-2 1.394-2 2.646 0 1.519 1.231 2.75 2.75 2.75s2.75-1.231 2.75-2.75c0-1.252-0.836-2.308-1.981-2.641l-0.019-0.005zM26.5 2.25c-1.795 0-3.25 1.455-3.25 3.25s1.455 3.25 3.25 3.25c1.795 0 3.25-1.455 3.25-3.25v0c-0.002-1.794-1.456-3.248-3.25-3.25h-0zM26.5 7.25c-0.966 0-1.75-0.784-1.75-1.75s0.784-1.75 1.75-1.75c0.966 0 1.75 0.784 1.75 1.75v0c-0.001 0.966-0.784 1.749-1.75 1.75h-0z"></path> </g></svg>';
        this.tileContentValue.nativeElement.innerHTML = this.weatherDataService.getNewestRecord()[3] + '°C';
        this.tileText.nativeElement.innerHTML = 'Temperature'; 
        break; 
      }
      case 'tileHumidity': {
        this.renderPieChart();
        this.tileText.nativeElement.innerHTML = 'Humidity';
        break; 
      }
      case 'tilePressure': { 
        this.tileContentIcon.nativeElement.innerHTML = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.6933 17.3294C21.0506 15.9959 21.0964 14.5982 20.8271 13.2442C20.5577 11.8902 19.9806 10.6164 19.1402 9.52115C18.2998 8.42593 17.2187 7.53872 15.9806 6.92815C14.7425 6.31757 13.3805 6 12 6C10.6195 6 9.25752 6.31757 8.0194 6.92815C6.78128 7.53872 5.70021 8.42593 4.85982 9.52115C4.01943 10.6164 3.44225 11.8902 3.17293 13.2442C2.90361 14.5982 2.94937 15.9959 3.30667 17.3294" stroke="#ffffff" stroke-linecap="round"></path> <path d="M12.7657 15.5823C13.2532 16.2916 12.9104 17.3738 12 17.9994C11.0897 18.625 9.95652 18.5571 9.46906 17.8477C8.94955 17.0917 7.15616 12.8409 6.06713 10.2114C5.86203 9.71621 6.4677 9.3 6.85648 9.669C8.92077 11.6283 12.2462 14.8263 12.7657 15.5823Z" stroke="#ffffff"></path> <path d="M12 6V8" stroke="#ffffff" stroke-linecap="round"></path> <path d="M5.63599 8.63574L7.0502 10.05" stroke="#ffffff" stroke-linecap="round"></path> <path d="M18.364 8.63574L16.9498 10.05" stroke="#ffffff" stroke-linecap="round"></path> <path d="M20.6934 17.3291L18.7615 16.8115" stroke="#ffffff" stroke-linecap="round"></path> <path d="M3.30664 17.3291L5.23849 16.8115" stroke="#ffffff" stroke-linecap="round"></path> </g></svg>';
        this.tileContentValue.nativeElement.innerHTML = this.weatherDataService.getNewestRecord()[5] + ' hPa';
        this.tileText.nativeElement.innerHTML = 'Pressure'; 
        break; 
      }
      case 'tileRain': {
        this.tileContentIcon.nativeElement.innerHTML = '<svg fill="#ffffff" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>cloud-downpour</title> <path d="M29.135 10.075c-0.865-1.165-2.159-1.968-3.645-2.174l-0.029-0.003c0.145-0.342 0.229-0.74 0.229-1.157 0-0.045-0.001-0.090-0.003-0.135l0 0.006c-0.060-0.894-0.451-1.687-1.050-2.267l-0.001-0.001c-0.813-0.817-1.939-1.323-3.183-1.323-0.889 0-1.718 0.258-2.415 0.704l0.018-0.011c-2.52-3.159-7.256-3.053-10.657-0.989-2.056 0.998-3.449 3.071-3.449 5.469 0 0.643 0.1 1.263 0.286 1.845l-0.012-0.043c-2.332 0.765-3.986 2.923-3.986 5.466 0 0.125 0.004 0.248 0.012 0.371l-0.001-0.017c-0.001 0.039-0.002 0.086-0.002 0.132 0 1.261 0.403 2.428 1.088 3.378l-0.012-0.017c0.764 1.004 1.959 1.646 3.305 1.646 0.043 0 0.086-0.001 0.129-0.002l-0.006 0 20.28-0.008c1.932-0.227 3.52-1.496 4.201-3.223l0.012-0.035c0.316-0.828 0.499-1.786 0.499-2.787 0-1.82-0.605-3.499-1.624-4.846l0.015 0.020zM28.857 17.12c-0.471 1.245-1.574 2.151-2.907 2.331l-0.019 0.002h-20.179c-0.034 0.002-0.074 0.002-0.115 0.002-0.863 0-1.629-0.411-2.114-1.049l-0.005-0.007c-0.483-0.684-0.772-1.535-0.772-2.453 0-0.046 0.001-0.093 0.002-0.139l-0 0.007c-0.015-0.13-0.023-0.28-0.023-0.432 0-2.089 1.587-3.807 3.62-4.016l0.017-0.001c0.414-0 0.75-0.336 0.75-0.75 0-0.144-0.040-0.278-0.11-0.392l0.002 0.003c-1.604-2.643 0.070-4.946 2.172-6.221 1.248-0.775 2.757-1.242 4.374-1.265l0.006-0c0.075-0.004 0.163-0.006 0.251-0.006 1.866 0 3.505 0.971 4.44 2.435l0.013 0.021c0.134 0.218 0.371 0.361 0.641 0.361 0.206 0 0.392-0.083 0.527-0.217l-0 0c0.525-0.515 1.246-0.833 2.040-0.833 0.825 0 1.571 0.343 2.101 0.894l0.001 0.001c0.379 0.325 0.618 0.804 0.618 1.34 0 0.558-0.26 1.056-0.665 1.378l-0.004 0.003c-0.137 0.136-0.222 0.325-0.222 0.533 0 0.414 0.336 0.75 0.75 0.75 0.036 0 0.071-0.002 0.105-0.007l-0.004 0c0.177-0.028 0.381-0.044 0.589-0.044 1.316 0 2.482 0.642 3.202 1.63l0.008 0.011c0.808 1.078 1.293 2.438 1.293 3.911 0 0.794-0.141 1.556-0.4 2.26l0.015-0.046zM6.237 23.289c-0.072-0.026-0.155-0.041-0.242-0.041-0.329 0-0.608 0.214-0.705 0.51l-0.002 0.005-2 6c-0.024 0.071-0.038 0.152-0.038 0.236 0 0.329 0.212 0.609 0.508 0.709l0.005 0.002c0.070 0.025 0.151 0.039 0.235 0.039 0.001 0 0.002 0 0.003 0h-0c0.33-0 0.609-0.213 0.71-0.508l0.002-0.005 2-6c0.024-0.071 0.038-0.152 0.038-0.236 0-0.329-0.212-0.609-0.508-0.709l-0.005-0.002zM10.237 23.289c-0.072-0.026-0.156-0.041-0.242-0.041-0.329 0-0.608 0.214-0.705 0.51l-0.002 0.005-2 6c-0.024 0.071-0.038 0.152-0.038 0.236 0 0.329 0.212 0.609 0.508 0.709l0.005 0.002c0.070 0.025 0.151 0.039 0.235 0.039 0.001 0 0.002 0 0.003 0h-0c0.33-0 0.609-0.213 0.71-0.508l0.002-0.005 2-6c0.024-0.071 0.038-0.152 0.038-0.236 0-0.329-0.212-0.609-0.508-0.709l-0.005-0.002zM14.237 23.289c-0.072-0.026-0.155-0.041-0.242-0.041-0.329 0-0.608 0.214-0.706 0.51l-0.002 0.005-2 6c-0.024 0.071-0.038 0.152-0.038 0.236 0 0.329 0.212 0.609 0.508 0.709l0.005 0.002c0.070 0.025 0.151 0.039 0.235 0.039 0.001 0 0.002 0 0.003 0h-0c0.33-0 0.609-0.213 0.71-0.508l0.002-0.005 2-6c0.024-0.071 0.038-0.152 0.038-0.236 0-0.329-0.212-0.609-0.508-0.709l-0.005-0.002zM18.236 23.289c-0.072-0.025-0.155-0.040-0.241-0.040-0.329 0-0.608 0.213-0.706 0.509l-0.002 0.005-2 6c-0.024 0.071-0.038 0.152-0.038 0.236 0 0.329 0.212 0.609 0.508 0.709l0.005 0.002c0.070 0.025 0.151 0.039 0.235 0.039 0.001 0 0.002 0 0.003 0h-0c0.33-0 0.609-0.213 0.71-0.508l0.002-0.005 1.999-6c0.024-0.071 0.039-0.152 0.039-0.237 0-0.329-0.213-0.609-0.508-0.708l-0.005-0.002zM22.236 23.289c-0.072-0.026-0.155-0.040-0.241-0.040-0.329 0-0.607 0.214-0.704 0.51l-0.002 0.005-2 6c-0.025 0.071-0.039 0.152-0.039 0.237 0 0.329 0.213 0.608 0.508 0.708l0.005 0.002c0.069 0.025 0.149 0.039 0.233 0.039 0.001 0 0.002 0 0.004 0h-0c0 0 0 0 0 0 0.329 0 0.609-0.213 0.709-0.508l0.002-0.005 2-6c0.025-0.071 0.039-0.152 0.039-0.237 0-0.329-0.213-0.608-0.508-0.708l-0.005-0.002zM26.236 23.289c-0.072-0.026-0.155-0.041-0.242-0.041-0.328 0-0.607 0.214-0.704 0.51l-0.001 0.005-2 6c-0.025 0.071-0.039 0.152-0.039 0.237 0 0.329 0.213 0.608 0.508 0.708l0.005 0.002c0.069 0.025 0.149 0.039 0.233 0.039 0.001 0 0.002 0 0.004 0h-0c0 0 0 0 0 0 0.329 0 0.609-0.213 0.709-0.508l0.002-0.005 2-6c0.025-0.071 0.039-0.152 0.039-0.237 0-0.329-0.213-0.608-0.508-0.708l-0.005-0.002z"></path> </g></svg>';
        this.tileContentValue.nativeElement.innerHTML = this.weatherDataService.getNewestRecord()[6] + ' mm';
        this.tileText.nativeElement.innerHTML = 'Rain'; 
        break; 
      }
      case 'tileWindSpeed': { 
        this.tileContentIcon.nativeElement.innerHTML = '<svg fill="#ffffff" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>wind</title> <path d="M13 10.761c0.041-0.005 0.077-0.013 0.112-0.023l-0.005 0.001c2.573-0.062 4.634-2.162 4.634-4.744 0-2.621-2.124-4.745-4.745-4.745-2.176 0-4.011 1.465-4.57 3.463l-0.008 0.033-0.009 0.018c-0.105 0.372-0.165 0.8-0.165 1.241v0c0 0.414 0.336 0.75 0.75 0.75s0.75-0.336 0.75-0.75v0c0.001-0.299 0.041-0.588 0.116-0.863l-0.005 0.023 0.007-0.015c0.386-1.395 1.644-2.402 3.138-2.402 1.795 0 3.25 1.455 3.25 3.25s-1.455 3.25-3.25 3.25v0c-0.019 0-0.034 0.009-0.053 0.011l-10.932-0.011c-0 0-0 0-0 0-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.749 0.75l10.985 0.011zM24.469 5.369c-2.875 0.003-5.298 1.936-6.045 4.572l-0.011 0.044-0.015 0.030c-0.138 0.49-0.217 1.053-0.217 1.634 0 0.003 0 0.005 0 0.008v-0c0 0.414 0.336 0.75 0.75 0.75s0.75-0.336 0.75-0.75v0c0-0.002 0-0.004 0-0.006 0-0.44 0.060-0.866 0.173-1.269l-0.008 0.033 0.007-0.014c0.568-2.052 2.419-3.533 4.615-3.533 2.641 0 4.781 2.141 4.781 4.781s-2.141 4.781-4.781 4.781c-0 0-0 0-0 0v0c-0.029 0.004-0.053 0.009-0.077 0.016l0.005-0.001-20.34-0.020c-0 0-0 0-0 0-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.749 0.75l20.413 0.021c0.054-0.005 0.103-0.016 0.151-0.031l-0.005 0.001c3.405-0.077 6.136-2.856 6.136-6.273 0-3.465-2.809-6.274-6.274-6.274-0.003 0-0.006 0-0.008 0h0zM22.718 19.809c-0.033-0.010-0.072-0.018-0.113-0.023l-0.003-0-18.546 0.018c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75c0 0 0 0 0.001 0l18.487-0.018c0.020 0.002 0.037 0.012 0.058 0.012 0 0 0 0 0 0 2.178 0 3.943 1.765 3.943 3.943s-1.765 3.943-3.943 3.943c-1.812 0-3.338-1.222-3.8-2.886l-0.007-0.028-0.007-0.015c-0.085-0.306-0.135-0.657-0.135-1.020v-0c0-0.001 0-0.003 0-0.004 0-0.414-0.336-0.75-0.75-0.75s-0.75 0.336-0.75 0.75c0 0.001 0 0.003 0 0.004v-0c0 0.003 0 0.006 0 0.010 0 0.502 0.068 0.989 0.197 1.45l-0.009-0.038 0.010 0.014c0.647 2.335 2.753 4.020 5.253 4.020 3.005 0 5.442-2.436 5.442-5.442 0-2.965-2.372-5.376-5.321-5.44l-0.006-0z"></path> </g></svg>';
        this.tileContentValue.nativeElement.innerHTML = this.weatherDataService.getNewestRecord()[7] + ' m/s';
        this.tileText.nativeElement.innerHTML = 'Wind Speed'; 
        break; 
      }
      case 'tileWindDirection': { 
        this.tileContentIcon.nativeElement.innerHTML = '<svg fill="#ffffff" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>compass</title> <path d="M16 1.25c-8.146 0-14.75 6.604-14.75 14.75s6.604 14.75 14.75 14.75c8.146 0 14.75-6.604 14.75-14.75v0c-0.010-8.142-6.608-14.74-14.749-14.75h-0.001zM16 29.25c-7.318 0-13.25-5.932-13.25-13.25s5.932-13.25 13.25-13.25c7.318 0 13.25 5.932 13.25 13.25v0c-0.008 7.314-5.936 13.242-13.249 13.25h-0.001zM22.803 8.276l-11 3c-0.256 0.072-0.454 0.27-0.525 0.521l-0.001 0.005-3 11c-0.017 0.059-0.027 0.128-0.027 0.198 0 0.414 0.335 0.749 0.749 0.749 0 0 0.001 0 0.001 0h-0c0.002 0 0.003 0 0.005 0 0.068 0 0.134-0.010 0.197-0.029l-0.005 0.001 11-3c0.257-0.071 0.455-0.269 0.524-0.52l0.001-0.005 3-11c0.017-0.060 0.027-0.128 0.027-0.199 0-0.206-0.083-0.393-0.218-0.528v0c-0.138-0.135-0.327-0.218-0.535-0.218-0.069 0-0.135 0.009-0.199 0.026l0.005-0.001zM19.389 19.389l-9.319 2.543 2.541-9.321 9.321-2.541zM15.62 16.92c0.112 0.051 0.242 0.080 0.38 0.080s0.268-0.029 0.386-0.082l-0.006 0.002c0.241-0.11 0.43-0.299 0.537-0.533l0.003-0.007c0.051-0.112 0.080-0.242 0.080-0.38s-0.029-0.268-0.082-0.386l0.002 0.006c-0.044-0.129-0.121-0.237-0.22-0.319l-0.001-0.001c-0.178-0.182-0.427-0.296-0.701-0.296-0.136 0-0.266 0.028-0.384 0.078l0.006-0.002c-0.242 0.109-0.431 0.298-0.537 0.533l-0.003 0.007c-0.051 0.102-0.081 0.223-0.081 0.35 0 0.010 0 0.021 0.001 0.031l-0-0.002c-0 0.004-0 0.008-0 0.013 0 0.271 0.115 0.515 0.299 0.686l0.001 0.001c0.083 0.1 0.191 0.176 0.315 0.219l0.005 0.002z"></path> </g></svg>';
        this.tileContentValue.nativeElement.innerHTML = this.weatherDataService.getNewestRecord()[8];
        this.tileText.nativeElement.innerHTML = 'Wind Direction'; 
        break; 
      }
      case 'tileLight': { 
        this.tileContentIcon.nativeElement.innerHTML = '<svg fill="#ffffff" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>brightness-keyboard</title> <path d="M16 16.223c0.414-0 0.75-0.336 0.75-0.75v0-6.473c0-0.414-0.336-0.75-0.75-0.75s-0.75 0.336-0.75 0.75v0 6.473c0 0.414 0.336 0.75 0.75 0.75v0zM7 22.25h-5c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0h5c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0zM30 22.25h-5c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0h5c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0zM10.428 17.47l-4.576-4.577c-0.136-0.141-0.327-0.228-0.538-0.228-0.414 0-0.75 0.336-0.75 0.75 0 0.211 0.087 0.402 0.228 0.538l4.576 4.578c0.136 0.135 0.322 0.218 0.528 0.218 0.414 0 0.75-0.336 0.75-0.75 0-0.206-0.083-0.393-0.218-0.529l0 0zM27.211 12.893c-0.136-0.136-0.324-0.22-0.531-0.22s-0.395 0.084-0.531 0.22v0l-4.578 4.577c-0.136 0.136-0.22 0.324-0.22 0.531 0 0.415 0.336 0.751 0.751 0.751 0.207 0 0.395-0.084 0.531-0.22v0l4.578-4.578c0.135-0.136 0.219-0.323 0.219-0.53s-0.084-0.394-0.219-0.53l0 0zM21 22.25h-10c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0h10c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0z"></path> </g></svg>';
        this.tileContentValue.nativeElement.innerHTML = this.weatherDataService.getNewestRecord()[9] + ' lx';
        this.tileText.nativeElement.innerHTML = 'Light'; 
        break; 
      }
      case 'tilePm10': {
        this.tileContentIcon.nativeElement.innerHTML = '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M23.7059 11.0442C23.8975 10.9853 24.1025 10.9853 24.2941 11.0442L37.2941 15.0442C37.7137 15.1733 38 15.561 38 16V17H39C41.7614 17 44 19.2386 44 22V26C44 28.7614 41.7614 31 39 31H36.5436C35.4212 32.7244 33.7136 34.0575 31.6468 34.6934L24.2941 36.9558C24.1025 37.0147 23.8975 37.0147 23.7059 36.9558L16.3532 34.6934C14.2864 34.0575 12.5788 32.7244 11.4564 31H9C6.23858 31 4 28.7614 4 26V22C4 19.2386 6.23858 17 9 17H10V16C10 15.561 10.2863 15.1733 10.7059 15.0442L23.7059 11.0442ZM10 19H9C7.34315 19 6 20.3431 6 22V26C6 27.6569 7.34315 29 9 29H10.4823C10.1684 28.0814 10 27.1015 10 26.0914V19ZM38 26.0914V19H39C40.6569 19 42 20.3431 42 22V26C42 27.6569 40.6569 29 39 29H37.5177C37.8316 28.0814 38 27.1015 38 26.0914ZM12 16.7386V26.0914C12 29.1644 14.0043 31.8781 16.9414 32.7819L24 34.9537L31.0586 32.7819C33.9957 31.8781 36 29.1644 36 26.0914V16.7386L24 13.0463L12 16.7386ZM18 21V19H30V21H18ZM18 27H30V25H18V27Z" fill="#ffffff"></path> </g></svg>';
        this.tileContentValue.nativeElement.innerHTML = this.weatherDataService.getNewestRecord()[10] + ' μm';
        this.tileText.nativeElement.innerHTML = 'PM 10'; 
        break; 
      }
      case 'tilePm25': {
        // this.tileContent.nativeElement.innerHTML = this.weatherDataService.getNewestRecord()[11];
        this.tileContentIcon.nativeElement.innerHTML = '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M23.7059 11.0442C23.8975 10.9853 24.1025 10.9853 24.2941 11.0442L37.2941 15.0442C37.7137 15.1733 38 15.561 38 16V17H39C41.7614 17 44 19.2386 44 22V26C44 28.7614 41.7614 31 39 31H36.5436C35.4212 32.7244 33.7136 34.0575 31.6468 34.6934L24.2941 36.9558C24.1025 37.0147 23.8975 37.0147 23.7059 36.9558L16.3532 34.6934C14.2864 34.0575 12.5788 32.7244 11.4564 31H9C6.23858 31 4 28.7614 4 26V22C4 19.2386 6.23858 17 9 17H10V16C10 15.561 10.2863 15.1733 10.7059 15.0442L23.7059 11.0442ZM10 19H9C7.34315 19 6 20.3431 6 22V26C6 27.6569 7.34315 29 9 29H10.4823C10.1684 28.0814 10 27.1015 10 26.0914V19ZM38 26.0914V19H39C40.6569 19 42 20.3431 42 22V26C42 27.6569 40.6569 29 39 29H37.5177C37.8316 28.0814 38 27.1015 38 26.0914ZM12 16.7386V26.0914C12 29.1644 14.0043 31.8781 16.9414 32.7819L24 34.9537L31.0586 32.7819C33.9957 31.8781 36 29.1644 36 26.0914V16.7386L24 13.0463L12 16.7386ZM18 21V19H30V21H18ZM18 27H30V25H18V27Z" fill="#ffffff"></path> </g></svg>';
        this.tileContentValue.nativeElement.innerHTML = this.weatherDataService.getNewestRecord()[11] + ' μm';
        this.tileText.nativeElement.innerHTML = 'PM 2.5'; 
        break; 
      }
      case 'tileHighestValue': {
        this.tileContentIcon.nativeElement.innerHTML = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 4V20M12 4L18 10M12 4L6 10" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>';
        this.tileText.nativeElement.innerHTML = 'Highest'; 
        break; 
      }
      case 'tileLowestValue': {
        this.tileContentIcon.nativeElement.innerHTML = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 20L12 4M12 20L6 14M12 20L18 14" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>';
        this.tileText.nativeElement.innerHTML = 'Lowest'; 
        break; 
      }
      case 'tileAverage': {
        this.tileContentIcon.nativeElement.innerHTML = '<svg fill="#ffffff" viewBox="0 0 32 32" id="icon" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <defs> <style> .cls-1 { fill: none; } </style> </defs> <path d="M23,24c-3.5991,0-5.0293-4.1758-6.4126-8.2139C15.2764,11.9583,13.92,8,11,8a3.44,3.44,0,0,0-3.0532,2.3215L6.0513,9.6838C6.1016,9.5334,7.3218,6,11,6c4.3491,0,6.0122,4.8547,7.48,9.1379C19.6885,18.6667,20.83,22,23,22a3.44,3.44,0,0,0,3.0532-2.3215l1.8955.6377C27.8984,20.4666,26.6782,24,23,24Z"></path> <path d="M4,28V17H6V15H4V2H2V28a2,2,0,0,0,2,2H30V28Z"></path> <rect x="8" y="15" width="2" height="2"></rect> <rect x="12" y="15" width="2" height="2"></rect> <rect x="20" y="15" width="2" height="2"></rect> <rect x="24" y="15" width="2" height="2"></rect> <rect x="28" y="15" width="2" height="2"></rect> <rect id="_Transparent_Rectangle_" data-name="<Transparent Rectangle>" class="cls-1" width="32" height="32"></rect> </g></svg>';
        this.tileText.nativeElement.innerHTML = 'Average'; 
        break; 
      }
      case 'tileMedian': {
        this.tileContentIcon.nativeElement.innerHTML = '<svg fill="#ffffff" viewBox="0 0 32 32" id="icon" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <defs> <style> .cls-1 { fill: none; } </style> </defs> <rect x="16" y="22" width="2" height="2" transform="translate(-6 40) rotate(-90)"></rect> <path d="M18,28V26H16v2H4V2H2V28a2,2,0,0,0,2,2H30V28Z"></path> <path d="M26.0532,19.6787A3.44,3.44,0,0,1,23,22c-2.17,0-3.3115-3.333-4.52-6.8623-.3557-1.0386-.7239-2.1094-1.1382-3.1377H18V10H16.4221C15.2124,7.7148,13.5811,6,11,6,7.3218,6,6.1016,9.5332,6.0513,9.6836l1.8955.6377A3.44,3.44,0,0,1,11,8c2.92,0,4.2764,3.958,5.5874,7.7861.2544.7422.5105,1.4893.7813,2.2139H16v2h2.2019c1.0828,2.2886,2.4959,4,4.7981,4,3.6782,0,4.8984-3.5332,4.9487-3.6836Z"></path> <rect x="16" y="6" width="2" height="2" transform="translate(10 24) rotate(-90)"></rect> <rect x="16" y="2" width="2" height="2" transform="translate(14 20) rotate(-90)"></rect> <rect id="_Transparent_Rectangle_" data-name="<Transparent Rectangle>" class="cls-1" width="32" height="32"></rect> </g></svg>';
        this.tileText.nativeElement.innerHTML = 'Median'; 
        break; 
      }
      default: {
        this.tileContent.nativeElement.innerHTML = 'Unknown';
        this.tileText.nativeElement.innerHTML = 'Unknown'; 
        break; 
      } 
    }
  }

  // Chart for the humidity tile
  renderPieChart() {
    const chartOptions = {
      series: [+this.weatherDataService.getNewestRecord()[4], (100 - (+this.weatherDataService.getNewestRecord()[4]))],
      chart: {
        type: 'pie'
      },
      labels: ['Humidity', ''],
      dataLabels: {
        enabled: true,
        formatter: function(val: string, opts: { seriesIndex: number; }) {
          if (opts.seriesIndex === 0) {
            // Show percentage only for the humidity segment
            return val + '%';
          } else {
            // Hide label for the remaining segment
            return '';
          }
        },
        style: {
          fontSize: '16px'
        },
      },
      legend: {
        show: false // Hide the legend
      },
      colors: ['#c23124', 'rgba(0, 0, 0, 0)'],
      tooltip: {
        enabled: false
      },
      plotOptions: {
        pie: {
          dataLabels: {
            offset: -30,
          },
          expandOnClick: false
        }
      },
      stroke: {
        // Outline
        colors: ['#e2e8f0'],
        width: 1
      },
      states: {
        active: {
          filter: {
            type: 'none'
          }
        },
        hover: {
          filter: {
              type: 'none'
          }
      },
      },
      responsive: [
        {
          breakpoint: 1024,
          options: {
            plotOptions: {
              pie: {
                dataLabels: {
                  offset: -15,
                },
                expandOnClick: false
              }
            },
            dataLabels: {
              style: {
                fontSize: '12px'
              }
            },
          }
        },
      ]
    };

    const chart = new ApexCharts(this.pieChart.nativeElement, chartOptions);
    chart.render();
  }
  
}
