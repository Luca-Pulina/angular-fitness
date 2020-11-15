import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, throwError  } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { Exercise } from './exercise.model';

@Injectable()
export class TrainingService {

    constructor(private http: HttpClient) { }

    exerciseChange= new Subject<Exercise>();
    exercisesChange= new Subject<Exercise[]>();
    endExercisesChange= new Subject<Exercise[]>();

    private availableExercises: Exercise[] = [];
    private runningExercise: Exercise;
    private endExercises: Exercise[] = [];


    getAvaialableExercises(): void{
        this.http
        .get<Exercise[]> ('http://localhost:3000/available-exercises')
        .subscribe(exercises => {
            console.log('ex', exercises)
            this.availableExercises = exercises;
            this.exercisesChange.next([...this.availableExercises])
        });
    }



    startExercise(selectedId: string) {
        this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
        this.exerciseChange.next({...this.runningExercise});
    }

    getRunningExercise() {
        return {...this.runningExercise};
    }


    completeExercise() {
        this.addDataToDatabase(
            {...this.runningExercise,
                date: new Date(),
                state: 'completed'}
            );
        this.runningExercise = null;
        this.exerciseChange.next(null);
    }

    cancelExercise(progress: number) {
        this.addDataToDatabase(
            {...this.runningExercise,
                id: `${this.runningExercise.id} - ${new Date()}`,
                duration: this.runningExercise?.duration * (progress /100),
                calories: this.runningExercise.duration * (progress /100),
                date: new Date(),
                state: 'cancelled'}
            );
        this.runningExercise = null;
        this.exerciseChange.next(null);
    }

    getCompletedOrCanceledExercise() {
        //return [...this.exercises];
        this.http
        .get<Exercise[]> ('http://localhost:3000/end-exercises')
        .subscribe((exercises: Exercise[]) => {
            this.endExercises = exercises;
            this.endExercisesChange.next(exercises);
        })
    }

    private addDataToDatabase (exercise: Exercise) {
        this.http.post<any>('http://localhost:3000/end-exercises', exercise).subscribe(data => {
            console.log(data)
        })
    }

}