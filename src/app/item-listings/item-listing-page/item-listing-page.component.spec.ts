import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListingPageComponent } from './item-listing-page.component';
import { provideRouter } from '@angular/router';

describe('ItemListingPageComponent', () => {
  let component: ItemListingPageComponent;
  let fixture: ComponentFixture<ItemListingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemListingPageComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemListingPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
