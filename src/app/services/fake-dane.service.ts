import { InMemoryDbService } from 'angular-in-memory-web-api';
import {fakeWycieczki} from "../data/fake.dane";

export class FakeDanService implements InMemoryDbService {
  createDb() {
    return {data: fakeWycieczki};
  }
}
