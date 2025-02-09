import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwipeHomeComponent } from './swipe-home.component';

describe('SwipeHomeComponent', () => {
  let component: SwipeHomeComponent;
  let fixture: ComponentFixture<SwipeHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SwipeHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwipeHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
