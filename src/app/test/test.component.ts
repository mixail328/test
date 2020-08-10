import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  myFirstReactiveForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }
  /** Инициализация формы*/
  initForm() {
    this.myFirstReactiveForm = this.fb.group({
      name: ['Иван'],
      email: [null],
    });
  }
}
