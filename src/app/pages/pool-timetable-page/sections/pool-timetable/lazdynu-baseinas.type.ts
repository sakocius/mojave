export enum LaneState {
  PUBLIC = 'public',
  DIVING = 'diving',
  CLUB = 'club',
  CLUB_DIVING = 'club_diving',
  CLUB_WATERPOLO = 'club_waterpolo',
  RENTAL = 'rental',
  DISABLED = 'disabled',
  PENTATHLON = 'pentathlon',
  TRAINER = 'trainer',
  CLOSED = 'closed',
}

export enum PoolType {
  HALF = 'half',
  // FULL = 'full',
}

export enum DayOfWeek {
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
  SATURDAY = 'saturday',
  SUNDAY = 'sunday',
}

export enum TimeRangeGroup {
  BEFORE_LUNCH = '06:00-11:45',
  AFTERNOON = '12:00-17:45',
  EVENING = '18:00-22:00'
}
