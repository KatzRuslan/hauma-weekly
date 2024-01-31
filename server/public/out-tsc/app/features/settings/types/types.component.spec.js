import { TestBed } from '@angular/core/testing';
import { TypesComponent } from './types.component';
describe('TypesComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TypesComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(TypesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=types.component.spec.js.map