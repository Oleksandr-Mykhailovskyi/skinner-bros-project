import { Component, ViewChild, AfterViewInit, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import {StrapiService} from '../../services/strapi-service';
import {MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle} from '@angular/material/expansion';
import {TemplateModel} from '../../forms/template-model/template-model';
import { MatDialog } from '@angular/material/dialog';
import {BillModel} from '../../interfaces/bill.model';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-data-grid-example',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatMenu,
    MatIcon,
    MatMenuItem,
    MatMenuTrigger
  ],
  templateUrl: './template-component.html',
  styleUrls: ['./template-component.scss']
})
export class TemplateComponent implements AfterViewInit, OnInit {
  ELEMENT_DATA: BillModel[] = [];
  dataSource = new MatTableDataSource<BillModel>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  allColumns: string[] = [
    'bol_id',
    'job_id',
    'bol_number',
    'shipper_name',
    'shipper_address',
    'consignee_name',
    'consignee_address',
    'pickup_date',
    'delivery_date',
    'cargo_description',
    'quality',
    'weight',
    'special_instructions',
    'creator',
    'creation_place',
    'order_status'
  ];

  displayedColumns: string[] = [
    'bol_number',
    'shipper_name',
    'consignee_name',
    'pickup_date',
    'delivery_date',
    'order_status',
    'actions'
  ];

  constructor(
    private readonly _strapiService: StrapiService,
    private readonly _changeDetection: ChangeDetectorRef,
    private readonly _dialog: MatDialog
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.loadData();
  }

  toggleColumn(column: string, event: MatCheckboxChange) {
    if (event.checked) {
      this.displayedColumns.splice(this.displayedColumns.length - 1, 0, column); // вставляем перед actions
    } else {
      this.displayedColumns = this.displayedColumns.filter(c => c !== column);
    }
  }

  exportToExcel() {
    const filteredData = this.dataSource.data.map(row => {
      const visibleFields: any = {};
      this.allColumns.forEach(c => {
        if (c !== 'actions') visibleFields[c] = (row as any)[c];
      });
      return visibleFields;
    });

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    saveAs(blob, 'bol_table_export.xlsx');
  }

  editRecord(element: any) {
    const dialogRef = this._dialog.open(TemplateModel, {
      width: '900px',
      data: element
    });

    // @ts-ignore
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._strapiService.putTask(result).subscribe({
          next: () => {
            this.loadData();
          }
        });
      }
    });
  }

  addRecord() {
    const dialogRef = this._dialog.open(TemplateModel, {
      width: '900px',
      data: null
    });

    // @ts-ignore
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._strapiService.postTask(result).subscribe({
          next: () => {
            this.loadData();
          }
        });
      }
    });
  }

  deleteRecord(element: BillModel) {
    const confirmed = window.confirm('Are you sure you want to delete this record?');
    if (confirmed) {
      this._strapiService.deleteTask(element).subscribe({
        next: () => {
          this.loadData();
        },
      });
    }
  }

  private loadData(): void {
    this._strapiService.getTasks().subscribe(value => {
      this.ELEMENT_DATA = value.data;
      this.dataSource = new MatTableDataSource<BillModel>(this.ELEMENT_DATA);
      this._changeDetection.detectChanges();
    });
  }
}
