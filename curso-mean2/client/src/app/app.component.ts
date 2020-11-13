import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './models/user';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	providers: [UserService]
})

export class AppComponent implements OnInit {
	public title = 'MUSIFY';
	public user: User;
	public identity;
	public token;
	public errorMessage;

	public constructor(
		private _userService:UserService
	){
		this.user = new User('', '', '', '', 'ROLE_USER', '');
	}

	public ngOnInit() {
	}

	public onSubmit() {
		// Conseguir los datos del usuario identificado
		this._userService.signup(this.user, null).subscribe(
			res => {
				let identity = res.user;
				this.identity = identity;

				if(!this.identity._id) {
					this.errorMessage = "El usuario no está correctamente logueado";
				} else {
					// Crear sesión en el LocalStorage para tener al usuario en sesión
					this._userService.signup(this.user, 'true').subscribe(
						res => {
							let token = res.token;
							this.token = token;

							if(this.token.length <= 0) {
								this.errorMessage = "El token no se ha generado";
							} else {
								// Conseguir el token para enviarselo a cada petición HTTP
								console.log(token);
								console.log(identity);
							}
						},
						err => {
							var errorMessage = <any>err;
							
							if(errorMessage != null) {
								this.errorMessage = err.error.message;
							}
						}
					);

					// Conseguir el token para enviarselo a cada petición HTTP
				}
			},
			err => {
				var errorMessage = <any>err;
				
				if(errorMessage != null) {
					this.errorMessage = err.error.message;
				}
			}
		);
	}
}