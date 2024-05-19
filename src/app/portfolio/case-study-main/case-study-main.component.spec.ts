import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseStudyMainComponent } from './case-study-main.component';

describe('CaseStudyMainComponent', () => {
  let component: CaseStudyMainComponent;
  let fixture: ComponentFixture<CaseStudyMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseStudyMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaseStudyMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
