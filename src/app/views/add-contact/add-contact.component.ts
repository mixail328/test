import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ValidationErrors,
  FormArray,
} from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { concat } from 'rxjs';
import { ContactService } from 'src/app/dao/impl/contact.service';
import { Address } from 'src/app/models/Address';
import { Person } from 'src/app/models/Person';
import { Company } from 'src/app/models/Company';

interface SelectValues {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css'],
})
export class AddContactComponent implements OnInit {
  newPerson: FormGroup;
  newCompany: FormGroup;
  addresses: FormGroup;

  contactType: boolean;
  stap1: boolean;
  wayValue: string;
  selectedValuel;
  innemedia;

  media: SelectValues[] = [
    { value: 'facebook', viewValue: 'Facebook' },
    { value: 'twitter', viewValue: 'Twitter' },
    { value: 'linkedin', viewValue: 'LinkedIn' },
    { value: 'instagram', viewValue: 'Instagram' },
    { value: 'inne', viewValue: 'Inne' },
  ];

  ways: SelectValues[] = [
    { value: 'reference', viewValue: 'Rekomendacja' },
    { value: 'conference', viewValue: 'Konferencja i szkolenie' },
    { value: 'media', viewValue: 'Media społecznościowe' },
    { value: 'page', viewValue: 'Strona www' },
  ];

  legalForm: SelectValues[] = [
    { value: 'sp_akc', viewValue: 'Spółka akcyjna' },
    { value: 'sp_cywilna', viewValue: 'Spółka cywilna' },
    { value: 'sp_prawna', viewValue: 'Spółka prawna' },
    { value: 'spzoo', viewValue: 'Spółka z o.o.' },
    { value: 'inne', viewValue: 'inne' },
  ];

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.contactType = true;
    this.personFormInit();
    this.companyFormInit();
    this.typeControll();
  }

  typeControll(): FormGroup {
    // console.log('type : ', this.contactType);
    if (this.contactType) {
      return this.newPerson;
    } else {
      return this.newCompany;
    }
  }

  private peselValidator(control: FormControl): ValidationErrors {
    /** Проверка на содержание цифр */
    const hasNumber = /^[0-9]{11}$/.test(control.value);
    /** Общая проверка */
    const weight = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
    let sum = 0;
    let isValid: boolean;
    let dateValid: boolean;

    if (!hasNumber) {
      return { peselValid: 'niepoprawny pesel' };
    }
    if (
      parseInt(control.value.substring(4, 6)) > 31 ||
      parseInt(control.value.substring(2, 4)) > 12
    ) {
      dateValid = false;
    } else {
      dateValid = true;
    }

    let controlNumber = parseInt(control.value.substring(10, 11));
    for (let i = 0; i < weight.length; i++) {
      sum += parseInt(control.value.substring(i, i + 1)) * weight[i];
    }
    sum = sum % 10;
    isValid = (10 - sum) % 10 === controlNumber;

    const peselValid = hasNumber && dateValid && isValid;
    if (!peselValid) {
      return { peselValid: 'niepoprawny pesel' };
    }
    return null;
  }

  personFormInit(): void {
    this.newPerson = this.fb.group({
      name: [null],
      surname: [null,  [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      pesel: ['96102811394', [Validators.required, this.peselValidator]],
      email: [null],
      phone: [null],
      otherInfo: [null],
      howFind: [null],
      type: ['person'],
      address:  new FormArray([
      ]),
    });
  }
1
  companyFormInit(): void {
    this.newCompany = this.fb.group({
      name: [null],
      nip: [null, [Validators.required, this.validateNip]],
      regon: [null, [Validators.required, this.validateRegon]],
      krs: [null],
      legalForm: [null],
      email: [null],
      phone: [null],
      otherInfo: [null],
      howFind: [null],
      type: ['company'],
      answer: [null],
      address:  new FormArray([
      ]),
    });
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
  
  addContact(contact: Person | Company) {
    console.log('ADDING CONTACT', contact);
    this.contactService.add(contact).subscribe((result) => {
      console.log('RESULT', result);
      this.personFormInit();
      this.markFormGroupTouched(this.newPerson);

    });
  }

  private validateRegon(control: FormControl): null | ValidationErrors {
    if (!control.value) return null;
    const regon: string = control.value;
    
    const isOnlyDigit: boolean = /^\d+$/.test(regon);  
    if ((regon.length !== 9 && regon.length !== 14) || !isOnlyDigit) return { 'regonError': true };

    let sum: number = 0; 
    let weight: Array<number>;
    
    if (regon.length === 9) {
      weight = [8, 9, 2, 3, 4, 5, 6, 7];
    } else {
      weight = [2, 4, 8, 5, 0, 9, 7, 3, 6, 1, 2, 4, 8];
    }
    
    for (var i = 0; i < regon.length-1; i++) {
      sum += weight [i] * parseInt(regon.charAt(i));
    }
    
    let resultControlNumber = sum % 11;
    if (resultControlNumber === 10) resultControlNumber = 0;
    
    const controlNumber = parseInt(regon.charAt(regon.length - 1));
    if (resultControlNumber !== controlNumber) return { 'regonError': true };
  
    return null;
  }

  private validateNip(control: FormControl): null | ValidationErrors {
    if (!control.value) return null;
    const nip: string = control.value.replace(/[\ \-]/gi, '');
   
    const isOnlyDigit: boolean = /^\d+$/.test(nip);  
    if (nip.length !== 10 || !isOnlyDigit) return { 'nipError': true };

    let sum: number = 0; 
    let controlNumber = parseInt(nip.substring(9, 10));
    const weight : Array<number> = [6, 5, 7, 2, 3, 4, 5, 6, 7];

    for (let i = 0; i < weight.length; i++) {
      sum += (parseInt(nip.substr(i, 1)) * weight[i]);
    }
    
    const resultControlNumber = sum % 11;
    if (resultControlNumber !== controlNumber) return { 'nipError': true };

    return null;
  }

  ngOnInit() {}
}
