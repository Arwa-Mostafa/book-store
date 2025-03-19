import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  bookId!: number;
  book: any = { title: '', author: '', genre: '' };
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit(): void {
 
    this.bookId = Number(this.route.snapshot.paramMap.get('B_id'));
    console.log("Book ID:", this.bookId); 

  if (!this.bookId) {
    this.errorMessage = "Invalid Book ID";
    return;
  }

  this.fetchBookDetails();
  }

  fetchBookDetails(): void {
    this.loading = true;
  
    this.bookService.getBookById(this.bookId).subscribe(
      (response) => {
        console.log("API Response:", response); 
  
        if (response && response.status === 'success' && response.data.length > 0) {
        
          this.book = {
            title: response.data[0].title,
            author: response.data[0].author,
            genre: response.data[0].genre
          };
          console.log("Book Data Loaded:", this.book); 
        } else {
          this.errorMessage = "Book not found.";
        }
  
        this.loading = false;
      },
      (error) => {
        console.error("Error fetching book details:", error);
        this.errorMessage = "Error fetching book details.";
        this.loading = false;
      }
    );
  }
  
  
  
successMessage: string = '';

updateBook() {
  // التحقق من أن جميع الحقول مملوءة
  if (!this.book.title || !this.book.author || !this.book.genre) {
    this.errorMessage = "All fields are required!";
    return;
  }

  // استدعاء API لتحديث الكتاب
  this.bookService.updateBook(this.bookId, this.book).subscribe(
    (response) => {
      console.log("Update Response:", response);

      if (response && response.status === 'success') {
        this.successMessage = 'Book updated successfully!';

        setTimeout(() => {
          this.successMessage = '';
          this.router.navigate(['/books']); 
        }, 5000);
      } else {
        this.errorMessage = 'Failed to update book. Please try again.';
      }


      

    },
    
    (error) => {
      console.error("Error updating book:", error);
      this.errorMessage = "Error updating book. Please try again.";
    }
  );
  
}



  
}
