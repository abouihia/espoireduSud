import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ActualiteComponent } from './actualite.component';

describe('ActualiteComponent', () => {
  let component: ActualiteComponent;
  let fixture: ComponentFixture<ActualiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActualiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualiteComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should initialize countdown target date and faq items', () => {
    fixture.detectChanges();
    expect(component.targetDate).toBeDefined();
    expect(component.faqItems.length).toBeGreaterThan(0);
    expect(component.faqItems[0].isOpen).toBeFalse();
  });

  it('should toggle FAQ item open state', () => {
    fixture.detectChanges();
    expect(component.faqItems[0].isOpen).toBeFalse();
    component.toggleFaq(0);
    expect(component.faqItems[0].isOpen).toBeTrue();
    component.toggleFaq(0);
    expect(component.faqItems[0].isOpen).toBeFalse();
  });

  it('should calculate countdown correctly', fakeAsync(() => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 10);
    component.targetDate = futureDate;

    fixture.detectChanges(); // triggers ngOnInit, starts timer
    tick(1000);

    expect(component.days).toBeGreaterThanOrEqual(9);
    component.ngOnDestroy();
  }));

  it('should render campaign header and countdown elements', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.hero-block h1')?.textContent).toContain('Votre Voix au Maroc');
    expect(compiled.querySelector('.countdown-widget')).toBeTruthy();
    expect(compiled.querySelectorAll('.argument-card').length).toBe(3);
    expect(compiled.querySelectorAll('.step-block').length).toBe(2);
    expect(compiled.querySelectorAll('.faq-item').length).toBe(4);
  });
});
