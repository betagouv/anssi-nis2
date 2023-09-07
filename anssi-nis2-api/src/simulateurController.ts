import { Body, Controller, Get, Post } from '@nestjs/common';
import { SimulateurService } from './simulateur.service';
import { SimulateurFormData } from './Domaine/simulateur';

@Controller('simulateur')
export class SimulateurController {
  constructor(private readonly simulateurService: SimulateurService) {}

  @Post()
  async sauvegarde(@Body() formData: SimulateurFormData): Promise<string> {
    return this.simulateurService.processData(formData);
  }

  @Get()
  alive(): string {
    return JSON.stringify({ alive: true });
  }
}
