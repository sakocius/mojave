import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolTimetablePage } from './pool-timetable-page';

describe('PoolTimetablePage', () => {
  let component: PoolTimetablePage;
  let fixture: ComponentFixture<PoolTimetablePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoolTimetablePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoolTimetablePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
