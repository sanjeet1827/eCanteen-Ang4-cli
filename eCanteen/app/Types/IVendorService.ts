import { Observable } from 'rxjs/Observable';
import { IVendor } from '../Types/IVendor';

export interface IVendorService {
    loginVendor(email: string, password: string): Observable<boolean>;
    registerVendor(vendor: IVendor): Observable<IVendor>;
    getAllVendors(): Observable<IVendor[]>;
}