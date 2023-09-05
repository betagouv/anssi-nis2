import { SimulateurDepot, SimulateurFormData } from './Domaine/simulateur';

export class InMemorySimulateurDepot implements SimulateurDepot {
  save(data: SimulateurFormData): Promise<boolean> {
    return Promise.resolve(false);
  }
}
