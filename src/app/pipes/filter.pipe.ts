import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, search: string = ''): any {
    if (!search.trim()) {
      return value;
    }

    return value.filter(pokemon => {
      return pokemon.types.some(x => x.type.name.includes(search.toLowerCase()));
    });
  }

}
