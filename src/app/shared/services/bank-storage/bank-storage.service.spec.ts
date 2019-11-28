import { TestBed } from '@angular/core/testing';

import { BankStorageService } from './bank-storage.service';

describe('BankStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BankStorageService = TestBed.get(BankStorageService);
    expect(service).toBeTruthy();
  });
});
