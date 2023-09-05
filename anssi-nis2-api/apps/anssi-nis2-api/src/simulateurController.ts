import { Body, Controller, Post } from '@nestjs/common';
import { SimulateurService } from './simulateur.service';
import { SimulateurFormData } from './Domaine/simulateur';

@Controller()
export class SimulateurController {
  constructor(private readonly simulateurService: SimulateurService) {}

  @Post()
  async processData(@Body() formData: SimulateurFormData): Promise<string> {
    return this.simulateurService.processData(formData);
  }
}
