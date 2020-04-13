import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yelpDay'
})
export class YelpDayPipe implements PipeTransform {

  transform(value: number): string {
    switch (value) {
      case 0:
        return 'Monday';
      case 1:
        return 'Tuesday';
      case 2:
        return 'Wednesday';
      case 3:
        return 'Thursday';
      case 4:
        return 'Friday';
      case 5:
        return 'Saturday';
      case 6:
        return 'Sunday';
      default:
        return 'Invalid Day';
    }
  }

}
