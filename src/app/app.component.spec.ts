import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let mockAuthService: any;
  let mockTranslateService: any;

  beforeEach(async () => {
    mockAuthService = {
      userData: null,
      SignOut: jasmine.createSpy('SignOut').and.returnValue(Promise.resolve())
    };

    mockTranslateService = {
      setDefaultLang: jasmine.createSpy('setDefaultLang'),
      use: jasmine.createSpy('use').and.returnValue(of(null))
    };

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: TranslateService, useValue: mockTranslateService }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Espoir du sud'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Espoir du sud');
  });

  it('should set showEidModal to true if not dismissed in localStorage', () => {
    localStorage.removeItem('eidModalDismissed_2026');
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.ngOnInit();
    expect(app.showEidModal).toBeTrue();
  });

  it('should set showEidModal to false and set dismissed in localStorage when closeEidModal is called', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.showEidModal = true;
    app.closeEidModal();
    expect(app.showEidModal).toBeFalse();
    expect(localStorage.getItem('eidModalDismissed_2026')).toEqual('true');
  });
});
