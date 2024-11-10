import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeelingIAComponent } from './feeling-ia.component';

describe('FeelingIAComponent', () => {
  let component: FeelingIAComponent;
  let fixture: ComponentFixture<FeelingIAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeelingIAComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeelingIAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
