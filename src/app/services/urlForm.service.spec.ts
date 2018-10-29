import { TestBed } from '@angular/core/testing';

import { UrlFormService } from './urlForm.service';

describe('UrlFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UrlFormService = TestBed.get(UrlFormService);
    expect(service).toBeTruthy();
  });
});
