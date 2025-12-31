import { Routes } from '@angular/router';
import { Home } from './home/home';
import { PoolTimetablePage } from './pages/pool-timetable-page/pool-timetable-page';

export const routes: Routes = [
  { path: 'pool-timetable', component: PoolTimetablePage },
  { path: '', component: Home },
  { path: '**', redirectTo: '' }
];
