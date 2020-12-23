import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Artist } from '../models/artist';
import { Album } from '../models/album';
import { Song } from '../models/song';
import { ArtistService } from '../services/artist.service';
import { AlbumService } from '../services/album.service';
import { SongService } from '../services/song.service';

@Component({
	selector: 'home',
	templateUrl: './../views/home.html',
	providers: [
		ArtistService,
		AlbumService,
		SongService
	]
})

export class HomeComponent implements OnInit {
	public title: string;
	public artists: Artist[];
	public albums: Album[];
	public songs: Song[];

	ngOnInit() {
		console.log("home.component cargado...");
	}

	public constructor(
		private _route: ActivatedRoute,
		private _router: Router
	) {
		this.title  = "Inicio";
	}
}