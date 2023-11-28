import { Component } from '@angular/core';
import { User } from '../../Models/User';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
})
export class ManageUsersComponent {
  users$: Observable<User[]> = new Observable<User[]>();
  users: User[] = [];
  selectedUsers: User[] = [];

  constructor(
    private userService: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.userService.getUsersFromDb();
    this.users$ = this.userService.users$;
    this.userService.users$.subscribe((x) => {
      this.users = x;
    });
  }

  deleteSelectedUser() {
    this.userService.deleteUser(this.selectedUsers);
    this.selectedUsers = [];
    this.messageService.add({
      severity: 'success',
      summary: 'Siker',
      detail: 'Felhasználó(k) törölve!',
    });
  }
  changeAdminStatus() {
    this.userService.changeAdminState(this.selectedUsers);
    this.selectedUsers = [];
    this.messageService.add({
      severity: 'success',
      summary: 'Siker',
      detail: 'Státusz(ok) megváltoztatva!',
    });
  }
}
