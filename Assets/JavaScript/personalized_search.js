document.addEventListener('DOMContentLoaded', function() {
    var moreButton = document.getElementById("search-bar-more");
    moreButton.onclick = function() {
        var searchWrapper = document.getElementById("advanced-search-wrapper");
        searchWrapper.classList.toggle("search-hidden");
    };
});