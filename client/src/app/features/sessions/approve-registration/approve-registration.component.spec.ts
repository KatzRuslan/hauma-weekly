import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveRegistrationComponent } from './approve-registration.component';

describe('ApproveRegistrationComponent', () => {
  let component: ApproveRegistrationComponent;
  let fixture: ComponentFixture<ApproveRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApproveRegistrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApproveRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
