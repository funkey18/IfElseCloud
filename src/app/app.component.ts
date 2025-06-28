import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  
  title = 'IfElseCloud-ui';

  constructor(private router:Router){
    
  }
  
  ngOnInit(): void {
    
  }

  showUserLogin(){
    if(this.router.url === '/' ||  this.router.url === '/login' ||  this.router.url === '/forgot-password' ){
      return false;
    } else {
      return true;
    }
  }
}
