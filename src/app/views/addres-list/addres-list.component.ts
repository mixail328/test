import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Address } from 'src/app/models/Address';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-addres-list',
  templateUrl: './addres-list.component.html',
  styleUrls: ['./addres-list.component.css']
})
export class AddresListComponent implements OnInit {

  @Input()
  public item: Address;
  
  @Input()
    public index: number;

  @Output()
    public removed: EventEmitter<number> = new EventEmitter<number>();
  
  constructor() {
    console.log('utem', this.item);
   }



  ngOnInit(): void {
  }

}
