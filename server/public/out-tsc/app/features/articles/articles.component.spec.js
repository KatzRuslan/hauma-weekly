import { TestBed } from '@angular/core/testing';
import { ArticlesComponent } from './articles.component';
describe('ArticlesComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ArticlesComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ArticlesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=articles.component.spec.js.map