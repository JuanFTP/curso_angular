import { Component, OnInit } from '@angular/core';
import { ignoreElements } from 'rxjs/operators';
import { Song } from '../models/song';
import { GLOBAL } from '../services/global';
import { PlayerService } from '../services/player.service';

@Component({
	selector: 'player',
	templateUrl: './../views/player.html',
	providers: [PlayerService]
})

export class PlayerComponent implements OnInit {
	public url: string;
	public song: Song;
	public playerSongImage: any;
	public playerSongTitle: any;
	public playerSongArtist: any;

	public constructor(
		private _playerService:PlayerService
	) {
		this.url = GLOBAL.url;
		this.song = new Song('', '' ,'' ,'' ,'' , null);
	}

	public ngOnInit() {
		console.log("player.component cargado...");

		// Obtener el objeto de la persistencia
		this.verifySongLoaded();
	}

	public verifySongLoaded() {
		if(this._playerService.isLoaded()) {
			this.song = this._playerService.getSong();

			this.playerSongImage = this.url+"get-image-album/"+this.song.album.image;
			this.playerSongTitle = this.song.name;
			this.playerSongArtist = this.song.album.artist.name;
		}
	}

	// Cargar objeto para archivo
	public loadPlayer(song: Song) {
		// Llamar al servicio del player y guardar el elemento
		this._playerService.loadSong(song);
	}
}