import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolTimetable } from './pool-timetable';

describe('PoolTimetable', () => {
  let component: PoolTimetable;
  let fixture: ComponentFixture<PoolTimetable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoolTimetable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoolTimetable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
