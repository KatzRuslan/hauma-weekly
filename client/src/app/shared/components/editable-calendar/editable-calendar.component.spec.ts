import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableCalendarComponent } from './editable-calendar.component';

describe('EditableCalendarComponent', () => {
  let component: EditableCalendarComponent;
  let fixture: ComponentFixture<EditableCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditableCalendarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditableCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
