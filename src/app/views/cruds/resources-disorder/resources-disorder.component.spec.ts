import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesDisorderComponent } from './resources-disorder.component';

describe('ResourcesDisorderComponent', () => {
  let component: ResourcesDisorderComponent;
  let fixture: ComponentFixture<ResourcesDisorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourcesDisorderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourcesDisorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
