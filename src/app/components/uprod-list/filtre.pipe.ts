//import { PipeCollector } from "@angular/compiler/src/template_parser/binding_parser";
import { Pipe, PipeTransform } from "@angular/core";
import { Comwork } from 'src/app/comwork';

@Pipe({
    name: 'filterComwork'
})
export class filterPipe implements PipeTransform{
 transform(comworks? : Comwork[], filterText?: string) {
        if(comworks?.length === 0 || filterText === '') {
             return comworks;
        } else {
            return comworks?.filter((comwork) =>
            { 
                return comwork.denomination?.toLowerCase() === filterText?.toLowerCase() 
                || comwork.surname?.toLowerCase() === filterText?.toLowerCase()
                || comwork.specialitie?.toLowerCase() === filterText?.toLowerCase()
                || comwork.stars_count?.toString() === filterText?.toLowerCase()
                || comwork.specialities?.toString() === filterText?.toLowerCase()
            })
        }
    }
}