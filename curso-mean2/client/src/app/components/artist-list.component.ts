import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from './../services/global';
import { UserService } from './../services/user.service';
import { Artist } from './../models/artist';

@Component({
	selector: 'artist-list',
	templateUrl: './../views/artist-list.html',
	providers: [UserService]
})

export class ArtistListComponent implements OnInit {
	public title: string;
	public artist: Artist[];
	public identity: any;
	public token: string;
	public url: string;
	
	ngOnInit(): void {
		console.log("artist-list.component cargado...");

		// Obtener listado de artistas
	}

	public constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService
	) {
		this.title = "Artistas";
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
	}	
}