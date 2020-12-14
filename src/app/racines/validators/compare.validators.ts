import { AbstractControl } from '@angular/forms';

export function compareValidator(control: AbstractControl) {
    // if (!control.value.startsWith('https') || !control.value.includes('.me')) {
    //     return { urlValid: true };
    // }
    return null;
}