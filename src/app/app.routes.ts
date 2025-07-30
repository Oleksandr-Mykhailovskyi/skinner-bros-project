import { Routes } from '@angular/router';
import {Scheduler} from './components/scheduler/scheduler';
import {TemplateComponent} from './components/template/template-component';

export const routes: Routes = [{
  path: 'scheduler',
  component: Scheduler
}, {
  path: 'template',
  component: TemplateComponent
}];
