import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component'; // ✅ Import NavbarComponent
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-add-intern',
  standalone: true,
  templateUrl: './add-intern.component.html',
  styleUrls: ['./add-intern.component.css'],
  imports: [CommonModule, NavbarComponent, FormsModule, RouterModule]
})
export class AddInternComponent {
  managerId!: number;
  newIntern = { id: '', name: '', program: '', expertise: '', sme: '' };

  constructor(private route: ActivatedRoute, private router: Router) {
    this.managerId = +this.route.snapshot.paramMap.get('managerId')!;
  }

  saveIntern() {
    console.log('Intern added:', this.newIntern);
    this.router.navigate(['/interns', this.managerId]);
  }

  
}
