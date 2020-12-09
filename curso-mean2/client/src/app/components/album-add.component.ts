import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from './../services/global';
import { UserService } from './../services/user.service';
import { ArtistService } from '../services/artist.service';
import { AuthenticationService } from '../services/authentication.service';
import { Artist } from './../models/artist';
import { Album } from './../models/album';
import { AlbumService } from '../services/album.service';

@Component({
	selector: 'album-add',
	templateUrl: './../views/album-add.html',
	providers: [
		AuthenticationService,
		UserService,
		ArtistService,
		AlbumService
	]
})

export class AlbumAddComponent implements OnInit {
	public title: string;
	public artist: Artist;
	public album: Album;
	public identity: any;
	public token: string;
	public url: string;
	public typeMessage: string = "alert-danger";
	public alertMessage: string;
	public isEdit: boolean;
	public legendButton: string;

	public constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _authenticationService: AuthenticationService,
		private _userService: UserService,
		private _albumService: AlbumService
	) {
		this.title = "Crear album";
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
		this.album = new Album('', '', '', '', '', '');
		this.isEdit = false;
		this.legendButton = "Guardar";
		if(!this._authenticationService.isAdmin(this.identity)) {
			this._router.navigate(['/home']);
		}
	}

	ngOnInit(): void {
		console.log("album-add.component cargado...");
	}

	public onSubmit() {
		this._route.params.forEach((params: Params) => {
			let artist_id = params['artist'];
			this.album.artist = artist_id;
		});
		
		// Llamar al método de servicio
		this._albumService.addAlbum(this.token, this.album).subscribe(
			(res : any) => {
				if(!res.album) {
					this.alertMessage = res.message;
					this.typeMessage = "alert-danger";
				} else {
					this.alertMessage = res.message;
					this.typeMessage = "alert-info";
					this.album = res.album;
					// Redireccionar a la edición del album
					this._router.navigate(['/edit-album', res.album._id]);
				}
			},
			(err : any) => {
				var errorAddArtist = <any>err;
				
				if(errorAddArtist != null) {
					this.alertMessage = err.error.message;
					this.typeMessage = "alert-danger";
				}
			}
		);
	}
}