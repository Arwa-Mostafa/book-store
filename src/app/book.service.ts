import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BookService {
  getBookById(bookId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/get.php?B_id=${bookId}`);
  }
  private baseUrl = 'http://localhost/techtask';


  constructor(private http: HttpClient) { }

  // جلب جميع الكتب
  getBooks(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get.php`);
  }

  // حذف الكتاب
  deleteBook(bookId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete.php?B_id=${bookId}`);
  }

  // تحديث الكتاب
  updateBook(bookId: number, updatedData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/put.php?B_id=${bookId}`, updatedData);
  }

  addBook(book: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/post.php`, book);
  }
 
}