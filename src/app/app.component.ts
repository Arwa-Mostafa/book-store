import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front_task';

  
  constructor ( public route:Router){
    // console.log("on constructor ")
  }
  ngOnInit(){
    // console.log("on ngOnInit ")
  }

  islogin(){
    return this.route.url == '/book-list' 
  }
}
