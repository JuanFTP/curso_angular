import { Component, OnInit } from '@angular/core';
import { Song } from '../models/song';
import { GLOBAL } from '../services/global';

@Component({
	selector: 'player',
	templateUrl: './../views/player.html'
})

export class PlayerComponent implements OnInit {
	public url: string;

	public constructor() {
		this.url = GLOBAL.url;
	}

	public ngOnInit() {
		console.log("player.component cargado...");
	}
}