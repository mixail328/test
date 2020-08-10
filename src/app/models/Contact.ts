import { Address } from './Address';

export class Contact {
  id: number;
  name: string;
  email: string;
  phone: number;
  otherInfo: string;
  howFind: string;
  addresses: Address[];

  constructor(
    id: number,
    name: string,
    email: string,
    phone: number,
    otherInfo: string,
    howFind: string
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.otherInfo = otherInfo;
    this.howFind = howFind;
    this.addresses = [];
  }
}
