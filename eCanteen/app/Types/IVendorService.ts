import { Observable } from 'rxjs/Observable';
import { IVendor } from '../Types/IVendor';

export interface IVendorService {
    loginVendor(vendor: IVendor): Observable<IVendor>;
    registerVendor(vendor: IVendor): Observable<boolean>;
    getAllVendors(): Observable<IVendor[]>;
}