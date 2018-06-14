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

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.substr(1);
}

function redirect(addr) {
    window.location.href = addr;
}

function reload() {
    window.location.reload(true);
}


function getBookTemplate(index, book) {
    return `
    <section class="bookentry-container"> 
        <div class="bookentry-cover">
            <img alt="Book cover image" src="{image}">
        </div>
        <div class="bookentry-info">
            <h2 class="bookentry-title"><span class="pill">title</span>&nbsp;&nbsp;{title}</h2>
            <h3 class="bookentry-author"><span class="pill">author</span>&nbsp;&nbsp;{author}</h3>
            <h4 class="bookentry-author"><span class="pill">added</span>&nbsp;&nbsp;{user}</h4>

            <div class="buttons-container">
                <div class="buttons-wrapper">
                <a target="_blank" href="/profile?id={user_id}" class="icon-button">
                    <span class="button-icon">
                        <i class="far fa-user"></i>
                    </span>
                    <span class="button-text">
                        See profile
                    </span>       
                </a>                            
                <a target="_blank" href="https://www.goodreads.com/book/show/{goodreads-id}" class="icon-button">
                    <span class="button-icon">
                        <i class="fab fa-goodreads-g"></i> 
                    </span>
                    <span class="button-text">
                        View on Goodreads
                    </span>     
                </a>
                <button onclick="return requestBook({book_id});" class="icon-button">
                    <span class="button-icon">
                        <i class="fas fa-plug"></i> 
                    </span>
                    <span class="button-text">
                        Request
                    </span>     
                </button>
                </div>
            </div>
        </div>
    </section>`.format(
        {
            'id' : index,
            'book_id' : book['id'],
            'title' : book['title'],
            'author' : book['author'],
            'user' : book['username'],
            'user_id' : book['user_id'],
            'genre' : book['genre'],
            'image' : book['cover'],
            'goodreads-id' : book['goodreads_id']
        }
    );
}


function closeExchange(resp_dict)
{
    url_format = '/exchange/finish-exchange?token={0}&ownerid={1}&bookid1={2}&bookid2={3}&accept={4}'. 
    format(resp_dict['token'], resp_dict['ownerid'], resp_dict['bookid1'], resp_dict['bookid2'], resp_dict['accept']);

    $.ajax({
      url: '{{ api_address() }}' + url_format,
      success: function(response){},
      error: function(){}
    });
}

function getExchangeTemplate(exchange_info, request, id) {
  string1 = `
  <section id="exhange-{id}" class="exchange-container">
    <div class="exchange-info"> 
        <div class = "bookentry-exchange">
            <div class = "bookentry-cover">
              <img alt="Book cover image" src="{image1}">
            </div>
            <div class="bookentry-info">
              <h2 class="bookentry-title"><span class="pill">title</span>&nbsp;&nbsp;{title1}</h2>
              <h3 class="bookentry-author"><span class="pill">author</span>&nbsp;&nbsp;{author1}</h3>
              <h4 class="bookentry-author"><span class="pill">added</span>&nbsp;&nbsp;{added1}</h4>
            </div>
        </div>
        <div class = "bookentry-exchange">
            <div class="bookentry-info-right">
              <h2 class="bookentry-title">{title2}&nbsp;&nbsp;<span class="pill">title</span></h2>
              <h3 class="bookentry-author">{author2}&nbsp;&nbsp;<span class="pill">author</span></h3>
              <h4 class="bookentry-author">{added2}&nbsp;&nbsp;<span class="pill">added</span></h4>
            </div>    

            <div class="bookentry-cover">
              <img alt="Book cover image" src="{image2}">
            </div>
        </div>

    </div>`.format(
      {
            'image1' : exchange_info['image1'],
            'title1' : exchange_info['title1'],
            'author1' : exchange_info['author1'],
            'added1' : exchange_info['added1'],
            'image2' : exchange_info['image2'],
            'title2' : exchange_info['title2'],
            'author2' : exchange_info['author2'],
            'added2' : exchange_info['added2'],
            'button1' : exchange_info['button1'],
            'button2' : exchange_info['button2'],
            'exc_stat' : exchange_info['exc_stat'],
            'id' : id
      }
);


string2 = `<div class = "button-wrapper">
            <div class="exchange-btn-container">
              <button onclick="{func1}({param1})" class="icon-button fb-login">
                  <span class="button-icon">
                      <i class="far fa-user"></i>
                  </span>
                  <span class="button-text">
                      See profile
                  </span>       
              </button>                            
              <button onclick="{func2}({param2})" class="icon-button fb-login {ishidden1}">
                  <span class="button-icon">
                      <i class="fab fa-goodreads-g"></i> 
                  </span>
                  <span class="button-text">
                      {button1}
                  </span>     
              </button>
              <button onclick="{func3}({param3})" class="icon-button fb-login {ishidden2}">
                  <span class="button-icon">
                      <i class="far fa-user"></i>
                  </span>
                  <span class="button-text">
                      {button2}
                  </span>       
              </button>
            </div>
          </div>

          <div class = "status-info">
            <h2 class="bookentry-title">
              <span>status: {exc_stat}</span>
            </h2>
          </div>
</section>`

string2 =  string2.format(
           {
             'exc_stat' : exchange_info['exc_stat']
           }
);

if(request['BOOKID2'])
{
    if(exchange_info['id'] == request['EXCHANGES.RECEIVERID'])
    {
      string2 = string2.format(
        {
            'button1' : 'Accept offer',
            'button2' : 'Decline offer',
            'ishidden1' : '',
            'ishidden2' : '',
            'func2' : 'closeExchange',
            'param2' : "{\'token\': {0}, \'ownerid\' : {1}, \'bookid1\' : {2}, \'bookid2\' : {3}, \'accept\' : {4}". 
             format(Cookies.get('token'), request['EXCHANGES.OWNERID'], request['EXCHANGES.BOOKID1'], request['EXCHANGES.BOOKID2'], 
             1),

             'func3' : 'closeExchange',
             'param2' : "{\'token\': {0}, \'ownerid\' : {1}, \'bookid1\' : {2}, \'bookid2\' : {3}, \'accept\' : {4}". 
             format(Cookies.get('token'), request['EXCHANGES.OWNERID'], request['EXCHANGES.BOOKID1'], request['EXCHANGES.BOOKID2'], 
             0)
        }
      );
    }
    else
    {
       string2 = string2.format(
       {
          'ishidden1' : 'hidden',
          'ishidden2' : 'hidden'
       }
       );
    }
}
else
{
    if(exchange_info['id'] == request['EXCHANGES.RECEIVERID'])
    {
       string2 = string2.format(
       {
          'ishidden1' : 'hidden',
          'ishidden2' : 'hidden'
       }
       );
    }
    else
    {
        string2 = string2.format(
        {
            'button1' : 'Open list',
            'button2' : 'Decline offer',
            'ishidden1' : '',
            'ishidden2' : '',
            'func2' : 'openList',
            'param2' : request['EXCHANGES.RECEIVERID']
        }
        );
    }
}

return string1 + string2;

}

