import { TestBed } from '@angular/core/testing';
import { ArticleDialogComponent } from './article-dialog.component';
describe('ArticleDialogComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ArticleDialogComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ArticleDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=article-dialog.component.spec.js.map