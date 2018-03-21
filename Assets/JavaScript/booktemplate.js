function growDiv(elem) 
{
    var growDiv = document.getElementById(elem.getAttribute("bentryid"));
    if (growDiv.clientHeight) 
    {
        growDiv.style.height = 0;
    }
    else 
    {
        var wrapper = document.querySelector(elem.getAttribute("bentryclass"));
        growDiv.style.height = wrapper.clientHeight + "px";
    }
}