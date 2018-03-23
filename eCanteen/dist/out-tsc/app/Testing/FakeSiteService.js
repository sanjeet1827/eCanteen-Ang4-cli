import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
export var mock_sites = [{ Id: "1", Name: "Ansal Towser", contact: "9899138026", address: "", owner: 1 }];
var FakeSiteService = (function () {
    function FakeSiteService() {
    }
    FakeSiteService.prototype.getSites = function () {
        var sitesObservable = new Observable();
        return sitesObservable.do(function (data) { return JSON.stringify(mock_sites); });
    };
    return FakeSiteService;
}());
export { FakeSiteService };
//# sourceMappingURL=FakeSiteService.js.map