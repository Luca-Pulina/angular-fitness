import { TrainingService } from './training.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  ongoingTraining: boolean = false;
  exerciseSubscription: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.exerciseSubscription = this.trainingService.exerciseChange.subscribe( exercise => {
      if (exercise) {
        this.ongoingTraining = true;
      } else {
        this.ongoingTraining = false;
      }
    });
  }

}
