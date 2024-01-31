import { TestBed } from '@angular/core/testing';
import { AuthorsComponent } from './authors.component';
describe('AuthorsComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AuthorsComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(AuthorsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=authors.component.spec.js.map