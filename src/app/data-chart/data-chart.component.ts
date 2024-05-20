import { Component, ViewChild, ElementRef, inject, Output, EventEmitter } from '@angular/core';
import { WeatherDataService } from '../weather-data.service'
import { ChartComponent, NgApexchartsModule } from "ng-apexcharts";

@Component({
  selector: 'data-chart',
  standalone: true,
  imports: [
    NgApexchartsModule
  ],
  templateUrl: './data-chart.component.html',
  styleUrl: './data-chart.component.css'
})
export class DataChartComponent {
  @ViewChild('chartValue') chartValue!: ElementRef;
  @ViewChild('chartType') chartType!: ElementRef;
  @ViewChild('dayPicker') dayPicker!: ElementRef;
  @ViewChild('weekPicker') weekPicker!: ElementRef;
  @ViewChild('apexChart') apexChart!: ChartComponent;

  @Output() chartDataUpdated: EventEmitter<number[]> = new EventEmitter<number[]>();

  weatherDataService: WeatherDataService = inject(WeatherDataService);

  chartOptions: any;
  selectedValue: number = 3;
  selectedType: string = 'Day';
  // Set base day/week (today)
  dateToday: Date = new Date();
  selectedDay: string = this.dateToday.getFullYear() + '-' + (this.dateToday.getMonth() + 1).toString().padStart(2, '0') + '-' + this.dateToday.getDate().toString().padStart(2, '0');
  selectedWeek: string = getWeekNumber(this.selectedDay);
  
