import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from './../services/global';
import { UserService } from './../services/user.service';
import { Artist } from './../models/artist';
import { ArtistService } from '../services/artist.service';

@Component({
	selector: 'artist-add',
	templateUrl: './../views/artist-add.html',
	providers: [
		UserService,
		ArtistService
	]
})

export class ArtistAddComponent implements OnInit {
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
		console.log("artist-add.component cargado...");
	}

	public constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _artistService: ArtistService
	) {
		this.title = "Agregar artista";
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
		this.artist = new Artist('', '', '', '');
		this.is_edit = false;
		this.legendButtonForm = "Agregar";
	}

	public onSubmit() {
		this._artistService.addArtist(this.token, this.artist).subscribe(
			(res : any) => {
				if(!res.artist) {
					this.alertCreateArtist = res.message;
					this.typeCreateMessage = "alert-danger";
				} else {
					this.alertCreateArtist = res.message;
					this.typeCreateMessage = "alert-info";
					this.artist = res.artist;

					// Redireccionar a edición del artista para terminar con la imagen
					this._router.navigate(['/edit-artist', res.artist._id]);
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
	}
}