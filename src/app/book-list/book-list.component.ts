import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { BookService } from '../book.service'; // تأكد من استيراد BookService بشكل صحيح
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // ✅ استيراد HttpClient


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: any[] = [];
  loading: boolean = true;
  bookIdToDelete: number | null = null;
  baseUrl = 'http://localhost/techtask';


  constructor(private bookService: BookService, private router: Router , private http: HttpClient,private renderer: Renderer2, private el: ElementRef) { }

  openDeleteModal(bookId: number) {
    this.bookIdToDelete = bookId;
  }

  ngOnInit(): void {
    this.fetchBooks();
  }

  // جلب الكتب
  fetchBooks(): void {
    this.bookService.getBooks().subscribe(
      data => {
        this.books = data.data; // assuming the API returns books in `data.data`
        this.loading = false;
      },
      error => {
        console.error("There was an error fetching the books!", error);
        this.loading = false;
      }
    );
  }

  // حذف الكتاب
  deleteBook(bookId: number): void {
    if (confirm("Are you sure you want to delete this book?")) {
      this.bookService.deleteBook(bookId).subscribe(
        () => {
          this.books = this.books.filter(book => book.B_id !== bookId);
        },
        error => {
          console.error("There was an error deleting the book!", error);
        }
      );
    }
  }

  editBook(bookId: number): void {
    this.router.navigate([`/edit-book/${bookId}`]);
  }


  confirmDelete() {
    if (this.bookIdToDelete !== null) {
      this.http.delete(`${this.baseUrl}/delete.php?B_id=${this.bookIdToDelete}`).subscribe(() => {
        window.location.reload(); 
      });
    }
  }
    
  


  
  
  
}
