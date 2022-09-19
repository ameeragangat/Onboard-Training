import { HttpBackend, HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterLink, RouterModule, Router} from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';


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

  books: Books[];
  book: Books;
  rform: FormGroup;

  constructor(
    private location: Router,
    private httpClient: HttpClient,
    private fb:FormBuilder,
    private modalService: NgbModal,
  ) {  
  }

  ngOnInit(){
    this.getBook();
    
    this.rform = this.fb.group({
      Title: [''],
      Author:[''],
      ISBN:['']
    });
  }

  getBook(){

    const newId = this.extractId();
    const url = 'http://localhost:4321/indexId_docs?index=books&id=' + newId;

    this.httpClient.get<any>(url).subscribe(
      response => {
        console.log(response);
        //this.books = response;
        this.book =response[0];

        // TODO: Why can't this way work? 
        // this.books.forEach(function (value) {
        //   console.log(value.author);
        // });

        this.rform.patchValue({
          Title: this.book.title,
          Author: this.book.author,
          ISBN: this.book.isbn
        });
      }
    );
  }

  extractId() {
    // Extract id from location path
    const urlWeb = this.location.url;
    const paths = urlWeb.split("/bookdetails?id=");
    const idExtracted = paths[paths.length - 1];
    // Make sure the id string is retrieved
    console.log(idExtracted); 
    return idExtracted;
  }

  send() {
    console.log(this.rform.value);
    let route = '../../home';
    this.location.navigate([route]);
  }

}
