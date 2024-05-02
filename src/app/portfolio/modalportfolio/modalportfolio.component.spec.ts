import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalportfolioComponent } from './modalportfolio.component';

describe('ModalportfolioComponent', () => {
  let component: ModalportfolioComponent;
  let fixture: ComponentFixture<ModalportfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalportfolioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalportfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
