import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Carouselcasestudies2Component } from './carouselcasestudies2.component';

describe('Carouselcasestudies2Component', () => {
  let component: Carouselcasestudies2Component;
  let fixture: ComponentFixture<Carouselcasestudies2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Carouselcasestudies2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Carouselcasestudies2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
