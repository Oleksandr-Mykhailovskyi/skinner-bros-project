import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {OrderStatus} from '../../enums/order-status';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-template-model',
  imports: [
    ReactiveFormsModule,
    MatDialogTitle,
    NgForOf,
    NgIf
  ],
  templateUrl: './template-model.html',
  styleUrl: './template-model.scss',
  standalone: true
})
export class TemplateModel implements OnInit {
  isEditMode = false;
  bolForm!: FormGroup;
  orderStatuses = [
    { label: 'New', value: OrderStatus.NEW },
    { label: 'Ready', value: OrderStatus.READY },
    { label: 'Reject', value: OrderStatus.REJECT },
    { label: 'Pending', value: OrderStatus.PENDING },
    { label: 'Completed', value: OrderStatus.COMPLETED }
  ];

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<TemplateModel>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    this.bolForm = this.fb.group({
      id: [''],
      documentId: [''],
      bol_id: [null, []],
      job_id: [''],
      bol_number: [''],
      shipper_name: [''],
      shipper_address: [''],
      consignee_name: [''],
      consignee_address: [''],
      pickup_date: [''],
      delivery_date: [''],
      cargo_description: [''],
      quality: [''],
      weight: [''],
      special_instructions: [''],
      creator: [''],
      creation_place: [''],
      order_status: [OrderStatus.NEW]
    });

    if (this.data) {
      this.isEditMode = true;
      this.bolForm.patchValue(this.data);
    }
  }

  onSubmit() {
    if (this.bolForm.invalid) {
      this.bolForm.markAllAsTouched();
      return;
    }

    this.dialogRef.close(this.bolForm.value);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

