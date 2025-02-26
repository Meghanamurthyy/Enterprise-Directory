import { Component, Output, EventEmitter } from '@angular/core';

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