import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Import RouterModule for routing
import { NavbarComponent } from './components/navbar/navbar.component'; // Import the navbar component

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NavbarComponent], // Import RouterModule and NavbarComponent
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'employee-app'; // Optional: You can remove this if not needed
}