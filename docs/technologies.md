# Technologies

## Apache
The server used by the application is *Apache HTTP Web Server*. Backed by [mod_wsgi](https://modwsgi.readthedocs.io/en/develop/), that allows the server to be [WSGI](https://en.wikipedia.org/wiki/Web_Server_Gateway_Interface) standard compliant. 
It allows the server to be compatible with most web frameworks written in Python, including our developed mini-framework.

The configuration of our server requires adding an [_Apache virtual host file_](https://httpd.apache.org/docs/2.4/vhosts/) and specifying:
1. `WSGIScriptAlias` to ` /var/www/boox/public/index.wsgi` as the path to the main handler script
2. `WSGIDaemonProcess` that sets mod_wsgi into multithreading mode, while running as a daemon, to run the wsgi application as a separate process
3. `WSGIScriptReloading` that detects changes in the wsgi script and reloads it in the memory of the running process

The public directory of the server is specified as
```
<Directory /var/www/boox/Public>
        Order allow,deny
        Allow from all
</Directory>
```
The simplified flow looks like that, where Apache creates a new process for each request and runs the application script.
After running index.wsgi, a new class instance of Application si created and control passed to the framework. When the framework finishes its work, it provides the runner (Apache) with a response, alongside with the content type and  other headers.
![apache flow](https://raw.githubusercontent.com/beaverden/boox/master/docs/images/apache_diagram.png?token=AKZybneF-sxbPXWBuihMAZTVpx-kHtT1ks5a-_hKwA%3D%3D)

## Framework
The mini-framework is based on MVC model, having Models (database classes), Views (all views extending the base class View, that are being rendered and shown to the user) and Controllers (that will connect user interactions to the backend and realise all the application's business logic). 

_The main architectural diagram is below, also visible in svg format [here](https://github.com/beaverden/boox/blob/master/docs/architecture/ArchitecturalDiagram.svg)_
![architectural-diagram](https://github.com/beaverden/boox/blob/master/docs/architecture/ArchitecturalDiagram.svg)

1. **Router** will accept, parse and find the matching route for the url. Then it will call the associated controller and return a fully qualified and rendered response.
    The components of a route url are:
    1. **Variable** `{%variable name%::%variable match regex%}`. The regex shows how the variable value should look and the name is what will be passed to the controller as a key to the variables dictionary.
    2. **Text** without any variables
    
    After the parsing has succeeded, the router will call the action method of the route and pass it all the variables found.

2. **Controller** will accept the request variables and execute the logic neded to handle it. For example, addign the newly registered user to the database, adding a book, marking a book as removed, etc. All of the actions will have an attached controller.


## Database
The application diagram is shown below
![database diagram](https://raw.githubusercontent.com/beaverden/boox/master/docs/architecture/DatabaseDiagram.png?token=AKZybg9Ly2-z5ibOok49CzRT3YXlWdpFks5a_AAjwA%3D%3D).