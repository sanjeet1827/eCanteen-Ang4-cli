var AddHttpHeaderInterceptor = (function () {
    function AddHttpHeaderInterceptor() {
    }
    AddHttpHeaderInterceptor.prototype.intercept = function (req, next) {
        var clonedReq = req.clone({ headers: req.headers.set('Content-Type', 'application/json; charset=utf-8') });
        return next.handle(clonedReq);
    };
    return AddHttpHeaderInterceptor;
}());
export { AddHttpHeaderInterceptor };
//# sourceMappingURL=HttpInterceptor.js.map