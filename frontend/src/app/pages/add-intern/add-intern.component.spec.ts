import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInternComponent } from './add-intern.component';

describe('AddInternComponent', () => {
  let component: AddInternComponent;
  let fixture: ComponentFixture<AddInternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddInternComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
