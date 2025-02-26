import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeProgramComponent } from './add-employee-program.component';

describe('AddEmployeeProgramComponent', () => {
  let component: AddEmployeeProgramComponent;
  let fixture: ComponentFixture<AddEmployeeProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEmployeeProgramComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEmployeeProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
