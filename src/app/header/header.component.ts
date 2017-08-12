import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  navMenuCollapsed : boolean = true;
  constructor() { }

  ngOnInit() {
  }

  toggleNavMenu(){
    if (this.navMenuCollapsed){
      this.navMenuCollapsed = false;
      console.log("Navbar expanded");
    } else {
      this.navMenuCollapsed = true;
      console.log("Navbar collapsed");
    }
  }
}
