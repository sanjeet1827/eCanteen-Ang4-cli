function Test() {

    this.restrict = "A",
    this.scope = {

    },

    this.link = function (scope, element, attrs) {

        element.bind('keyup', function (event) {
            var att = attrs;

            if (event.which === 13) {
                var elems = document.querySelectorAll('#inptest .inp');
                var nextinput = element.next('input');
            }
        })

        scope.ngType = 'text';
    }

}