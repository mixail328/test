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

  companyFormInit(): void {
    this.newCompany = this.fb.group({
      name: [null],
      nip: [null],
      regon: [null],
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

 

  ngOnInit() {}
}
