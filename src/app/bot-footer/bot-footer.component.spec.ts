import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotFooterComponent } from './bot-footer.component';
import { provideRouter } from '@angular/router';

describe('BotFooterComponent', () => {
  let component: BotFooterComponent;
  let fixture: ComponentFixture<BotFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotFooterComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(BotFooterComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
