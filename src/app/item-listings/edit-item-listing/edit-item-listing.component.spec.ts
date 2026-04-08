import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditItemListingComponent } from './edit-item-listing.component';
import { provideRouter } from '@angular/router';
import { NotFoundComponent } from '../../not-found/not-found.component';

describe('EditItemListingComponent', () => {
  let component: EditItemListingComponent;
  let fixture: ComponentFixture<EditItemListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditItemListingComponent],
      providers: [provideRouter([{ path: '404', component: NotFoundComponent }])],
    }).compileComponents();

    fixture = TestBed.createComponent(EditItemListingComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
