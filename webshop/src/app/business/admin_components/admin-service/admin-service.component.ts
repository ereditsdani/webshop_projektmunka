import { Component } from '@angular/core';
import { SzervizService } from '../../services/szerviz.service';
import { Szerviz } from '../../Models/Szerviz';
import { Observable } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-admin-service',
  templateUrl: './admin-service.component.html',
  styleUrls: ['./admin-service.component.scss'],
})
export class AdminServiceComponent {
  services$: Observable<Szerviz[]> = new Observable<Szerviz[]>();
  services: Szerviz[] = [];
  notSolvedServices: Szerviz[] = [];
  solvedServices: Szerviz[] = [];
  selectedServices: Szerviz[] = [];

  constructor(
    private szervizService: SzervizService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.szervizService.getServicesFromDb();
    this.services$ = this.szervizService.services$;
    this.szervizService.services$.subscribe((x) => {
      this.services = x;
      this.notSolvedServices = this.services.filter((x) => x.solved == false);
      this.solvedServices = this.services.filter((x) => x.solved == true);
    });
  }

  solveSelectedService() {
    this.szervizService.solveService(this.selectedServices);
    this.selectedServices = [];
    this.messageService.add({
      severity: 'success',
      summary: 'Siker',
      detail: 'Hibajegy lezárva!',
    });
  }
}
