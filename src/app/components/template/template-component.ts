import { Component, AfterViewInit, ViewChild } from '@angular/core'; // Импортируем AfterViewInit и ViewChild
import { CommonModule } from '@angular/common';

// Импортируем необходимые модули Material
import { MatTableModule, MatTableDataSource } from '@angular/material/table'; // Импортируем MatTableDataSource
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'; // Импортируем MatPaginator и его модуль

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

// Добавим больше данных, чтобы пагинация имела смысл
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
];

@Component({
  selector: 'app-data-grid-example',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule // <-- Добавляем модуль пагинатора в imports
  ],
  templateUrl: './template-component.html',
  styleUrls: ['./template-component.scss']
})
export class TemplateComponent implements AfterViewInit { // Реализуем AfterViewInit
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'actions'];

  // Используем MatTableDataSource, который поддерживает пагинацию
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  // Получаем ссылку на компонент пагинатора из шаблона
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // После инициализации представления связываем пагинатор с источником данных
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  handleButtonClick(element: PeriodicElement) {
    console.log(`Кнопка нажата для элемента: ${element.name}`);
    alert(`Вы выбрали элемент: ${element.name}`);
  }
}
