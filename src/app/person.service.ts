import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { Person } from './models';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private ids: string[] = [];
  private persons: {[personId: string]: Person} = {};

  public constructor() {
    this.addOne({
      id: uuid(),
      fullName: 'Maddy Ilean'
    });

    this.addOne({
      id: uuid(),
      fullName: 'Wilson Winston'
    });

    this.addOne({
      id: uuid(),
      fullName: 'Monica Annabeth'
    });

    this.addOne({
      id: uuid(),
      fullName: 'Doris Minerva'
    });
  }

  public listAll(): Person[] {
    return this.ids.map(id => this.persons[id]);
  }

  public getById(personId: string): Person | null {
    return this.persons[personId] ?? null;
  }

  public addOne(person: Person): Person {
    this.persons = {...this.persons};
    this.persons[person.id] = person;
    this.ids = this.ids.filter(id => id !== person.id);
    this.ids.push(person.id);
    return person;
  }

  public deleteOne(personId: string): Person | null {
    let person: Person | null = this.persons[personId] ?? null;
    if (person) {
      this.ids = this.ids.filter(id => id !== personId);
      delete this.persons[personId];
    }
    return person;
  }

  public patchOne(personId: string, changes: Partial<Person>): Person | null {
    let person: Person | null = this.persons[personId] ?? null;
    if (person) {
      person = {...person, ...changes, id: personId};
      this.persons[personId] = person
    }
    return person;
  }
}
