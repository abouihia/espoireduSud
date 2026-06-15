import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventReadMoreComponent } from './event-read-more.component';

import { RouterTestingModule } from '@angular/router/testing';

describe('EventReadMoreComponent', () => {
  let component: EventReadMoreComponent;
  let fixture: ComponentFixture<EventReadMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventReadMoreComponent, RouterTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventReadMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
