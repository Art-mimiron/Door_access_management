import { Injectable } from '@angular/core';
import { AccessData, AccessDataKey, Door, Person } from "../models";

@Injectable({
  providedIn: 'root'
})
export class DoorAccessService {

  private accessData: AccessData[] = [];

  constructor() {
  }

  getAccessData(id: string | undefined, key: keyof AccessData): string[] {
    return this.accessData.reduce((arr: string[], data) => {
      if (data[key] === id) {
        arr.push(key === AccessDataKey.userId ? data.doorId : data.userId)
      }
      return arr;
    }, [])
  }

  updateAccess(newData: Person[] | Door[], itemId: string, itemKey: keyof AccessData): void {
    this.accessData = this.accessData.filter(data => data[itemKey] !== itemId);
    newData.forEach(data => {
      this.accessData.push({
        userId: itemKey === AccessDataKey.userId ?  itemId : data.id,
        doorId: itemKey === AccessDataKey.doorId ?  itemId : data.id
      })
    })
  }
}

