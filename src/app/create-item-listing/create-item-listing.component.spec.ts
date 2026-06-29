import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CreateItemListingComponent } from './create-item-listing.component';
import { HomeComponent } from '../home/home.component';
import { provideRouter } from '@angular/router';
import { CategoryService } from '../categories/category.service';

describe('CreateItemListingComponent', () => {
  let component: CreateItemListingComponent;
  let fixture: ComponentFixture<CreateItemListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateItemListingComponent],
      providers: [
        provideRouter([{ path: 'home', component: HomeComponent }]),
        { provide: CategoryService, useValue: { getActiveCategories: () => of([]) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateItemListingComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
