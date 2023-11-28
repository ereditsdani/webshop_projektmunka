import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

export const authGuard: CanActivateFn = (route, state) => {
  let loggedInUserDTO;
  const loggedInUserString = localStorage.getItem('loggedInUser');
  if (loggedInUserString !== null) {
    loggedInUserDTO = JSON.parse(JSON.parse(loggedInUserString));
  }
  console.log(loggedInUserDTO);
  if (loggedInUserDTO == undefined) {
    return inject(Router).createUrlTree(['home']);
  }
  if (loggedInUserDTO.admin == true) {
    return true;
  } else {
    inject(MessageService).add({
      severity: 'error',
      summary: 'Hiba',
      detail: 'Nincs jogosultságod!',
    });
    return inject(Router).createUrlTree(['home']);
  }
};
