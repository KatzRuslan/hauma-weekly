import { TestBed } from '@angular/core/testing';
import { SideMenuComponent } from './side-menu.component';
describe('SideMenuComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SideMenuComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(SideMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=side-menu.component.spec.js.map