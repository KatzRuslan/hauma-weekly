import { TestBed } from '@angular/core/testing';
import { ExcelUploaderComponent } from './excel-uploader.component';
describe('ExcelUploaderComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ExcelUploaderComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ExcelUploaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=excel-uploader.component.spec.js.map