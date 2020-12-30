import { Component, OnInit } from '@angular/core';
import { Song } from '../models/song';
import { GLOBAL } from '../services/global';
import { PlayerService } from '../services/player.service';

@Component({
	selector: 'player',
	templateUrl: './../views/player.html',
	providers: []
})

export class PlayerComponent implements OnInit {
	public url: string;
	public song: Song;
	public playerSongImage: any;
	public playerSongTitle: any;
	public playerSongArtist: any;

	public message: string;

	public constructor(
		private _playerService: PlayerService
	) {
		this.url = GLOBAL.url;
		
		// Valores del reproductor por defecto
		this.playerSongImage = "5HifqDvtIu6Z6GXmzoMxq-X0.jpg";
		this.playerSongTitle = "Ninguna canción seleccionada";
		this.playerSongArtist = "Sin artísta";
	}

	public ngOnInit() {
		console.log("player.component cargado...");

		this._playerService.song.subscribe((song) => {
			this.song = song;
			
			// Verificar la existencia de contenido en el stored
			this.getSongStored();
		});
	}

	public getSongStored() {
		this.song = this._playerService.getSong();
		if(this.song) {
			this.playerSongImage = this.song.album.image;
			this.playerSongTitle = this.song.name;
			this.playerSongArtist = this.song.album.artist.name;
		}
	}

	public playSong() {
		console.log("playSong");
	}

	public pauseSong() {
		console.log("pauseSong");
	}
}