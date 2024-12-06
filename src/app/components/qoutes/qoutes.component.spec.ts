import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QoutesComponent } from './qoutes.component';

describe('QoutesComponent', () => {
  let component: QoutesComponent;
  let fixture: ComponentFixture<QoutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QoutesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
