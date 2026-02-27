import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemocratiesComponent } from './democraties.component';

describe('DemocratiesComponent', () => {
  let component: DemocratiesComponent;
  let fixture: ComponentFixture<DemocratiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DemocratiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemocratiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
