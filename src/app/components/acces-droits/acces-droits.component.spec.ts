import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesDroitsComponent } from './acces-droits.component';

describe('AccesDroitsComponent', () => {
  let component: AccesDroitsComponent;
  let fixture: ComponentFixture<AccesDroitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccesDroitsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccesDroitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
