import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollHomeComponent } from './scroll-home.component';

describe('ScrollHomeComponent', () => {
  let component: ScrollHomeComponent;
  let fixture: ComponentFixture<ScrollHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScrollHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScrollHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
