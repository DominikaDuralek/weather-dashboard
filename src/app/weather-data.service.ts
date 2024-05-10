import { Injectable } from '@angular/core';
import { get } from 'http';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {
  // Getting all the needed data
  // id, date, time, temp, hum, press, rain, wspeed, wdir, light, pm10, pm25
  constructor() { }

  // Get newest record
  getNewestRecord() {
    let newestRecord = [0, '02.05.2024', '12:00', 1, 2, 3, 4, 5, 'N', 7, 8, 9];
    return newestRecord;
  }

  // Get all records
  getAllRecords() {
    let allRecords = [
      [1, '2024-05-02', '12:00', 15, 10, 10, 10, 10, 'N', 10, 10, 10],
      [6, '2024-05-02', '12:15', 20, 10, 10, 10, 10, 'N', 10, 10, 10],
      [2, '2024-05-03', '12:15', 15, 10, 10, 10, 10, 'N', 10, 10, 10],
      [3, '2024-05-04', '12:30', 10, 10, 10, 10, 10, 'N', 10, 10, 10],
      [4, '2024-05-05', '12:45', 10, 10, 10, 10, 10, 'N', 10, 10, 10],
      [5, '2024-05-06', '13:00', 10, 10, 10, 10, 10, 'N', 10, 10, 10],
      [1, '2024-05-10', '12:00', 15, 10, 10, 10, 10, 'N', 10, 10, 10],
      [6, '2024-05-11', '12:15', 20, 10, 10, 10, 10, 'N', 10, 10, 10],
      [2, '2024-05-12', '12:15', 15, 10, 10, 10, 10, 'N', 10, 10, 10],
      [3, '2024-05-13', '12:30', 10, 10, 10, 10, 10, 'N', 10, 10, 10],
      [4, '2024-05-14', '12:45', 10, 10, 10, 10, 10, 'N', 10, 10, 10],
      [5, '2024-05-15', '13:00', 10, 10, 10, 10, 10, 'N', 10, 10, 10],
    ];
    
    return allRecords;
  }

  // Sorted records for a table
  getRecordsTable(sortValue: string, sortOrder: string, dateFrom: string, dateTo: string) {
    let allRecords = []; //get all records

    // TODO
    // sort value and sort order - asc/desc
    if(sortOrder == 'desc') {
      allRecords = [
        [5, '2024-05-06', '13:00', 10, 10, 10, 10, 10, 'N', 10, 10, 10],
        [4, '2024-05-05', '12:45', 10, 10, 10, 10, 10, 'N', 10, 10, 10],
        [3, '2024-05-04', '12:30', 10, 10, 10, 10, 10, 'N', 10, 10, 10],
        [2, '2024-05-03', '12:15', 10, 10, 10, 10, 10, 'N', 10, 10, 10],
        [1, '2024-05-02', '12:00', 10, 10, 10, 10, 10, 'N', 10, 10, 10],
      ];
    } else {
      allRecords = [
        [1, '2024-05-02', '12:00', 10, 10, 10, 10, 10, 'N', 10, 10, 10],
        [2, '2024-05-03', '12:15', 10, 10, 10, 10, 10, 'N', 10, 10, 10],
        [3, '2024-05-04', '12:30', 10, 10, 10, 10, 10, 'N', 10, 10, 10],
        [4, '2024-05-05', '12:45', 10, 10, 10, 10, 10, 'N', 10, 10, 10],
        [5, '2024-05-06', '13:00', 10, 10, 10, 10, 10, 'N', 10, 10, 10],
      ];
    }
    
    // both dates picked
    if(dateFrom != '' && dateTo != '') allRecords = allRecords.filter(record => record[1] >= dateFrom && record[1] <= dateTo);
    // from date picked
    else if(dateFrom != '' && dateTo == '') allRecords = allRecords.filter(record => record[1] >= dateFrom);
    // to date picked
    else if(dateFrom == '' && dateTo != '') allRecords = allRecords.filter(record => record[1] <= dateTo);

    return allRecords;
  }

  // Records for a chart
  getRecordsChart(selectedValue: number, selectedType: string, selectedDay?: string, selectedWeek?: string){
    let allRecords = this.getAllRecords();
    let extractedData: any[] = [];

    if(selectedType == 'Day') {
      // Day chart - values every 15 mins
      // excractedData [0 - date, 1 - time, 2 - value]
      extractedData = allRecords.map(record => [record[1], record[2], record[selectedValue]]);
      // Only return data from the chosen day
      extractedData = extractedData.filter(record => record[0] == selectedDay);

      return extractedData;
    } else {
      // Week chart - values every hour (average)
      // excractedData [0 - date, 1 - time, 2 - value]
      extractedData = allRecords.map(record => [record[1].toString(), record[2], record[selectedValue]]);
      // Get only records with matching week
      extractedData = extractedData.filter(record => getWeekNumber(record[0]) == selectedWeek);

      return extractedData;
    }
  }

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
