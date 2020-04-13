import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yelpHour'
})
export class YelpHourPipe implements PipeTransform {

  transform(value: string): string {
    let formattedTime = '';

    let hour = Number(value.substr(0, 2));
    const minute = value.substr(2, 2);

    if (hour < 12) {
      if (hour === 0) {
        formattedTime += '12:';
      } else {
        formattedTime += hour.toString() + ':';
      }
      formattedTime += minute + ' AM';
    } else {
      hour -= 12;

      if (hour === 12) {
        formattedTime += hour.toString() + ':' + minute + ' AM';
      } else {
        formattedTime += hour.toString() + ':';
      }
      formattedTime += minute + ' PM';
    }

    return formattedTime;
  }

}
