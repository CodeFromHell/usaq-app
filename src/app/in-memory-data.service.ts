import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from '../model/entity/User';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const user = [
       {username :  "Alex" , password : "1234" }
    ];
    return {user};
  }
}
