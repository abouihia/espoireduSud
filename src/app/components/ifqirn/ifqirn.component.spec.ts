import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IfqirnComponent } from './ifqirn.component';

describe('IfqirnComponent', () => {
  let component: IfqirnComponent;
  let fixture: ComponentFixture<IfqirnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IfqirnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IfqirnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
