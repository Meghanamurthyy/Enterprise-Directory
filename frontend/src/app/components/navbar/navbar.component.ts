import { FormsModule } from '@angular/forms';
import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  searchQuery: string = '';

  constructor(private router: Router) {}

  // Handle search
  onSearch(): void {
    if (this.searchQuery.trim()) {
      
      this.router.navigate(['/employees', this.searchQuery.trim()]);
    }
  }
}

