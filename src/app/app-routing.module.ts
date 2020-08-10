import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ContactsComponent } from './views/contacts/contacts.component';
import { TestComponent } from './test/test.component';
import { AddContactComponent } from './views/add-contact/add-contact.component';

const routes: Routes = [
  { path: '', component: ContactsComponent },
  { path: 'add', component: AddContactComponent },

  { path: 'test', component: TestComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
