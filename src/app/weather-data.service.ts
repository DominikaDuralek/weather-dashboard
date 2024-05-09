import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {
  // getting all the needed data
  // id, date, time, temp, hum, press, rain, wspeed, wdir, light, pm10, pm25
  constructor() { }

  // get newest record
  getNewestRecord() {
    let newestRecord = [0, '02.05.2024', '12:00', 1, 2, 3, 4, 5, 'N', 7, 8, 9];
    return newestRecord;
  }

  // get all records
  getAllRecords() {
    let allRecords = [
      [1, '2024-05-02', '12:00', 10, 10, 10, 10, 10, 'N', 10, 10, 10],
      [2, '2024-05-03', '12:00', 10, 10, 10, 10, 10, 'N', 10, 10, 10],
      [3, '2024-05-04', '12:00', 10, 10, 10, 10, 10, 'N', 10, 10, 10],
      [4, '2024-05-05', '12:00', 10, 10, 10, 10, 10, 'N', 10, 10, 10],
      [5, '2024-05-06', '12:00', 10, 10, 10, 10, 10, 'N', 10, 10, 10],
    ];
    
    return allRecords;
  }

  // sorted records
  getSortedRecords(sortValue: string, sortOrder: string, dateFrom: string, dateTo: string) {
    let allRecords = [];

    // TODO
    // sort value and sort order - asc/desc
    if(sortOrder == 'desc') {
      allRecords = [
        [5, '2024-05-06', '12:00', 10, 10, 10, 10, 10, 'N', 10, 10, 10],
        [4, '2024-05-05', '12:00', 10, 10, 10, 10, 10, 'N', 10, 10, 10],
        [3, '2024-05-04', '12:00', 10, 10, 10, 10, 10, 'N', 10, 10, 10],
        [2, '2024-05-03', '12:00', 10, 10, 10, 10, 10, 'N', 10, 10, 10],
        [1, '2024-05-02', '12:00', 10, 10, 10, 10, 10, 'N', 10, 10, 10],
      ];
    } else {
      allRecords = [
        [1, '2024-05-02', '12:00', 10, 10, 10, 10, 10, 'N', 10, 10, 10],
        [2, '2024-05-03', '12:00', 10, 10, 10, 10, 10, 'N', 10, 10, 10],
        [3, '2024-05-04', '12:00', 10, 10, 10, 10, 10, 'N', 10, 10, 10],
        [4, '2024-05-05', '12:00', 10, 10, 10, 10, 10, 'N', 10, 10, 10],
        [5, '2024-05-06', '12:00', 10, 10, 10, 10, 10, 'N', 10, 10, 10],
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

}
