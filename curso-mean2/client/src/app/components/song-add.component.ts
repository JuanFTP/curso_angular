import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from './../services/global';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from './../services/user.service';
import { Song } from './../models/song';
import { SongService } from '../services/song.service';

@Component({
	selector: 'song-add',
	templateUrl: './../views/song-add.html',
	providers: [
		AuthenticationService,
		UserService,
		SongService
	]
})

export class SongAddComponent implements OnInit {
	public title: string;
	public identity: any;
	public song: Song;
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
		private _songService: SongService
	) {
		this.title = "Agregar canción";
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
		this.song = new Song('', '', '', '', '', '');
		this.isEdit = false;
		this.legendButton = "Guardar";

		if(!this._authenticationService.isAdmin(this.identity)) {
			this._router.navigate(['/home']);
		}
	}

	ngOnInit(): void {
		console.log("song-add.component cargado...");
	}

	public onSubmit() {
		this._route.params.forEach((params: Params) => {
			let albumId = params['album'];
			this.song.album = albumId;

			// Crear canción
			this._songService.addSong(this.token, this.song).subscribe(
				(res : any) => {
					if(!res.song) {
						this.alertMessage = res.message;
						this.typeMessage = "alert-danger";
					} else {
						this.alertMessage = res.message;
						this.typeMessage = "alert-success";
						this.song = res.song;
						console.log(this.song);
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

	public fileChangeEvent(event: any) {
		console.log("fileChangeEvent...");
	}
}