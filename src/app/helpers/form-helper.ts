import { FormGroup } from "@angular/forms";

export class FormHelper {
  public static hasError(controlName: string, formGroup: FormGroup, isFormSubmitted: boolean): boolean {
    const control = formGroup.get(controlName);
    return control ? !control.valid && isFormSubmitted : false;
  }
}