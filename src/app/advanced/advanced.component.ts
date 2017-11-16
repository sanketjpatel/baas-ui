import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-advanced',
  templateUrl: './advanced.component.html',
  styleUrls: ['./advanced.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdvancedComponent implements OnInit {

  blockIds: any;
  displayData: any;
  constructor() { }
  ngOnInit() {
    this.blockIds = ['95cf87c805b840442a0f62cfc60a9aa8155a982d521202a515c186fad9c3cd52', '4595cf87c805b840442a0f62cfc60a9aa8155a982d521202a515c186fad9c3cd526', '7895cf87c805b840442a0f62cfc60a9aa8155a982d521202a515c186fad9c3cd529'];
    this.displayData = {
      id: 123,
      name: 'NAME'
    };
  }

  getBlockData() {

  }
  getBlock(id) {
    this.displayData = {
      id: 123,
      name: 'NAME'
    };
  }

}
