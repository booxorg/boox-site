var FileChooseCustom = {
    init: function() {
        document.addEventListener("DOMContentLoaded", function() {
            var selects = document.getElementsByClassName("file-input");
            for (var i = 0; i<selects.length; i++) {

                selects[i].onchange = function() {
                    var id = this.getAttribute("data-box");
                    var label = document.getElementsByClassName(id + "-label")[0]
                    label.innerHTML = this.files[0].name;
                }
            }
        });
    }
};
(function() {
    FileChooseCustom.init();
})();