import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable, switchMap } from "rxjs";
import { JournalService } from "./journal.service";
import { IDonneesBrutesFormulaireSimulateur } from "anssi-nis2-ui/src/Domaine/Simulateur/DonneesFormulaire";
import { SegmentsConcernesNis2 } from "./entites/segments-concernes-nis2.entite-journal";

@Injectable()
export class JournalIntercepteur
  implements
    NestInterceptor<
      IDonneesBrutesFormulaireSimulateur,
      SegmentsConcernesNis2[]
    >
{
  @Inject(JournalService)
  private readonly journalService: JournalService;

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<SegmentsConcernesNis2[]> {
    return next.handle().pipe(
      switchMap(async (d) => {
        await this.journalService.trace(d);
        return d;
      }),
    );
  }
}
