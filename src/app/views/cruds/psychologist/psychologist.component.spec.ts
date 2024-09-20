import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsychologistComponent } from './psychologist.component';

describe('PsychologistComponent', () => {
  let component: PsychologistComponent;
  let fixture: ComponentFixture<PsychologistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PsychologistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PsychologistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
