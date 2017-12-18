import { Role } from './role';

export class User {
    uid: number;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    role: string; // admin or user
  }