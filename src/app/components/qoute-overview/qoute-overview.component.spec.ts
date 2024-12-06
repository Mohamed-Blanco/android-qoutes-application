import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QouteOverviewComponent } from './qoute-overview.component';

describe('QouteOverviewComponent', () => {
  let component: QouteOverviewComponent;
  let fixture: ComponentFixture<QouteOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QouteOverviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QouteOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
