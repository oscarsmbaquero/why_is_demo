 
 
 import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
 
 
 export function weekdayValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const dateValue = new Date(`${control.value}T00:00:00`);
      const day = dateValue.getDay();
      const isWeekday = day >= 1 && day <= 5;

      return isWeekday ? null : { weekdayOnly: true };
    };
  }

  export function timeRangeValidator(start: string, end: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const selectedTime = control.value;
      const inRange = selectedTime >= start && selectedTime <= end;

      return inRange ? null : { businessHoursOnly: true };
    };
  }