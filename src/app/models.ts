export interface Person {
  id: string;
  fullName: string;
  doors?: string[];
}

export interface Door {
  id: string;
  name: string;
  users?: string[];
}

export interface AccessData {
  userId: string;
  doorId: string;
}

export enum AccessDataKey {
  userId = 'userId',
  doorId = 'doorId'
}
