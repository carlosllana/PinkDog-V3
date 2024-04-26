import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicescarouselComponent } from './servicescarousel.component';

describe('ServicescarouselComponent', () => {
  let component: ServicescarouselComponent;
  let fixture: ComponentFixture<ServicescarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicescarouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicescarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
