import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AssetListComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
  }

  onAddAsset() {
    this.router.navigate(['/add-asset']);

  }

}
