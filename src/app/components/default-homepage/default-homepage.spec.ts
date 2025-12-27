import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultHomepage } from './default-homepage';

describe('DefaultHomepage', () => {
  let component: DefaultHomepage;
  let fixture: ComponentFixture<DefaultHomepage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultHomepage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultHomepage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
