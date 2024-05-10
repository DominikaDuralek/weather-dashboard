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
    let allRecords = generateData();
    
    return allRecords;
  }

  // Sorted records for a table
  getRecordsTable(sortValue: number, sortOrder: string, dateFrom: string, dateTo: string) {
    let allRecords = this.getAllRecords();

    allRecords.sort((a, b) => a[sortValue] - b[sortValue]);

    // TODO
    // sort value and sort order - asc/desc
    if(sortOrder == 'desc') {
      allRecords = allRecords.reverse();
    }
    
    // Both dates picked
    if(dateFrom != '' && dateTo != '') allRecords = allRecords.filter(record => record[1] >= dateFrom && record[1] <= dateTo);
    // From date picked
    else if(dateFrom != '' && dateTo == '') allRecords = allRecords.filter(record => record[1] >= dateFrom);
    // To date picked
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
      console.log('Day data: ' + extractedData.length)
      return extractedData;
    } else {
      // Week chart - values every hour (average)
      // excractedData [0 - date, 1 - time, 2 - value]
      extractedData = allRecords.map(record => [record[1].toString(), record[2], record[selectedValue]]);
      // Get only records with matching week
      extractedData = extractedData.filter(record => getWeekNumber(record[0]) == selectedWeek);

      // Calculate hourly averages
      const hourlyAverages = calculateHourlyAverages(extractedData);

      // Output hourly averages
      hourlyAverages.forEach(([date, time, average]) => {
          console.log(`Date: ${date}, Time: ${time}, Average: ${average}`);
      });

      console.log('Week data: ' + hourlyAverages.length)

      return hourlyAverages;
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

// Mock data generation
function generateData2(): Array<Array<any>> {
  const data: Array<Array<any>> = [];
  let id = 1;

  const startDate = new Date('2024-05-01T00:00:00');
  const endDate = new Date('2024-05-31T23:45:00');
  // id, date, time, temp, hum, press, rain, wspeed, wdir, light, pm10, pm25
  const measurements = [10, 10, 10, 10, 10, 'N', 10, 10, 10];

  for (let date = new Date(startDate); date <= endDate; date.setMinutes(date.getMinutes() + 15)) {
      const formattedDate = date.toISOString().split('T')[0];
      const formattedTime = date.toTimeString().split(' ')[0];

      const row = [
          id++,
          formattedDate,
          formattedTime,
          ...measurements.map(value => typeof value === 'number' ? Math.floor(Math.random() * 21) : value)
      ];

      data.push(row);
  }

  return data;
}

function generateData(): Array<Array<any>> {
  const data: Array<Array<any>> = [];
  let id = 1;

  const startDate = new Date('2024-05-01T00:00:00');
  const endDate = new Date('2024-05-31T23:45:00');
  // id, date, time, temp, hum, press, rain, wspeed, wdir, light, pm10, pm25
  const measurements = [10, 10, 10, 10, 10, 'N', 10, 10, 10];

  // Loop through each date
  for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
    // Set the time to 00:00 at the beginning of each day
    date.setHours(0, 0, 0, 0);

    // Loop through each 15-minute interval in the day
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const formattedDate = date.toISOString().split('T')[0];
        const formattedTime = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;

        const row = [
          id++,
          formattedDate,
          formattedTime,
          ...measurements.map(value => typeof value === 'number' ? Math.floor(Math.random() * 21) : value)
        ];

        data.push(row);
      }
    }
  }

  return data;
}

// Function to calculate hourly averages for each measurement
function calculateHourlyAverages(data: Array<Array<any>>): Array<Array<any>> {
  const hourlyAverages = new Map<string, { sum: number; count: number }>(); // Map to store hourly sum and count

  // Iterate through each data row
  for (const row of data) {
      const [date, time, measurement] = row;
      const hour = time.split(':')[0]; // Extract hour from time

      // Key for the map is the hour
      const key = `${date} ${hour}:00`; // We'll consider the hour as HH:00 format

      // Update sum and count for the hour
      if (!hourlyAverages.has(key)) {
          hourlyAverages.set(key, { sum: 0, count: 0 });
      }
      const { sum, count } = hourlyAverages.get(key)!;
      hourlyAverages.set(key, { sum: sum + measurement, count: count + 1 });
  }

    // Calculate averages for each hour
    const hourlyAveragesResult: Array<Array<any>> = [];
    for (const [key, { sum, count }] of hourlyAverages) {
        const average = sum / count;
        const [date, time] = key.split(' ');
        hourlyAveragesResult.push([date, time, average]);
    }

    return hourlyAveragesResult;
}

