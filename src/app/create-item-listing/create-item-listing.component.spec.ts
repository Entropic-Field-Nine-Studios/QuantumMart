import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { stub, SinonStub } from 'sinon';

import { CreateItemListingComponent } from './create-item-listing.component';
import { AuthService } from '../auth/auth.service';
import { ItemListingService } from '../item-listings/item-listing.service';

describe('CreateItemListingComponent', () => {
  let component: CreateItemListingComponent;

  let createListingStub: SinonStub;

  let authServiceMock: Pick<AuthService, 'isLoggedIn' | 'userId' | 'username'>;

  beforeEach(() => {
    createListingStub = stub();

    authServiceMock = {
      userId: 'seller123',
      username: 'testuser',
      get isLoggedIn() {
        return true;
      },
    };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        CreateItemListingComponent,
        { provide: ItemListingService, useValue: { createListing: createListingStub } },
        { provide: AuthService, useValue: authServiceMock },
      ],
    });

    component = TestBed.inject(CreateItemListingComponent);
  });

  it('initializes the form with empty values', () => {
    const form = component.createListingForm;

    expect(form.get('title')?.value).to.equal('');
    expect(form.get('description')?.value).to.equal('');
    expect(form.get('imageUrl')?.value).to.equal('');
    expect(form.get('price')?.value).to.equal('');
  });

  it('allows deactivation when form is not dirty', () => {
    expect(component.canDeactivate()).to.equal(true);
  });

  it('blocks deactivation when form is dirty and canLeave is false', () => {
    component.createListingForm.markAsDirty();
    expect(component.canDeactivate()).to.equal(false);
  });

  it('does not submit if form is invalid', () => {
    component.createListingForm.get('title')?.setValue('');
    component.createListingForm.markAsDirty();

    component.createListing();

    expect(createListingStub.called).to.equal(false);
  });

  it('does not submit if user is not logged in', () => {
    Object.defineProperty(authServiceMock, 'isLoggedIn', {
      get: () => false,
    });

    component.createListingForm.get('title')?.setValue('Test');

    component.createListing();

    expect(createListingStub.called).to.equal(false);
  });

  it('submits correct payload when form is valid', () => {
    createListingStub.returns(of({}));

    component.createListingForm.setValue({
      title: 'Test Title',
      description: 'Desc',
      imageUrl: 'img.jpg',
      price: '1,234',
    });

    component.createListing();

    const payload = createListingStub.firstCall.args[0];

    expect(payload).to.deep.equal({
      sellerId: 'seller123',
      title: 'Test Title',
      description: 'Desc',
      imageUrl: 'img.jpg',
      price: 1234,
      sellerUsername: 'testuser',
      isActive: true,
      quantitySold: 0,
    });
  });
});
