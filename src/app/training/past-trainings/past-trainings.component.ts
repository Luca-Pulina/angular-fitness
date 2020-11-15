import { Subscription } from 'rxjs';
import { TrainingService } from './../training.service';
import { Exercise } from './../exercise.model';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = [
    'date',
    'name',
    'calories',
    'duration',
    'state'
  ];

  dataSource = new MatTableDataSource<Exercise>();
  private exChangedSubscription : Subscription;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private trainingService:TrainingService) { }

  ngOnInit(): void {
    this.exChangedSubscription = this.trainingService.endExercisesChange.subscribe((exercises: Exercise[]) => {
      this.dataSource.data = exercises;
    });
    this.trainingService.getCompletedOrCanceledExercise();
  }

  ngAfterViewInit():void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.exChangedSubscription.unsubscribe()
  }

}
