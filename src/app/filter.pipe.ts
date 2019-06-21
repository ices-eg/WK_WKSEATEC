import { Pipe, PipeTransform } from "@angular/core";
import { Widget } from './widget';


@Pipe({name:'filter'})
export class FilterPipe implements PipeTransform{
    transform(items:Widget[],filter:any):Widget[]{
        if(!items || !filter){
            return items;
        }

        return items.filter(item=>{
            return item.name.toLowerCase().indexOf((filter.name).toLowerCase()) !==-1;
        });
    }
}