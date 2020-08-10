import { Component, OnInit } from '@angular/core';
import { Contact } from './models/Contact';
import { ContactService } from './dao/impl/contact.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  contacts: Contact[];

  constructor(private contactService: ContactService) {}

  ngOnInit() {}
}
