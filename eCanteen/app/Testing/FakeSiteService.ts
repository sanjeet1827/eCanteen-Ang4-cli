import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { ISite } from '../Types/ISite'
import { ISiteService } from '../Types/ISiteService'

export const mock_sites: ISite[] = [{ Id: "1", Name: "Ansal Towser", contact: "9899138026", address: "", owner: 1 }]

export class FakeSiteService implements ISiteService {

    getSites(): Observable<ISite[]> {
        let sitesObservable: Observable<ISite[]> = new Observable<ISite[]>();
        return sitesObservable.do(data => JSON.stringify(mock_sites));
    }
}