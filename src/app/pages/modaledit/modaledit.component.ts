import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from '../../service.service';

@Component({
  selector: 'app-modal-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modaledit.component.html',
  styleUrls: ['./modaledit.component.css']
})
export class ModalEditComponent {

  taskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalEditComponent>,
    //aqui hubo un error @Inject(MAT_DIALOG) public data: any,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private serviceService: ServiceService
  ) {
    this.taskForm = this.fb.group({
      taskName: [data.task.taskName, Validators.required],
      taskDescription: [data.task.taskDescription],
      status: [data.task.status, Validators.required],
      assignedPerson: [data.task.assignedPerson, Validators.required]
    });
  }

  updateTask() {
    const updatedTask = { ...this.data.task, ...this.taskForm.value };
    this.serviceService.updateTask(updatedTask).subscribe(
      (response) => {
        console.log('Task updated successfully', response);
        this.dialogRef.close(true);
      },
      (error) => {
        console.error('Error updating task:', error);
      }
    );
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
