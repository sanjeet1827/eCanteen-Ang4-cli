import { Observable } from 'rxjs/Observable';
import { ISite } from '../Types/ISite';

export interface ISiteService {
    getSites(): Observable<ISite[]>
}