import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WadaTelbaComponent } from './wada-telba.component';

describe('WadaTelbaComponent', () => {
  let component: WadaTelbaComponent;
  let fixture: ComponentFixture<WadaTelbaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WadaTelbaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WadaTelbaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
