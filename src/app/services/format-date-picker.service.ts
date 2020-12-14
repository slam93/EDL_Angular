import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatDatePickerService {

  constructor() { }

  public formatDate(year,month,day){
    return year.toString()+'-'+(month.toString().length === 1?(0+month.toString()):month.toString())+'-'+ (day.toString().length === 1?(0+day.toString()):day.toString());
  }
}
