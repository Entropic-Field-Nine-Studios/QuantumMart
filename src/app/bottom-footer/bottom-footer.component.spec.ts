import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomFooterComponent } from './bottom-footer.component';
import { provideRouter } from '@angular/router';

describe('BottomFooterComponent', () => {
  let component: BottomFooterComponent;
  let fixture: ComponentFixture<BottomFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomFooterComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(BottomFooterComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
