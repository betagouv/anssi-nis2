import { Inject, Injectable } from '@nestjs/common';
import {
  SimulateurDepot,
  SimulateurDepotToken,
  SimulateurFormData,
} from './Domaine/simulateur';

@Injectable()
export class SimulateurService {
  constructor(
    @Inject(SimulateurDepotToken)
    private readonly simulateurDepot: SimulateurDepot,
  ) {}

  async processData(formData: SimulateurFormData) {
    this.simulateurDepot.save(formData);
    console.info(formData);
    return 'OK';
  }
}
