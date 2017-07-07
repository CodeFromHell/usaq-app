import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const user = [
       {username :  "Alex" , password : "1234" },
       {username :  "Ramon" , password : "4321" }
    ];
    return {user};
  }
}
