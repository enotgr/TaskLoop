import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserPermissionEnum } from '../../enums/user-permission.enum';
import { User } from '../../interfaces/user.interface';
import { UserProfileService } from '../../services/user-profile.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  public userInfo$: Observable<User>;
  public userPermissionEnum = UserPermissionEnum;

  constructor(private readonly userProfileService: UserProfileService) {}

  public ngOnInit(): void {
    this.userInfo$ = this.userProfileService.getUserInfo();
    this.userInfo$.subscribe((user: User) => {
      console.log(user);
    });
  }
}
