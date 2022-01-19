import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { Door } from "../models";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DoorService {

  private initDoors: Door[] = [
    {id: uuid(), name: 'Entrance'},
    {id: uuid(), name: 'Dining'},
    {id: uuid(), name: 'Accounting'},
    {id: uuid(), name: 'Developers'},
    {id: uuid(), name: 'QA\'s'},
    {id: uuid(), name: 'Project Managers'},
    {id: uuid(), name: 'Roof'},
  ]

  private doors$: BehaviorSubject<Door[]> = new BehaviorSubject<Door[]>(this.initDoors);

  constructor() { }

  get doors(): Observable<Door[]> {
    return this.doors$.asObservable();
  }

  public deleteDoor(doorId: string): void {
    this.doors$.next(this.doors$.getValue().filter(door => door.id !== doorId));
  }

  public addDoor(door: Door): void {
    this.initDoors.push(door);
    this.doors$.next(this.initDoors);
  }

  public updateDoor(door: Door): void {
    const initDoors = this.doors$.getValue();
    const index = initDoors.findIndex(initDoor => initDoor.id === door.id);
    initDoors[index] = door;
    this.doors$.next(initDoors);
  }

  public getDoorById(id: string): Door | undefined {
    return this.doors$.getValue().find(door => door.id === id);
  }
}
