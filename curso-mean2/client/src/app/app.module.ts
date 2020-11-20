import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { UserEditComponent } from './components/user-edit.component';
import { appRoutingProviders, routing } from './app.routing';
import { ArtistListComponent } from './components/artist-list.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home.component';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		UserEditComponent,
		ArtistListComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule,
		HttpClientModule,
		routing
	],
	providers: [appRoutingProviders],
	bootstrap: [AppComponent]
})
export class AppModule { }