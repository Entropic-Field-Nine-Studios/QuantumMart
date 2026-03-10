import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { SinonStub, stub } from 'sinon';

import { ConfirmDialogService } from './confirm-dialog.service';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

describe('ConfirmDialogService', () => {
  let service: ConfirmDialogService;
  let openStub: SinonStub;

  beforeEach(() => {
    openStub = stub();

    TestBed.configureTestingModule({
      providers: [
        ConfirmDialogService,
        {
          provide: MatDialog,
          useValue: { open: openStub },
        },
      ],
    });

    service = TestBed.inject(ConfirmDialogService);
  });

  it('should open the dialog with correct data', () => {
    const afterClosed$ = of(true);
    openStub.returns({ afterClosed: () => afterClosed$ });

    const result$ = service.confirm('Delete?', 'Confirm', 'Yes', 'No');

    result$.subscribe((value) => {
      expect(value).to.equal(true);
    });

    expect(openStub.calledOnce).to.equal(true);
    expect(openStub.firstCall.args[0]).to.equal(ConfirmDialogComponent);

    const config = openStub.firstCall.args[1];

    expect(config.data).to.deep.equal({
      title: 'Confirm',
      message: 'Delete?',
      confirm: 'Yes',
      cancel: 'No',
    });

    expect(config.width).to.equal('400px');
    expect(config.disableClose).to.equal(true);
  });
});
