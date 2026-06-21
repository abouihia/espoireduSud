import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MadrassaComponent } from './madrassa.component';

describe('MadrassaComponent', () => {
  let component: MadrassaComponent;
  let fixture: ComponentFixture<MadrassaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MadrassaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MadrassaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
