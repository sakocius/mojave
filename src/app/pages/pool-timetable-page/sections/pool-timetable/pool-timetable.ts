import { Component, computed, signal } from '@angular/core';
import { DayOfWeek, LaneState, PoolType, TimeRangeGroup } from './lazdynu-baseinas.type';
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
  timeRangeOptions = Object.values(TimeRangeGroup);

  selectedPoolType = signal(PoolType.HALF);
  selectedDay = signal(getCurrentDayOfWeek());
  selectedTimeRange = signal(getCurrentTimeRange());

  currentData = computed(() => {
    const data = this.timetableData();
    const poolType = this.selectedPoolType();
    const day = this.selectedDay();
    const timeRange = this.selectedTimeRange();

    const halfPoolData = Object.entries(data[PoolType.HALF][day])
      .filter((time) => isWithinTimeRange(timeRange, time[0]))
      .map(([time, lanes]) => ({
        time: time,
        lanes: Object.entries(lanes),
      }));

    const fullPoolData = Object.entries(data[PoolType.FULL][day])
      .filter((time) => isWithinTimeRange(timeRange, time[0]))
      .map(([time, lanes]) => ({
        time: time,
        lanes: Object.entries(lanes),
      }));

    const parsedData = {
      [PoolType.HALF]: halfPoolData,
      [PoolType.FULL]: fullPoolData,
    };


    return parsedData;
  });
}

export const isWithinTimeRange = (selectedTimeRange: string, targetTimeRange: string): boolean => {
  const [selectedStartTime, selectedEndTime] = selectedTimeRange.split('-').map((t) => t.trim());
  const [targetStartTime, targetEndTime] = targetTimeRange.split('-').map((t) => t.trim());

  return (
    isAfterTime(targetStartTime, selectedStartTime) && isBeforeTime(targetEndTime, selectedEndTime)
  );
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

export const getCurrentSelection = () => {
  return {
    poolType: PoolType.HALF,
    dayOfWeek: getCurrentDayOfWeek(),
    timeRange: getCurrentTimeRange(),
  }
};

export const getCurrentDayOfWeek = (): DayOfWeek => {
  const now = new Date();
  const currentDay = now.getDay(); // 0 (Sunday) to 6 (Saturday)
  const dayOfWeekOptions = Object.values(DayOfWeek);
  return dayOfWeekOptions[(currentDay + 6) % 7] ?? DayOfWeek.MONDAY; // Adjusting so that Monday is 0
};

export const getCurrentTimeRange = (): string => {
  const now = new Date();
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();

  const match = Object.values(TimeRangeGroup).find((timeRange) => {
    const currentTime = `${String(currentHours).padStart(2, '0')}:${String(currentMinutes).padStart(2, '0')}`;
    const currentTimeRange = currentTime + '-' + currentTime;
    return isWithinTimeRange(
      timeRange,
      currentTimeRange
    );
  });

  return match ?? TimeRangeGroup.BEFORE_LUNCH; // Default time range
};
