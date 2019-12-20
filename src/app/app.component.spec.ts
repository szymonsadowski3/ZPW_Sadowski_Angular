import { TestBed, async } from '@angular/core/testing';
import { AplikacjaWycieczkiComponent } from './aplikacja-wycieczki.component';

describe('AplikacjaWycieczkiComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AplikacjaWycieczkiComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AplikacjaWycieczkiComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'wycieczki'`, () => {
    const fixture = TestBed.createComponent(AplikacjaWycieczkiComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('wycieczki');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AplikacjaWycieczkiComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('wycieczki app is running!');
  });
});
