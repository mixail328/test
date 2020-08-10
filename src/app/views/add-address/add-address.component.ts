import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Address } from '../../models/Address';
@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css'],
})
export class AddAddressComponent implements OnInit {

  @Input()
    public addresses: FormGroup[];
    
   address: FormGroup;
  public myModel = '';
  public mask = [/[1-9]/, /\d/, '-', /\d/, /\d/, /\d/];

  constructor(private fb: FormBuilder) {
     this.addressInit();
  }

  addAddress() {
    console.log('ADDING ADDRESS... ', this.address.value);
    this.addresses.push(this.address  );  //SLOMAL ZDESS!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    console.log('arr : ', this.addresses);
    this.addressInit();
}


  ngOnInit(): void {
    console.log(this.addresses.length);
  }

  addressInit(): void {
    this.address = this.fb.group({
      addressType: ['Adres zamieszkania', [Validators.required]],
      addressStreet: ['Lipowa', [Validators.required]],
      addressHome: [33, [Validators.required]],
      addressApartment: [7],
      addressPostalCode: ['11-333', [Validators.required]],
      addressCity: ['Lublin', [Validators.required]],
    });
  }
}
