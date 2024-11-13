import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesBasicComponent } from './resources-basic.component';

describe('ResourcesBasicComponent', () => {
  let component: ResourcesBasicComponent;
  let fixture: ComponentFixture<ResourcesBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourcesBasicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourcesBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
