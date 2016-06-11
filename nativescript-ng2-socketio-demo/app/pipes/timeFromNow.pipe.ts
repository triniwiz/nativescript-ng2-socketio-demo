import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';
@Pipe({
    name: 'timeFromNow'
})

export class TimeFromNowPipe implements PipeTransform {
    transform(date) {
        if (date) {
            return moment(date).fromNow();
        }
    }
}