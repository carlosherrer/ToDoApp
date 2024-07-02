import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ServiceService } from '../../service.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-task',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './modal-task.component.html',
  styleUrls: ['./modal-task.component.css']
})
export class ModalTaskComponent {
  taskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private serviceService: ServiceService,
    private dialogRef: MatDialogRef<ModalTaskComponent>
  ) {
    this.taskForm = this.fb.group({
      taskName: ['', Validators.required],
      taskDescription: ['', Validators.required],
      status: ['', Validators.required],
      assignedPerson: ['', Validators.required]
    });
  }

  addTask() {
    console.log('Form submitted', this.taskForm.value);
    if (this.taskForm.valid) {
      this.serviceService.createTask(this.taskForm.value).subscribe(
        (response) => {
          console.log('Task added successfully', response);
          this.dialogRef.close(true);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