/* Port of strftime(). Compatibility notes:
 *
 * %c - formatted string is slightly different
 * %D - not implemented (use "%m/%d/%y" or "%d/%m/%y")
 * %e - space is not added
 * %E - not implemented
 * %h - not implemented (use "%b")
 * %k - space is not added
 * %n - not implemented (use "\n")
 * %O - not implemented
 * %r - not implemented (use "%I:%M:%S %p")
 * %R - not implemented (use "%H:%M")
 * %t - not implemented (use "\t")
 * %T - not implemented (use "%H:%M:%S")
 * %U - not implemented
 * %W - not implemented
 * %+ - not implemented
 * %% - not implemented (use "%")
 *
 * strftime() reference:
 * http://man7.org/linux/man-pages/man3/strftime.3.html
 *
 * Day of year (%j) code based on Joe Orost's answer:
 * http://stackoverflow.com/questions/8619879/javascript-calculate-the-day-of-the-year-1-366
 *
 * Week number (%V) code based on Taco van den Broek's prototype:
 * http://techblog.procurios.nl/k/news/view/33796/14863/calculate-iso-8601-week-and-year-in-javascript.html
 */
function strftime(sFormat, date) {
  if (!(date instanceof Date)) date = new Date();
  var nDay = date.getDay(),
    nDate = date.getDate(),
    nMonth = date.getMonth(),
    nYear = date.getFullYear(),
    nHour = date.getHours(),
    aDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    aMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    aDayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
    isLeapYear = function() {
      if ((nYear&3)!==0) return false;
      return nYear%100!==0 || nYear%400===0;
    },
    getThursday = function() {
      var target = new Date(date);
      target.setDate(nDate - ((nDay+6)%7) + 3);
      return target;
    },
    zeroPad = function(nNum, nPad) {
      return ('' + (Math.pow(10, nPad) + nNum)).slice(1);
    };
  return sFormat.replace(/%[a-z]/gi, function(sMatch) {
    return {
      '%a': aDays[nDay].slice(0,3),
      '%A': aDays[nDay],
      '%b': aMonths[nMonth].slice(0,3),
      '%B': aMonths[nMonth],
      '%c': date.toUTCString(),
      '%C': Math.floor(nYear/100),
      '%d': zeroPad(nDate, 2),
      '%e': nDate,
      '%F': date.toISOString().slice(0,10),
      '%G': getThursday().getFullYear(),
      '%g': ('' + getThursday().getFullYear()).slice(2),
      '%H': zeroPad(nHour, 2),
      '%I': zeroPad((nHour+11)%12 + 1, 2),
      '%j': zeroPad(aDayCount[nMonth] + nDate + ((nMonth>1 && isLeapYear()) ? 1 : 0), 3),
      '%k': '' + nHour,
      '%l': (nHour+11)%12 + 1,
      '%m': zeroPad(nMonth + 1, 2),
      '%M': zeroPad(date.getMinutes(), 2),
      '%p': (nHour<12) ? 'AM' : 'PM',
      '%P': (nHour<12) ? 'am' : 'pm',
      '%s': Math.round(date.getTime()/1000),
      '%S': zeroPad(date.getSeconds(), 2),
      '%u': nDay || 7,
      '%V': (function() {
              var target = getThursday(),
                n1stThu = target.valueOf();
              target.setMonth(0, 1);
              var nJan1 = target.getDay();
              if (nJan1!==4) target.setMonth(0, 1 + ((4-nJan1)+7)%7);
              return zeroPad(1 + Math.ceil((n1stThu-target)/604800000), 2);
            })(),
      '%w': '' + nDay,
      '%x': date.toLocaleDateString(),
      '%X': date.toLocaleTimeString(),
      '%y': ('' + nYear).slice(2),
      '%Y': nYear,
      '%z': date.toTimeString().replace(/.+GMT([+-]\d+).+/, '$1'),
      '%Z': date.toTimeString().replace(/.+\((.+?)\)$/, '$1')
    }[sMatch] || sMatch;
  });
}

