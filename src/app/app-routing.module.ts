import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetListComponent } from './asset-list/asset-list.component';
import {AddAssetComponent} from './add-asset/add-asset.component';
import {AssetDetailsComponent} from './asset-details/asset-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/assets', pathMatch: 'full' },
  { path: 'assets', component: AssetListComponent },
  { path: 'add-asset', component: AddAssetComponent },
  { path: 'asset-details/:assetId', component: AssetDetailsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
