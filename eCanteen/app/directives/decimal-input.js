function DecimalInput() {

    this.restrict = "A",
    
    this.link = function (scope, element, attrs, ngModel) {

        element.bind("input", function (ev) {
            var rawValue = ev.target.value !== undefined && ev.target.value !== null && ev.target.value !== '' ? ev.target.value : '';

            if (/[^0-9.]/g.test(rawValue)) {
                if (ev.target.getAttribute('oldValue') !== undefined && ev.target.getAttribute('oldValue') !== null) {
                    var oldValue = ev.target.getAttribute('oldValue');
                    ev.target.value = oldValue;
                }
                else {
                    ev.target.value = rawValue.replace(rawValue, "");
                }
            }
            else {
                ev.target.setAttribute('oldValue', rawValue);
            }

        });

    }

}