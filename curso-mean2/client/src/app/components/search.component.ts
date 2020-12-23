import { Component, OnInit } from '@angular/core';
import { Song } from '../models/song';
import { GLOBAL } from '../services/global';

@Component({
	selector: 'search',
	templateUrl: './../views/search.html'
})

export class SearchComponent implements OnInit {
	public url: string;

	public constructor() {
		this.url = GLOBAL.url;
	}

	public ngOnInit() {
		console.log("search.component cargado...");
	}
}