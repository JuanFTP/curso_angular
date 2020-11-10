import { Component } from '@angular/core';
import { User } from './models/user';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html'
})

export class AppComponent {
	title = 'MUSIFY';
	user: User;
	identity;
	token;

	constructor(){
		this.user = new User('', '', '', '', '', '');
	}
}