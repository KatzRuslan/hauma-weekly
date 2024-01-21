import { TestBed } from '@angular/core/testing';
import { MainHeaderComponent } from './main-header.component';
describe('MainHeaderComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MainHeaderComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(MainHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=main-header.component.spec.js.map