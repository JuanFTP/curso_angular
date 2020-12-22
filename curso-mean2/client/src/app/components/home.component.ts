import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
	selector: 'home',
	templateUrl: './../views/home.html'
})

export class HomeComponent implements OnInit {
	public title: string;

	ngOnInit() {
		console.log("home.component cargado...");
	}

	public constructor(
		private _route: ActivatedRoute,
		private _router: Router
	) {
		this.title  = "Inicio";

		// Validar sesión, si no se ha loggueado regresarlo al login
	}
}