function growDiv(elem) 
{
    var growDiv = document.getElementById(elem.getAttribute("data-bentryid"));
    if (growDiv.clientHeight) 
    {
        growDiv.style.height = 0;
    }
    else 
    {
        var wrapper = document.querySelector(elem.getAttribute("data-bentryclass"));
        growDiv.style.height = "auto";
    }
}