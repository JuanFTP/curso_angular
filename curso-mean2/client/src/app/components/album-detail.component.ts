import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from './../services/global';
import { UserService } from './../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { Album } from '../models/album';
import { AlbumService } from '../services/album.service';

@Component({
	selector: 'album-detail',
	templateUrl: './../views/album-detail.html',
	providers: [
		AuthenticationService,
		UserService,
		AlbumService
	]
})

export class AlbumDetailComponent implements OnInit {
	public title: string;
	public album: Album;
	public identity: any;
	public token: string;
	public url: string;
	public alertMessage: string;
	public typeMessage: string = "alert-danger";
	public listDescription: Array<String>;

	public constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _authenticationService: AuthenticationService,
		private _userService: UserService,
		private _albumService: AlbumService
	) {
		this.title = "Álbum";
		this.url = GLOBAL.url;
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();

		if(!this._authenticationService.isLogged(this.identity)) {
			this._router.navigate(['/home']);
		}
	}

	ngOnInit(): void {
		console.log("album-detail.component cargado...");

		// Obtener album de la base de datos
		this.getAlbum();
	}

	public getAlbum() {
		this._route.params.forEach((params: Params) => {
			let id = params['id'];

			this._albumService.getAlbum(this.token, id).subscribe(
				(res : any) => {
					if(!res.album) {
						this._router.navigate(['/home']);
					} else {
						this.album = res.album;
					}
				},
				(err : any) => {
					var errorResult = <any>err;

					if(errorResult != null) {
						this.alertMessage = err.error.message;
						this.typeMessage = "alert-danger";
					}
				}
			);
		});
	}
}