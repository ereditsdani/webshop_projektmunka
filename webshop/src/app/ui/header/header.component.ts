import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  activeButton: string = 'Főoldal';

  setActiveButton(buttonId: string, event: Event) {
    event.preventDefault(); // Prevent the default behavior (page refresh)

    this.activeButton = buttonId;
  }

}

