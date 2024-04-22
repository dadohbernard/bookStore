export class Customer {
  id: number = 0; 
  name: string;
  email: string;
  password: string;
  points: number;

  constructor(name: string, email: string, password: string, points: number = 0) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.points = points;
  }
}
