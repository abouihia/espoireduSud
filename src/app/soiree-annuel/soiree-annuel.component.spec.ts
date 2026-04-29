import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoireeAnnuelComponent } from './soiree-annuel.component';

describe('SoireeAnnuelComponent', () => {
  let component: SoireeAnnuelComponent;
  let fixture: ComponentFixture<SoireeAnnuelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SoireeAnnuelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoireeAnnuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
