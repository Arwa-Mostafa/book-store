import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { AddBookComponent } from './add-book/add-book.component';


const routes: Routes = [
  { path: '', redirectTo: '/book-list', pathMatch: 'full' }, 
  { path: 'book-list', component: BookListComponent },
  { path: 'edit-book/:B_id', component: EditBookComponent },
  { path: 'add-book', component: AddBookComponent }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
