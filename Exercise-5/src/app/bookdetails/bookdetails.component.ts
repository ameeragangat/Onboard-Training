import { HttpBackend, HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterLink, RouterModule, Router} from '@angular/router';

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

  constructor(
    private location: Router,
    private httpClient: HttpClient,
  ) { 
    /*
    const url = this.location.url;
    const paths = url.split("/");
    const id = paths[paths.length - 1];
    console.log(id)
    */
  }

  ngOnInit(){
    this.getBooks();
  }

  getBooks(){
    const url = 'http://localhost:4321/indexId_docs?index=books&id=1';

    this.httpClient.get<any>(url).subscribe(
      response => {
        console.log(response);
      }
    );
  }

}
