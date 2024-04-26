import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GcommentsComponent } from './gcomments.component';

describe('GcommentsComponent', () => {
  let component: GcommentsComponent;
  let fixture: ComponentFixture<GcommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GcommentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GcommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
