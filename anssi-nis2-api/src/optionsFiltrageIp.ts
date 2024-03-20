import { ConfigService} from "@nestjs/config";
import { Module, Injectable } from '@nestjs/common';

@Injectable()
export class ServiceFiltrageIp {
    listeBlanche(cfg: ConfigService): string[] {
        const plage: string | null = cfg.get("LISTE_BLANCHE_IP", null);
        return plage ? plage.split(";") : ["^.*"];
    }
}

@Module({
    providers: [ServiceFiltrageIp],
    exports: [ServiceFiltrageIp],
})
export class ModuleFiltrageIp {}


export const optionsFiltrageIp = {
    imports: [ModuleFiltrageIp],
    inject: [ServiceFiltrageIp, ConfigService],
    useFactory: async (service: ServiceFiltrageIp, cfg: ConfigService) => ({
        whitelist: service.listeBlanche(cfg),
    })
};