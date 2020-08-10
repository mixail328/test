import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Contact } from 'src/app/models/Contact';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ContactService } from 'src/app/dao/impl/contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  // -------------------------------------------------------------------------
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  contacts: Contact[];
  displayedColumns: string[] = ['name', 'type', 'email', 'phone', 'operations'];
  dataSource: MatTableDataSource<Contact> = new MatTableDataSource<Contact>();

  // -------------------------------------------------------------------------

  constructor(private contactService: ContactService) {}

  
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.fillAllContacts();
  }

  fillAllContacts() {
    this.contactService.findAll().subscribe((result) => {
      console.log('RESULT = ', result);
      this.dataSource.data = result;
    });
  }
}
