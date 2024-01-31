import { TestBed } from '@angular/core/testing';
import { EditableTextComponent } from './editable-text.component';
describe('EditableTextComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EditableTextComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(EditableTextComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=editable-text.component.spec.js.map