import { Body, Controller, Get, Post } from '@nestjs/common';
import { SimulateurFormData } from '../Domaine/simulateur';
import { SimulateurReponseService } from './simulateur-reponse.service';
import { SimulateurReponse } from './simulateur-reponse.entity';

@Controller('simulateur-reponse')
export class SimulateurReponseController {
  constructor(
    private readonly simulateurReponseService: SimulateurReponseService,
  ) {}

  @Post()
  async enregistreDonneesSimulateur(
    @Body() formData: SimulateurFormData,
  ): Promise<string> {
    return (await this.simulateurReponseService.save(formData)).reponseJson;
  }

  @Get()
  trouveTout(): Promise<SimulateurReponse[]> {
    return this.simulateurReponseService.trouveTout();
  }
}
