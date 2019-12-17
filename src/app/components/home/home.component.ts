import { Component, OnInit } from '@angular/core';
import { ReqresService } from '../../services/reqres.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: any[] = [];
  config: any = {
    'page': 1,
    'per_page': 3,
    'total': 12,
    'total_pages': 4
  };
  loading: boolean;

  constructor( private reqresService: ReqresService, private router: Router ) {
    this.getUsers();
  }

  getUsers() {
    this.getUsersData();
  }

  setPage( page: number ) {
    this.getUsersData( page );
  }

  userDetails( id: number ) {
    this.router.navigate( ['user', id] );
  }

  getUsersData( page = null ) {
    this.loading = true;
    this.reqresService.getUsers( page )
      .subscribe( (res: any) => {
        this.users = res.data;

        if ( page ) {
          this.config.page = res.page;
          this.config.per_page = res.per_page;
          this.config.total = res.total;
          this.config.total_pages = res.total_pages;
        }

        this.loading = false;
      }, (err) => {
        console.log( err );
      });
  }

  ngOnInit() {
  }

}
