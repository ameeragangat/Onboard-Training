import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

export class Books {
  constructor(
    public title: string,
    public author: string,
    public isbn: string,
  ){
  }
}

@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css']
})
export class BookdetailsComponent implements OnInit {

  reactiveForm: FormGroup;
  books: Books[] = [];
  book: Books;

  constructor(

  ) { }

  ngOnInit(){
  }

}
