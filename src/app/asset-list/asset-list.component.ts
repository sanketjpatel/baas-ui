import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { GlobalService} from '../shared/global-service';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AssetListComponent implements OnInit {

  displayedColumns = ['name', 'checkIn', 'dueDate', 'lat', 'long', 'sensorType', 'rangeError', 'details'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private globalService: GlobalService) {}

  ngOnInit() {
    this.dataSource.sort = this.sort;
    console.log(this.globalService.accountId);
  }

  onAddAsset() {
    return this.router.navigate(['/add-asset']);
  }
}


export interface Element {
  id: string;
  name: string;
  checkIn: string;
  dueDate: string;
  lat: string;
  long: string;
  sensorType: string;
  rangeError: string;
}

const ELEMENT_DATA: Element[] = [
  {id: '1', name: 'Container 3456', checkIn: 'Nov 14', dueDate: 'Nov 16', lat: '35.92',
    long: '-77.03', sensorType: 'Temperature', rangeError: 'Yes'},
  {id: '2', name: 'Container 3457', checkIn: 'Nov 14', dueDate: 'Nov 16', lat: '35.92',
    long: '-77.03', sensorType: 'Temperature', rangeError: 'Yes'}
];
