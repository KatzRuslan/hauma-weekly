import { TestBed } from '@angular/core/testing';
import { SettingsComponent } from './settings.component';
describe('SettingsComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SettingsComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(SettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=settings.component.spec.js.map