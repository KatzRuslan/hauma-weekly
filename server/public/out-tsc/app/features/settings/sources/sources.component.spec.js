import { TestBed } from '@angular/core/testing';
import { SourcesComponent } from './sources.component';
describe('SourcesComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SourcesComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(SourcesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=sources.component.spec.js.map