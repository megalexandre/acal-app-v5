import { Pipe, PipeTransform } from '@angular/core';

/**
 * Finds an object from given source using the given key - value pairs
 */
@Pipe({
    name      : 'expense',
    pure      : false,
    standalone: true,
})
export class ExpensePipe implements PipeTransform
{
    constructor(){}

    transform(value: string): string {
    
        if (value === 'completed') {
            return 'Finalizado'
        } 

        else if (value === 'pending'){
            return 'Pendente'
        }

        return value 
    }
}
