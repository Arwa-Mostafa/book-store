import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../book.service';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  @ViewChild('successModal') successModal!: ElementRef;
  @ViewChild('errorModal') errorModal!: ElementRef;
  
  bookForm!: FormGroup;
  submitted = false;
  errorMessage: string = '';


  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[A-Za-z\\s]+$')]],
      author: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[A-Za-z\\s]+$')]],
      genre: ['', Validators.required]
    });
  }

  get f() {
    return this.bookForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.bookForm.invalid) {
      return;
    }

    this.bookService.addBook(this.bookForm.value).subscribe(
      () => {
        this.showModal('successModal');
      },
      (error) => {
        console.error('Error adding book', error);
        this.errorMessage = 'Error adding book. Please try again later.';
        this.showModal('errorModal');
      }
    );
  }

  showModal(modalId: string) {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  navigateToList() {
    this.router.navigate(['/book-list']);
  }
}
