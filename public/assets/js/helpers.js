String.prototype.format = String.prototype.format ||
function () {
    "use strict";
    var str = this.toString();
    if (arguments.length) {
        var t = typeof arguments[0];
        var key;
        var args = ("string" === t || "number" === t) ?
            Array.prototype.slice.call(arguments)
            : arguments[0];

        for (key in args) {
            str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
        }
    }

    return str;
};

$(document).ready(function () {
    $('.push-message').click(function() {
        $(this).remove();
    })
})

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.substr(1);
}

function redirect(addr) {
    window.location.href = addr;
}

function reload() {
    window.location.reload(true);
}

