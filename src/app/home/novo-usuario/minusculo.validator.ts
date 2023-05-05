import { AbstractControl, FormControl } from "@angular/forms";

    export function minusculoValidator(control: FormControl){
        const valor = control.value as string;
        if(valor != valor.toLowerCase()){
            return { minusculo: true };
    }else{
        return null
    }

}