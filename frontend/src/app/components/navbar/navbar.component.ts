/*
import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @Output() searchEvent = new EventEmitter<string>();

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchEvent.emit(input.value);
  }
}

*/
/*
import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router'; // ✅ Import Router
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @Output() searchEvent = new EventEmitter<string>();

  constructor(private router: Router) {} // ✅ Inject Router

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    const id = input.value.trim();
  
    if (id) {
      this.searchEvent.emit(id);
      this.router.navigate(['/employee-search', id]); // 👈 Fix route path if needed
      input.value = ''; // 👈 Clear input after search
    }
  }
  
  
}
  */

import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router'; 
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @Output() searchEvent = new EventEmitter<string>();

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    const id = input.value.trim();

    if (id) {
      this.searchEvent.emit(id);
      this.router.navigate(['/employees', id]).then(() => {
        this.cdr.detectChanges(); // Force UI refresh if needed
      });
      input.value = ''; 
    }
  }
}

