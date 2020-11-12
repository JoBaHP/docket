/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from '@angular/core/testing';

import { ErrorHandlingService } from './error-handling.service';
import { StatusBarService } from '../../status-bar/status-bar.service';

describe('Service: ErrorHandling', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorHandlingService]
    });
  });

  it(
    'should ...',
    inject([ErrorHandlingService], (service: ErrorHandlingService) => {
      expect(service).toBeTruthy();
    })
  );
});
