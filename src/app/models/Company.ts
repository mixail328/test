import { Contact } from './Contact';

export class Company extends Contact {
    nip: number;
    regon: number;
    krs: number;
    legalForn: string;

    constructor(
        id: number,
        name: string,
        email: string,
        phone: number,
        otherInfo: string,
        howFind: string,
        nip: number,
        regon: number,
        krs: number,
        legalForn: string
    )   {
        super(id, name, email, phone, otherInfo, howFind);
        this.nip = nip;
        this.regon = regon;
        this.krs = krs;
        this.legalForn = legalForn;
    }
}
