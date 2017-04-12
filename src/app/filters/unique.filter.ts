import { Pipe, PipeTransform, Injectable } from '@angular/core';


@Pipe({
  name: 'uniqFilter',
  pure: false
})
@Injectable()
export class UniquePipe implements PipeTransform {
  transform(items: any[], args: any[]): any {
    // filter items array, items which match and return true will be kept, false will be filtered out

    return _.uniqBy(items, args);
  }
}
