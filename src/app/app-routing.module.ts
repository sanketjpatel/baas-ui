import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetListComponent } from './asset-list/asset-list.component';
import {AddAssetComponent} from './add-asset/add-asset.component';
import {AssetDetailsComponent} from './asset-details/asset-details.component';
import {LoginComponent} from './login/login.component';
import {AdvancedComponent} from './advanced/advanced.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'advanced', component: AdvancedComponent },
  { path: 'assets', component: AssetListComponent },
  { path: 'add-asset', component: AddAssetComponent },
  { path: 'asset-details', component: AssetDetailsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
