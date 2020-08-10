export class Address {
  id: number;
  addressType: string;
  addressStreet: string;
  addressHome: string;
  addressApartment: string;
  addressPostalCode: number;
  addressCity: string;

  constructor(
    id: number,
    addressType: string,
    addressStreet: string,
    addressHome: string,
    addressApartment: string,
    addressPostalCode: number,
    addressCity: string
  ) {
    this.id = id;
    this.addressType = addressType;
    this.addressStreet = addressStreet;
    this.addressHome = addressHome;
    this.addressApartment = addressApartment;
    this.addressPostalCode = addressPostalCode;
    this.addressCity = addressCity;
  }
}
