import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './models/user';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	providers: [UserService]
})

export class AppComponent implements OnInit {
	public title = 'MusicFy!';
	public user: User;
	public user_register: User;
	public identity;
	public token;
	public errorMessage;

	public constructor(
		private _userService:UserService
	){
		this.user = new User('', '', '', '', '', 'ROLE_USER', '');
		this.user_register = new User('', '', '', '', '', 'ROLE_USER', '');
	}

	public ngOnInit() {
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
	}

	public onSubmit() {
		// Conseguir los datos del usuario identificado
		this._userService.signup(this.user, null).subscribe(
			(res : any) => {
				let identity = res.user;
				this.identity = identity;

				if(!this.identity._id) {
					this.errorMessage = "El usuario no está correctamente logueado";
				} else {
					// Crear sesión en el LocalStorage para tener al usuario en sesión
					localStorage.setItem('identity', JSON.stringify(identity));

					// Conseguir el token para enviarselo a cada petición HTTP
					this._userService.signup(this.user, 'true').subscribe(
						(res : any) => {
							let token = res.token;
							this.token = token;

							if(this.token.length <= 0) {
								this.errorMessage = "El token no se ha generado";
							} else {
								// Crear sesión en el LocalStorage para tener al usuario en sesión
								localStorage.setItem('token', token);

								// Conseguir el token para enviarselo a cada petición HTTP
								/*console.log(token);
								console.log(identity);*/
							}
						},
						(err : any) => {
							var errorMessage = <any>err;
							
							if(errorMessage != null) {
								this.errorMessage = err.error.message;
							}
						}
					);
				}
			},
			(err : any) => {
				var errorMessage = <any>err;
				
				if(errorMessage != null) {
					this.errorMessage = err.error.message;
				}
			}
		);
	}

	public logout() {
		localStorage.removeItem('identity');
		localStorage.removeItem('token');
		localStorage.clear();
		this.identity = null;
		this.token = null;
	}

	public onSubmitRegister() {
		console.log(this.user_register);
	}
}