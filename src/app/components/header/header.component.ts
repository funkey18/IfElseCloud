import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ConstantsService } from '../../constants/constants.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HeaderComponent implements OnInit {

  constructor(public constants: ConstantsService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.constants.clearSession();
    this.router.navigate(['/dashboard']);
  }
}
