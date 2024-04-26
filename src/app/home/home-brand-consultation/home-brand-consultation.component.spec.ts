import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBrandConsultationComponent } from './home-brand-consultation.component';

describe('HomeBrandConsultationComponent', () => {
  let component: HomeBrandConsultationComponent;
  let fixture: ComponentFixture<HomeBrandConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeBrandConsultationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeBrandConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
