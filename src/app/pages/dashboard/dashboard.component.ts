import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ModalTaskComponent } from '../modal-task/modal-task.component';
import { ServiceService, TaskItem } from '../../service.service';
import { ModalEditComponent } from '../modaledit/modaledit.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tasks: TaskItem[] = [];
  assignedPersons: string[] = [];
  statusFilter: string = '';
  personFilter: string = '';

  constructor(private serviceService: ServiceService) {}

  ngOnInit() {
    this.fetchTasks();
  }

  fetchTasks() {
    this.serviceService.getTasks().subscribe(
      (data) => {
        this.tasks = data;
        this.assignedPersons = [...new Set(data.map(task => task.assignedPerson))]; // Extrae personas asignadas únicas
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  readonly dialog = inject(MatDialog);

  openDialog(): void {
    this.dialog.open(ModalTaskComponent, {
      width: 'fullscreen',
    }).afterClosed().subscribe();
  }

  updateTaskStatus(task: TaskItem, event: any) {
    const newStatus = (event.target as HTMLSelectElement).value;
    task.status = newStatus;
    this.serviceService.updateTask(task).subscribe(
      (updatedTask) => {
        console.log('Task status updated:', updatedTask);
      },
      (error) => {
        console.error('Error updating task status:', error);
      }
    );
  }

  openEditModal(task: TaskItem): void {
    const dialogRef = this.dialog.open(ModalEditComponent, {
      width: '600px',
      data: { task: { ...task } } 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchTasks();
      }
    });
  }

  deleteTask(taskId: number): void {
    this.serviceService.deleteTask(taskId).subscribe(
      (response) => {
        console.log('Task deleted successfully', response);
        this.fetchTasks();
      },
      (error) => {
        console.error('Error deleting task:', error);
      }
    );
  }

  onStatusFilterChange(event: any) {
    this.statusFilter = event.target.value;
    this.filterTasks();
  }

  onPersonFilterChange(event: any) {
    this.personFilter = event.target.value;
    this.filterTasks();
  }

  filterTasks() {
    this.serviceService.getFilteredTasks(this.statusFilter, this.personFilter).subscribe(
      (data) => {
        this.tasks = data;
      },
      (error) => {
        console.error('Error fetching filtered tasks:', error);
      }
    );
  }
}
