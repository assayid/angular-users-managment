import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {UsersService} from '../../services/users.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: User;

  constructor(private  service: UsersService,
              private location: Location
  ) {
  }

  ngOnInit(): void {
    this.service.user.asObservable().subscribe(user => {
      if (!user) {
        this.back();
      }
      this.user = user;
    });
  }

  back = () => {
    this.location.back();
  };

}
