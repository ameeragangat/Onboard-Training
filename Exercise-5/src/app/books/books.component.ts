import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';

export class Books {
  constructor(
    public title: string,
    public author: string,
    public isbn: string
  ){

  }
}

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})

export class BooksComponent implements OnInit {

  books: Books[] = [];
  constructor(
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.getBooks();
  }
  getBooks(){
    this.httpClient.get<any>('http://localhost:4321/index_docs?index=books&id=2').subscribe(
      response => {
        console.log(response);
        this.books = response;
      }
    );
  }
}
