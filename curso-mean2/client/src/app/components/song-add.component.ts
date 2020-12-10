import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from './../services/global';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from './../services/user.service';
import { Song } from './../models/song';

@Component({
	selector: 'song-add',
	templateUrl: './../views/song-add.html',
	providers: [
		AuthenticationService,
		UserService
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
		private _userService: UserService
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
		console.log(this.song);
	}
}