import { Component, OnInit } from '@angular/core';

import { UserService } from './../services/user.service';
import { User } from './../models/user';
import { GLOBAL } from '../services/global';

@Component({
	selector: 'user-edit',
	templateUrl: './../views/user-edit.html',
	providers: [UserService]
})

export class UserEditComponent implements OnInit {
	public title: string;
	public user: User;
	public identity: any;
	public token: any;
	public typeUpdateMessage: string = "alert-danger";
	public alertUpdate: string;
	public filesToUpload: Array<File>;
	public url: string = GLOBAL.url;
	
	public constructor(
		private _userSevice: UserService
	) {
		this.title = "Mi cuenta";
		// Obtiene los datos del LocalStorage
		this.identity = this._userSevice.getIdentity();
		this.token = this._userSevice.getToken();
		// Objeto User para actualizar los datos del usuario
		this.user = this.identity;
	}

	ngOnInit(): void {
		console.log("user-edit.component.ts cargado...");
	}

	public onSubmit() {
		this._userSevice.updateUser(this.user).subscribe(
			(res : any) => {
				if(!res.user) {
					this.alertUpdate = res.error.message;
					this.typeUpdateMessage = "alert-danger";
				} else {				
					localStorage.setItem('identity', JSON.stringify(this.user));
					document.getElementById('identity_name').innerHTML = this.user.name+" "+this.user.surname;

					if(!this.filesToUpload) {
						// Redirección o lo que sea
					} else {
						this.makeFileRequest(this.url+'/upload-image-user/'+this.user._id, [], this.filesToUpload)
						.then(
							(result : any) => {
								this.user.image = result.image;
								localStorage.setItem('identity', JSON.stringify(this.user));
							}
						);
					}

					this.alertUpdate = res.message;
					this.typeUpdateMessage = "alert-success";
				}
			},
			(err : any) => {
				var errorUpdateUser = <any>err;
				
				if(errorUpdateUser != null) {
					this.alertUpdate = err.error.message;
					this.typeUpdateMessage = "alert-danger";
				}
			}
		);
	}

	public fileChangeEvent(fileInput: any) {
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}

	public makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
		var token = this.token;

		return new Promise(function(resolve, reject) {
			var formData: any = new FormData();
			var xhr = new XMLHttpRequest();

			for(var i: any = 0; i < files.length; i++) {
				formData.append('image', files[i], files[i].name);
			}

			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4) {
					if(xhr.status == 200) {
						resolve(JSON.parse(xhr.response));
					} else {
						reject(xhr.response);
					}
				}
			}
			xhr.open('POST', url, true);
			xhr.setRequestHeader('Authorization', token);
			xhr.send(formData);
		});
	}
}