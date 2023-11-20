import { Component } from '@angular/core';
import { SzervizService } from '../../services/szerviz.service';
import { Szerviz } from '../../Models/Szerviz';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-service',
  templateUrl: './admin-service.component.html',
  styleUrls: ['./admin-service.component.scss'],
})
export class AdminServiceComponent {
  services$: Observable<Szerviz[]> = new Observable<Szerviz[]>();
  services: Szerviz[] = [];
  selectedServices: Szerviz[] = [];

  constructor(private szervizService: SzervizService) {}

  ngOnInit() {
    this.szervizService.getServicesFromDb();
    this.services$ = this.szervizService.services$;
    this.szervizService.services$.subscribe((x) => {
      this.services = x;
    });
  }

  solveSelectedService() {}
}
