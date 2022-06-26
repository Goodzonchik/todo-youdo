import { Pipe, PipeTransform } from '@angular/core';
import { Projects } from '../models/models';

@Pipe({
  name: 'sortByLength',
})
export class ArraySortLengthPipe implements PipeTransform {
  transform(array: Projects[]): Projects[] {
    if (!Array.isArray(array)) {
      return [];
    }
    array.sort((a: Projects, b: Projects) => {
      if (a.todos.length > b.todos.length) {
        return -1;
      } else if (a.todos.length < b.todos.length) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}
