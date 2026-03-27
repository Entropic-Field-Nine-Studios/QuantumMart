import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopHeaderComponent } from './top-header.component';

describe('TopHeaderComponent', () => {
  let component: TopHeaderComponent;
  let fixture: ComponentFixture<TopHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopHeaderComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
