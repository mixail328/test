import { Contact } from './Contact';



export class Person extends Contact {
    surname: string;
    pesel: number;

    // tslint:disable-next-line: max-line-length
    constructor(id: number, name: string, email: string, phone: number, otherInfo: string, howFind: string, surname: string, pesel: number) {
        super(id, name, email, phone, otherInfo, howFind);
        this.surname = surname;
        this.pesel = pesel;
    }
}