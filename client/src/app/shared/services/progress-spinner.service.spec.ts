/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProgressSpinnerService } from './progress-spinner.service';

describe('Service: ProgressSpinner', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProgressSpinnerService]
    });
  });

  it('should ...', inject([ProgressSpinnerService], (service: ProgressSpinnerService) => {
    expect(service).toBeTruthy();
  }));
});
