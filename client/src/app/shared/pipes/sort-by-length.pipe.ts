import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '../models/models';

@Pipe({
  name: 'sortByLength',
})
export class ArraySortLengthPipe implements PipeTransform {
  transform(array: Project[] | null): Project[] {
    if (!array) {
      return [];
    }
    if (!Array.isArray(array)) {
      return [];
    }
    array.sort((a: Project, b: Project) => {
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
