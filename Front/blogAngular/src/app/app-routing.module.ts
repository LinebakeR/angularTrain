import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogpostListComponent } from './blogpost-list/blogpost-list.component';
import { BlogpostComponent } from './blogpost/blogpost.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
	{ path: '', component: BlogpostListComponent },
	{ path: 'theblog/:id', component: BlogpostComponent },
	{ path: 'admin', component: AdminComponent },
	{ path: '**', component: ErrorPageComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
