import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationSchedulingComponent } from './notification-scheduling.component';

describe('NotificationSchedulingComponent', () => {
  let component: NotificationSchedulingComponent;
  let fixture: ComponentFixture<NotificationSchedulingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationSchedulingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationSchedulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
