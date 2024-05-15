import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselcasestudiesComponent } from './carouselcasestudies.component';

describe('CarouselcasestudiesComponent', () => {
  let component: CarouselcasestudiesComponent;
  let fixture: ComponentFixture<CarouselcasestudiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselcasestudiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarouselcasestudiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
