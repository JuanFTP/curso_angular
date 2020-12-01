import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from './../services/global';
import { UserService } from './../services/user.service';
import { Artist } from './../models/artist';
import { UploadService } from '../services/upload.service';
import { ArtistService } from '../services/artist.service';
import { AuthenticationService } from '../services/authentication.service';
import { Album } from '../models/album';

@Component({
	selector: 'artist-detail',
	templateUrl: './../views/artist-detail.html',
	providers: [
		AuthenticationService,
		UploadService,
		UserService,
		ArtistService
	]
})

export class ArtistDetailComponent implements OnInit {
	public title: string;
	public artist: Artist;
	public albums: Album;
	public identity: any;
	public token: string;
	public url: string;
	public filesToUpload: Array<File>;
	public alertMessage: string;
	public bannerArtist: any;
	public listDescription: Array<String>;

	public constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _authenticationService: AuthenticationService,
		private _userService: UserService,
		private _artistService: ArtistService
	) {
		this.title = "Artista";
		this.url = GLOBAL.url;
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.artist = new Artist('', '', '', '');

		if(!this._authenticationService.isLogged(this.identity)) {
			this._router.navigate(['/home']);
		}
	}

	ngOnInit(): void {
		console.log("artist-detail.component cargado...");
		// Llamar al método del API para sacar un artista con base en su ID getArtist
		this.getArtist();
	}

	public getArtist() {
		this._route.params.forEach((params: Params) => {
			let id = params['id'];
			this._artistService.getArtist(this.token, id).subscribe(
				(res : any ) => {
					if(!res.artist) {
						this.alertMessage = res.message;
						this._router.navigate(['/']);
					} else {
						this.artist = res.artist;
						this.title = this.artist.name;

						// Añadir imagen al artist
						this.bannerArtist = document.getElementById("bannerArtist");
						this.bannerArtist.style.backgroundImage = "url(\""+this.url+"get-image-artist/"+this.artist.image+"\")";
						this.listDescription = this.getListDescription();
						// Obtener los albumes del artista
					}
				},
				(err : any ) => {
					var errorAddArtist = <any>err;
					
					if(errorAddArtist != null) {
						this.alertMessage = err.error.message;
					}
				}
			);
		});
	}

	public getListDescription() {
		return this.artist.description.replace(" ", "").split(",");
	}
}