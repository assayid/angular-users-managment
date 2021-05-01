import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../services/users.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {User} from '../../models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  context: any;

  constructor(private service: UsersService,
              private router: Router,
              private spinner: NgxSpinnerService) {
    this.service.conrext.asObservable().subscribe((context: any) => {
      this.context = context;
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers = () => {
    this.spinner.show();
    this.service.users().subscribe((users: User[]) => {
      console.log(users);
      this.users = users;
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
    });
  };
  goedit = (user: User) => {
    this.service.user.next(user);
    this.router.navigate(['/users-detais']);
  };
  logout = () => {
    this.service.logout();
    this.router.navigate(['login']);
  };
}
