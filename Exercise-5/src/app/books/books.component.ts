import { HttpClient } from '@angular/common/http';
import { AbstractType, Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})

export class BooksComponent implements OnInit {
  closeResult: string;
  books: Books[] = [];
  book: Books;
  addForm: FormGroup;
  
  constructor(
    private httpClient: HttpClient,
    private modalService: NgbModal,
    private router: Router,

  ) {}

  ngOnInit(): void {
    this.getBooks();

    this.addForm = new FormGroup({
      title: new FormControl(null),
      author: new FormControl(null),
      isbn: new FormControl(null),
      /*isbn: new FormControl(null, [Validators.required, Validators.pattern.arguments('^[A-Z]{0,10}$')]),*/
    })
  }

  get registerFormControl() {
    return this.addForm.controls;
  }

  getBooks(){
    this.httpClient.get<any>('http://localhost:4321/get_all_docs?index=books').subscribe(
      response => {
        console.log(response);
        this.books = response;
      }
    );
  }

  open(content) {

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  /*
  onSubmit(f: NgForm) {
    const url = 'http://localhost:4321/docs#/default/add_docs_add_doc_get';
    this.httpClient.post(url, f.value)
      .subscribe((result) => {
        this.ngOnInit(); //reload the table
      });
    this.modalService.dismissAll(); //dismiss the modal
  }
  
  openDetails(targetModal, book: Books) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });
    document.getElementById('Title').setAttribute('value', book.title);
    document.getElementById('Author').setAttribute('value', book.author);
    document.getElementById('ISBN').setAttribute('value', book.isbn);
 }
 */

 openAddBook(targetModal, book: Books) {
  this.modalService.open(targetModal, {
   centered: true,
   backdrop: 'static',
   size: 'lg'
 });

}

onSave(f:FormGroup){
  const url = 'http://localhost:4321/create_index_new?index=books';

  this.httpClient.post(url,f.value).subscribe(
    response => {
      console.log(response);
    }
  );
  /*
  this.httpClient.post(url, f.value)
    .subscribe((result) => {
      this.ngOnInit(); //reload the table
    });
  this.modalService.dismissAll(); //dismiss the modal
  */
}

onSubmit(){
  console.log(this.addForm);
}

editBook(book: Books) {
  let route = '/bookdetails';
  this.router.navigate([route], { queryParams: { id: book.isbn } });
}

}
