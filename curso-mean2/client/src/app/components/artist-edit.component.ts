import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from './../services/global';
import { UserService } from './../services/user.service';
import { Artist } from './../models/artist';
import { ArtistService } from '../services/artist.service';
import { stringify } from 'querystring';

@Component({
	selector: 'artist-edit',
	templateUrl: './../views/artist-add.html',
	providers: [
		UserService,
		ArtistService
	]
})

export class ArtistEditComponent implements OnInit {
	public title: string;
	public artist: Artist;
	public identity: any;
	public token: string;
	public url: string;
	public typeCreateMessage: string = "alert-danger";
	public alertCreateArtist: string;
	public is_edit: boolean;
	public legendButtonForm: string;
	
	ngOnInit(): void {
		console.log("artist-edit.component cargado...");
		
		// Llamar al método del API para sacar un artista con base en su ID getArtist
		this.getArtist();
	}

	public constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _artistService: ArtistService
	) {
		this.title = "Editar artista";
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
		this.is_edit = true;
		this.legendButtonForm = "Actualizar";
		this.artist = new Artist('', '', '', '');
	}

	public getArtist() {
		this._route.params.forEach((params: Params) => {
			let id = params['id'];
			this._artistService.getArtist(this.token, id).subscribe(
				(res : any ) => {
					if(!res.artist) {
						this.alertCreateArtist = res.message;
						this.typeCreateMessage = "alert-danger";
						this._router.navigate(['/']);
					} else {
						this.artist = res.artist;
					}
				},
				(err : any ) => {
					var errorAddArtist = <any>err;
					
					if(errorAddArtist != null) {
						this.alertCreateArtist = err.error.message;
						this.typeCreateMessage = "alert-danger";
					}
				}
			);
		});
	}

	public onSubmit() {
		this._route.params.forEach((params: Params) => {
			let id = params['id'];
			
			this._artistService.editArtist(this.token, id, this.artist).subscribe(
				(res : any) => {
					if(!res.artist) {
						this.alertCreateArtist = res.message;
						this.typeCreateMessage = "alert-danger";
					} else {
						this.alertCreateArtist = res.message;
						this.typeCreateMessage = "alert-info";
	
						// Redireccionar a edición del artista para terminar con la imagen
						//this._router.navigate(['/artist-edit', res.artist._id]);
					}
				},
				(err : any) => {
					var errorAddArtist = <any>err;
					
					if(errorAddArtist != null) {
						this.alertCreateArtist = err.error.message;
						this.typeCreateMessage = "alert-danger";
					}
				}
			);
		});
	}
}