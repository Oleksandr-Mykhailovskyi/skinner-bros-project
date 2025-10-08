// components/app/components/scheduler/scheduler.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Обязательно для *ngIf, *ngFor, @switch и т.д.
import { CalendarEvent, CalendarModule, CalendarView } from 'angular-calendar'; // Импорты angular-calendar
import { startOfDay, endOfDay, addHours } from 'date-fns'; // Функции для работы с датами из date-fns
import { Subject } from 'rxjs';
import {TemplateModel} from '../../forms/template-model/template-model'; // Обязательно для свойства [refresh]

@Component({
  selector: 'app-scheduler', // Селектор, который вы используете в app.html
  standalone: true,
  imports: [
    CommonModule,   // Нужен для структурных директив в шаблоне
    CalendarModule
    // Если CalendarModule.forRoot(...) уже в app.config.ts, то здесь достаточно просто CalendarModule
    // Если нет, то здесь нужно было бы CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  templateUrl: './scheduler.html', // Путь к вашему HTML-шаблону компонента Scheduler
  styleUrl: './scheduler.scss'     // Путь к вашим стилям компонента Scheduler
})
export class Scheduler {
  title = 'Calendar'; // Заголовок, который будет отображаться в шаблоне Scheduler

  // Текущее представление календаря (по умолчанию - месяц)
  view: CalendarView = CalendarView.Month;

  // Делаем enum CalendarView доступным в шаблоне
  CalendarView = CalendarView;

  // Дата, которая будет центрировать календарь. По умолчанию - текущая дата.
  viewDate: Date = new Date();

  // Subject для обновления календаря (обязательно для [refresh])
  refresh: Subject<any> = new Subject();

  // Массив событий для отображения в календаре
  events: CalendarEvent[] = [
    {
      start: startOfDay(new Date()), // Начало текущего дня
      end: endOfDay(new Date()),     // Конец текущего дня
      title: 'Событие на сегодня (весь день)',
      color: { primary: '#AD2121', secondary: '#FAE3E3' }, // Красный
      allDay: true, // Событие на весь день
    },
    {
      start: addHours(startOfDay(new Date()), 10), // Сегодня + 10 часов
      end: addHours(startOfDay(new Date()), 12),  // Сегодня + 12 часов
      title: 'Встреча с клиентом',
      color: { primary: '#1E90FF', secondary: '#D1E8FF' }, // Синий
    },
    {
      start: startOfDay(new Date(2025, 6, 28)), // Например, 28 июля 2025 (завтра от 26 июля 2025)
      title: 'Срок сдачи проекта',
      color: { primary: '#E3BC08', secondary: '#FDF1BA' }, // Желтый
    },
    {
      start: addHours(startOfDay(new Date()), 14), // Пример события сегодня
      end: addHours(startOfDay(new Date()), 15),
      title: 'Урок программирования',
      color: { primary: '#228B22', secondary: '#DDFDD3' }, // Зеленый
    }
  ];

  // Метод, который вызывается при клике на день в календаре
  dayClicked(data: any): void {
    console.log('Кликнули на день:', data);
    console.log('События на этот день:', data);

    // Если вы хотите переключить на DayView при клике:
    // this.view = CalendarView.Day;
    // this.viewDate = date;
    // this.refresh.next(void 0);
  }

  // Метод для изменения текущего представления календаря (месяц/неделя/день)
  setView(view: CalendarView) {
    this.view = view;
    this.refresh.next(void 0); // Триггер для обновления календаря
  }
}
