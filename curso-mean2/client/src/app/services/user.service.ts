import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {
	public url: string;

	constructor(private _http: HttpClient) {
		this.url = GLOBAL.url;
	}

	signup() {
		return "Hola mundo desde el servicio";
	}
}