import { Component, computed, signal } from '@angular/core';
import { DayOfWeek, LaneState, PoolType } from './lazdynu-baseinas.type';
import { TIMETABLE_DATA } from './lazdynu-baseinas-data.const';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pool-timetable',
  imports: [CommonModule, FormsModule],
  templateUrl: './pool-timetable.html',
  styleUrl: './pool-timetable.scss',
})
export class PoolTimetable {
  timetableData = signal(TIMETABLE_DATA);

  LaneState = LaneState;
  PoolType = PoolType;
  DayOfWeek = DayOfWeek;

  poolTypeOptions = Object.values(PoolType);
  dayOfWeekOptions = Object.values(DayOfWeek);
  timeRangeOptions = ['06:00-11:45', '12:00-17:45', '18:00-22:00'];

  selectedPoolType = signal(PoolType.HALF);
  selectedDay = signal(DayOfWeek.MONDAY);
  selectedTimeRange = signal('06:00-11:45');

  currentData = computed(() => {
    const data = this.timetableData();
    const poolType = this.selectedPoolType();
    const day = this.selectedDay();
    const timeRange = this.selectedTimeRange();

    const parsedData = Object.entries(data[poolType][day])
      .filter((time) => isWithinTimeRange(timeRange, time[0]))
      .map(([time, lanes]) => ({
        time: time,
        lanes: Object.entries(lanes),
      }));
    return parsedData;
  });
}

export const isWithinTimeRange = (selectedTimeRange: string, targetTimeRange: string): boolean => {
  const [selectedStartTime, selectedEndTime] = selectedTimeRange.split('-').map((t) => t.trim());
  const [targetStartTime, targetEndTime] = targetTimeRange.split('-').map((t) => t.trim());

  return isAfterTime(targetStartTime, selectedStartTime) && isBeforeTime(targetEndTime, selectedEndTime);
};

export const isAfterTime = (currentTime: string, isAfterTime: string): boolean => {
  const [currentHours, currentMinutes] = currentTime.split(':').map((t) => parseInt(t, 10));
  const [afterHours, afterMinutes] = isAfterTime.split(':').map((t) => parseInt(t, 10));

  if (currentHours > afterHours) {
    return true;
  } else if (currentHours === afterHours && currentMinutes >= afterMinutes) {
    return true;
  }
  return false;
};

export const isBeforeTime = (currentTime: string, isBeforeTime: string): boolean => {
  const [currentHours, currentMinutes] = currentTime.split(':').map((t) => parseInt(t, 10));
  const [beforeHours, beforeMinutes] = isBeforeTime.split(':').map((t) => parseInt(t, 10));
  if (currentHours < beforeHours) {
    return true;
  } else if (currentHours === beforeHours && currentMinutes <= beforeMinutes) {
    return true;
  }
  return false;
};
