import { Pipe, PipeTransform } from "@angular/core";
import { Widget } from './widget';


@Pipe({name:'filter'})
export class FilterPipe implements PipeTransform{
    transform(items:Widget[],filter:any):Widget[]{
        if(!items || !filter){
            return items;
        }

        return items.filter(item=> item.name.indexOf(filter.name) !== -1);
    }
}