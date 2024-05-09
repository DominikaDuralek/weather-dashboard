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
      [1, '02.05.2024', '12:00', 10, 10, 10, 10, 10, 'N', 10, 10, 10],
      [2, '02.05.2024', '12:00', 10, 10, 10, 10, 10, 'N', 10, 10, 10],
      [3, '02.05.2024', '12:00', 10, 10, 10, 10, 10, 'N', 10, 10, 10],
      [4, '02.05.2024', '12:00', 10, 10, 10, 10, 10, 'N', 10, 10, 10],
      [5, '02.05.2024', '12:00', 10, 10, 10, 10, 10, 'N', 10, 10, 10],
    ];
    
    return allRecords;
  }

  // sorted records
  getSortedRecords(sortValue: string, sortOrder: string) {
    let allRecords = [];
    if(sortOrder == 'desc') {
      allRecords = [
        [5, '02.05.2024', '12:00', 10, 10, 10, 10, 10, 'N', 10, 10, 10],
        [4, '02.05.2024', '12:00', 10, 10, 10, 10, 10, 'N', 10, 10, 10],
        [3, '02.05.2024', '12:00', 10, 10, 10, 10, 10, 'N', 10, 10, 10],
        [2, '02.05.2024', '12:00', 10, 10, 10, 10, 10, 'N', 10, 10, 10],
        [1, '02.05.2024', '12:00', 10, 10, 10, 10, 10, 'N', 10, 10, 10],
      ];
    } else {
      allRecords = [
        [1, '02.05.2024', '12:00', 10, 10, 10, 10, 10, 'N', 10, 10, 10],
        [2, '02.05.2024', '12:00', 10, 10, 10, 10, 10, 'N', 10, 10, 10],
        [3, '02.05.2024', '12:00', 10, 10, 10, 10, 10, 'N', 10, 10, 10],
        [4, '02.05.2024', '12:00', 10, 10, 10, 10, 10, 'N', 10, 10, 10],
        [5, '02.05.2024', '12:00', 10, 10, 10, 10, 10, 'N', 10, 10, 10],
      ];
    }

    return allRecords;
  }

}
