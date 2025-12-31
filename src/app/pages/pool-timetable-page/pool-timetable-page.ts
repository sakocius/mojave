import { Component } from '@angular/core';
import { PoolTimetable } from "./sections/pool-timetable/pool-timetable";

@Component({
  selector: 'app-pool-timetable-page',
  imports: [PoolTimetable],
  templateUrl: './pool-timetable-page.html',
  styleUrl: './pool-timetable-page.scss',
})
export class PoolTimetablePage {

}
