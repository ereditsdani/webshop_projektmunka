import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { jwtDecode } from 'jwt-decode';
import { User } from '../Models/User';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public users$: Observable<User[]> = new Observable<User[]>();
  private _users: BehaviorSubject<User[]>;

  private dataStore: {
    users: User[];
  };

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
    private router: Router
  ) {
    this.dataStore = { users: [] };
    this._users = new BehaviorSubject([]) as unknown as BehaviorSubject<User[]>;
    this.users$ = this._users.asObservable();
  }

  private readonly isLoggedInKey = 'isLoggedIn';

  getUsersFromDb() {
    const options = { withCredentials: true };
    this.http
      .get<User[]>('https://localhost:7054/api/Auth/GetUsers', options)
      .subscribe({
        next: (result: User[]) => {
          this.dataStore.users = result;
          this._users.next(Object.assign({}, this.dataStore).users);
          console.log(this.users$);
        },
        error: (error: any) => {
          console.log(error.message);
        },
      });
  }

  deleteUser(users: any) {
    let options = {
      headers: new HttpHeaders(),
      withCredentials: true,
      params: {},
    };
    const formData = new FormData();
    formData.append('userJson', JSON.stringify(users));
    console.log(formData.get('userJson'));

    return this.http
      .post('https://localhost:7054/api/Auth/DeleteUsers', formData, options)
      .subscribe({
        error: (error: any) => {
          console.log(error.message);
        },
        complete: () => {
          console.log('faxa');
          this.getUsersFromDb();
        },
      });
  }

  changeAdminState(users: any) {
    let options = {
      headers: new HttpHeaders(),
      withCredentials: true,
      params: {},
    };
    const formData = new FormData();
    formData.append('userJson', JSON.stringify(users));
    console.log(formData.get('userJson'));

    return this.http
      .post(
        'https://localhost:7054/api/Auth/ChangeAdminStateForUser',
        formData,
        options
      )
      .subscribe({
        error: (error: any) => {
          console.log(error.message);
        },
        complete: () => {
          console.log('faxa');
          this.getUsersFromDb();
        },
      });
  }

  changeUser(changedUser: any) {
    let options = {
      headers: new HttpHeaders(),
      withCredentials: true,
      params: {},
    };
    const formData = new FormData();
    formData.append('userJson', JSON.stringify(changedUser));
    console.log(formData.get('userJson'));
    return this.http
      .post('https://localhost:7054/api/Auth/EditUser', formData, options)
      .subscribe({
        complete: () => {
          this.getUsersFromDb();
          this.messageService.add({
            severity: 'success',
            summary: 'Siker',
            detail: 'Sikeres megváltoztatás!',
          });
        },
        error: (error: any) => {
          console.log(error.error);
          this.messageService.add({
            severity: 'error',
            summary: 'Hiba!',
            detail: error.error,
          });
        },
      });
  }

  registerUser(registerForm: any) {
    let options = {
      headers: new HttpHeaders(),
      withCredentials: true,
      params: {},
    };
    const formData = new FormData();
    formData.append('registerJson', JSON.stringify(registerForm));
    console.log(formData.get('registerJson'));
    return this.http
      .post('https://localhost:7054/api/Auth/Register', formData, options)
      .subscribe({
        complete: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Siker',
            detail: 'Sikeres regisztráció!',
          });
        },
        error: (error: any) => {
          console.log(error.error);
          this.messageService.add({
            severity: 'error',
            summary: 'Hiba!',
            detail: error.error,
          });
        },
      });
  }

  loginUser(username: any, password: any) {
    const headers = new HttpHeaders();
    const params = new HttpParams()
      .set('requestPassword', password)
      .set('requestUsername', username);

    const options = {
      headers: headers,
      withCredentials: true,
      params: params,
      responseType: 'text' as 'json',
    };

    this.http
      .post('https://localhost:7054/api/Auth/Login', '', options)
      .subscribe({
        next: (response) => {
          console.log('Response:', response);
          // const decoded = jwtDecode(response.toString());
          localStorage.setItem(this.isLoggedInKey, 'true');
          const userAsString = JSON.stringify(response);
          localStorage.setItem('loggedInUser', userAsString);
          this.router.navigate(['profile']);

          this.messageService.add({
            severity: 'success',
            summary: 'Siker',
            detail: 'Sikeres bejelentkezés',
          });
        },
        error: (error) => {
          console.error('Error:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Hiba!',
            detail: error.error,
          });
        },
      });
  }
}
