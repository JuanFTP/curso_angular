import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { map } from 'rxjs/operators';
import { Song } from '../models/song';

@Injectable()
export class PlayerService {
	public url: string;
	public song: Song;

	public constructor(private _http: HttpClient) {
		this.url = GLOBAL.url;
	}

	// Métodos del player
	// Verifica si hay una canción cargada en el storage
	public isLoaded():boolean {
		this.song = JSON.parse(localStorage.getItem('song'));
		if(this.song) {
			return true;
		} else {
			return false;
		}
	}

	// Carga el objeto en el local storage
	public loadSong(song: Song):void {
		let songToSet = JSON.stringify(song);

		localStorage.setItem('song', songToSet);
	}

	// Retorna el objeto song del local storage
	public getSong():Song {
		if(this.isLoaded()) {
			return this.song;
		} else {
			return null;
		}
	}
}