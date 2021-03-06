import { TrainingService } from './../training.service';
import { Component, OnDestroy, OnInit} from '@angular/core';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Observable, Subscription} from 'rxjs';




@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  exercises: Exercise[];
  exerciseSubscription: Subscription;
  
  constructor(private trainingService: TrainingService) { }
  

  ngOnInit(): void {
   this.exerciseSubscription = this.trainingService.exercisesChange.subscribe( exercises => this.exercises = exercises);
   this.trainingService.getAvaialableExercises();
  }

  ngOnDestroy(): void {
    this.exerciseSubscription.unsubscribe();
  }

  onStartTraining(form: NgForm) {
   this.trainingService.startExercise(form.value.exercise);
  }


}
