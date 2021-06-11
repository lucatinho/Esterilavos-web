import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { VariablesService } from 'src/app/variables/variables.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  role:string="";

  constructor(
    private localStorage: LocalStorageService,
    private router: Router,
    private variables: VariablesService
  ) { }

  ngOnInit(): void {
    this.role = this.variables.getSessao().role
    console.log("role:", this.role)
  }

  sair(): void {

    this.router.navigate(['/']);
    location.reload()
    this.localStorage.clear();
      
    /* this.load(); */
      
  }

}
