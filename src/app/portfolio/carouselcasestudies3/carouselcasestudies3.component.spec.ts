import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Carouselcasestudies3Component } from './carouselcasestudies3.component';

describe('Carouselcasestudies3Component', () => {
  let component: Carouselcasestudies3Component;
  let fixture: ComponentFixture<Carouselcasestudies3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Carouselcasestudies3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Carouselcasestudies3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