  constructor() {
    let initialValuesArray: number[] = this.weatherDataService.getRecordsChart(this.selectedValue, this.selectedType, this.selectedDay, this.selectedWeek).map(record => record[2]);
    let initialXaxisArray = this.weatherDataService.getRecordsChart(this.selectedValue, this.selectedType, this.selectedDay, this.selectedWeek).map(record => record[1]);
    let initialMinMax: any[] = determineChartMinMax(initialValuesArray);

    this.chartOptions = {
      chart: {
        type: 'line',
        // Set the width and height as 100% of the container
        width: '100%',
        height: '100%',
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 500,
        },
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: false,
            selection: true,
            zoom: false,
            zoomin: true,
            zoomout: true,
            pan: false,
            reset: true,
            customIcons: []
          },
          autoSelected: 'zoom' 
        },
      },
      series: [
        {
          data: this.weatherDataService.getRecordsChart(this.selectedValue, this.selectedType, this.selectedDay, this.selectedWeek).map(record => record[2]),
        },
      ],
      xaxis: {
        categories: initialXaxisArray,
        labels: {
          style: {
            colors: '#ffffff',
            fontSize: '12px'
          },
          rotateAlways: true,
          formatter: function (value: string) {
            // Show label if it contains the specified string
            return filterLabelsContaining(initialXaxisArray, ":00").includes(value) ? value : '';
          }
        },
        tooltip: {
          enabled: false,
        },
      },
      yaxis: {
        min: initialMinMax[0],
        max: initialMinMax[1],
        labels: {
          style: {
            colors: '#ffffff'
          },
          formatter: function (val: number) {
            return val.toFixed(1);
          }
        },
      },
      stroke: {
        curve: 'straight',
        width: 3,
      },
      tooltip: {
        theme: 'dark',
        style: {
          fontSize: '10px'
        },
        custom: function({dataPointIndex}: {dataPointIndex: number}) {
          return `<div>Time: ${initialXaxisArray[dataPointIndex]}</div>
          <div>Value: ${initialValuesArray[dataPointIndex]}</div>`;
        }
      },
      colors: ['#c23124'],
      responsive: [
        {
          breakpoint: 680,
          options: {
            stroke: {
              curve: 'straight',
              width: 1,
            },
            xaxis: {
              labels: {
                style: {
                  colors: '#ffffff',
                  fontSize: '8px'
                },
              },
            },
          }
        },
      ]
    };
  }

  ngAfterViewInit() {
    this.dayPicker.nativeElement.value = this.selectedDay;
  }

  onSelectedValueChanged() {
    this.selectedValue = this.chartValue.nativeElement.value;
    this.updateChartData();
  }

  onSelectedTypeChanged() {
    this.selectedType = this.chartType.nativeElement.value;
    if (this.selectedType == 'Week') {
      // Show weekPicker, hide dayPicker
      document.querySelector(".dayPicker")?.setAttribute("style", "display: none;");
      document.querySelector(".weekPicker")?.setAttribute("style", "display: inline-block;");
      this.weekPicker.nativeElement.value = this.selectedWeek;
    } else {
      // Show dayPicker, hide weekPicker
      document.querySelector(".weekPicker")?.setAttribute("style", "display: none;");
      document.querySelector(".dayPicker")?.setAttribute("style", "display: inline-block;");
      this.dayPicker.nativeElement.value = this.selectedDay;
    }

    this.updateChartData();
  }

  onSelectedDayChanged() {
    this.selectedDay = this.dayPicker.nativeElement.value;
    this.updateChartData();
  }

  onSelectedWeekChanged() {
    this.selectedWeek = this.weekPicker.nativeElement.value;
    this.updateChartData();
  }

  public updateChartData() {
    let valuesArray = this.weatherDataService.getRecordsChart(this.selectedValue, this.selectedType, this.selectedDay, this.selectedWeek).map(record => record[2]);

    this.chartDataUpdated.emit(valuesArray);

    let xaxisArray = this.weatherDataService.getRecordsChart(this.selectedValue, this.selectedType, this.selectedDay, this.selectedWeek).map(record => record[1]);
    let datesArray = this.weatherDataService.getRecordsChart(this.selectedValue, this.selectedType, this.selectedDay, this.selectedWeek).map(record => record[0]);

    let dateTimeArray: string[] = [];
    for(let i = 0; i < datesArray.length; i++) {
      dateTimeArray.push(datesArray[i] + ' ' + xaxisArray[i]);
    }

    // Update chartOptions with the new data  
    if(this.selectedType == 'Day'){
      // Chart type = Day 
      this.chartOptions = {
        ...this.chartOptions,
        series: [
          { data: valuesArray }
        ],
        xaxis: {
          categories: xaxisArray,
          labels: {
            style: {
              colors: '#93c5fd',
            },
            rotateAlways: true,
            formatter: function (value: string) {
              // Show label if it contains the specified string
              return filterLabelsContaining(xaxisArray, ":00").includes(value) ? value : '';
            }
          },
          tooltip: {
            enabled: false,
          },
        },
        tooltip: {
          theme: 'dark',
          style: {
            fontSize: '12px'
          },
          custom: function({dataPointIndex}: {dataPointIndex: number}) {
            return `<div>Time: ${xaxisArray[dataPointIndex]}</div>
            <div>Value: ${valuesArray[dataPointIndex]}</div>`;
          }
        }
      };
    } else {
      // Chart type = Week
      this.chartOptions = {
      ...this.chartOptions,
      series: [
        { data: valuesArray }
      ],
      xaxis: {
        categories: dateTimeArray,
        labels: {
          style: {
            colors: '#ffffff',
          },
          rotate: 0,
          // rotateAlways: false,
          formatter: function (value: string, timestamp: any, index: any) {
            // Show label if it contains the specified string
            return filterLabelsContaining(dateTimeArray, "00:00").includes(value) ? value.substring(0, 11) : '';
          }
        },
        tooltip: {
          enabled: false,
        },
      },
      tooltip: {
        theme: 'dark',
        style: {
          fontSize: '12px'
        },
        custom: function({dataPointIndex}: {dataPointIndex: number}) {
          return `<div>Day: ${datesArray[dataPointIndex] + ' ' + xaxisArray[dataPointIndex]}</div>
          <div>Value: ${valuesArray[dataPointIndex]}</div>`;
        }
      }
    };
    }

    // Manually trigger update/rendering of the chart
    this.apexChart.updateOptions(this.chartOptions);
  }

}

// Function to filter labels containing a certain string
function filterLabelsContaining(categories: string[], searchString: string) {
  return categories.filter(label => label.includes(searchString));
}

// Set min and max value of the y array
function determineChartMinMax(data: number[]): any[] {
  let minMax: any[] = [];
  const dataMin: number = Math.min(...data);
  const dataMax: number = Math.max(...data);
  let chartMin: number | undefined;
  let chartMax: number | undefined;

  if(dataMin < 0 && dataMax > 0) {
    chartMin = undefined;
    chartMax = undefined;
  } else if(dataMin > 0){
    chartMin = 0;
  } else if(dataMax < 0) {
    chartMax = 0;
  }

  minMax.push(chartMin);
  minMax.push(chartMax);
  return minMax;
}

function getWeekNumber(dateString: string): string {
  const date = new Date(dateString);
  // Adjust the date to Thursday of the same week to make the calculation more accurate
  date.setDate(date.getDate() + 4 - (date.getDay() || 7));
  const yearStart = new Date(date.getFullYear(), 0, 1);
  // Calculate the week number
  const weekNumber = Math.ceil((((+date - +yearStart) / 86400000) + 1) / 7);
  const weekNumberString = date.getFullYear() + "-W" + weekNumber;

  return weekNumberString;
}

