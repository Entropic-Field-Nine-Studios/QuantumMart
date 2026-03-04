import { TestBed } from '@angular/core/testing';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

describe('ConfirmDialog', () => {
  let service: ConfirmDialogComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmDialogComponent);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
