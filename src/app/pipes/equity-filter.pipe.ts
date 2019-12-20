import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'equityfilter',
  pure: false
})
export class EquityFilterPipe implements PipeTransform {
  transform(items, criteria) {
    if (!items || !criteria || criteria.length==0) {
      return items;
    }

    return criteria.reduce(function(prev, curr) {
      return prev.filter(curr)
    }, items);
  }
}
