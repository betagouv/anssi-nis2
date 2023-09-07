import { SimulateurRepository, SimulateurFormData } from './Domaine/simulateur';

export class InMemorySimulateurDepot implements SimulateurRepository {
  save(data: SimulateurFormData): Promise<boolean> {
    return Promise.resolve(false);
  }
}

export class PostgreSimulateurDepot implements SimulateurRepository {
  save(data: SimulateurFormData): Promise<boolean> {
    return Promise.resolve(false);
  }
}
