
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

_The main architectural diagram is below, a more detailed, technical one is available here [here](https://github.com/beaverden/boox/blob/master/docs/architecture/ArchitecturalDiagram.svg)_
![architectural-diagram](https://github.com/beaverden/boox/blob/master/docs/architecture/GeneralDiagram.svg)

1. **Router** will accept, parse and find the matching route for the url. Then it will call the associated controller and return a fully qualified and rendered response.
    The components of a route url are:
    1. **Variable** `{%variable name%::%variable match regex%}`. The regex shows how the variable value should look and the name is what will be passed to the controller as a key to the variables dictionary.
    2. **Text** without any variables
    
    After the parsing has succeeded, the router will call the action method of the route and pass it all the variables found.

2. **Controller** will accept the request variables from the router and execute the logic neded to handle it. For example, adding the newly registered user to the database, adding a book, marking a book as removed, etc. All of the actions will have an attached controller.
    1. `BooksController` handles adding (publishBook) and removing a book. Also it will serve all the books required by the views. When adding a book, the server will verify its existence in the GoodReads and GoogleBooks databases and deny the user adding if it's not present.
    2. `NotifyController` will handle user notifications about nearby books and reminders
    3. `FileRequestHandler` will generate serve the application resources like Images, PDFs, JavaScript files and CSS files, it will contain the routes to such folders
    4. `SearchController` will apply the filters and return the most appropriate matches
    5. `AuthController` takes care of the login and register processes, adds new users to the database and verifies their validity during login
    6. `ProfileController` serves the information about the user profile like name, username, all the books it has, avatar
    7. `ReportController`generates and servers statistics about the current application state, including the most active users, most popular books, etc. Also available in formats like JSON, PDF

3. **Model** is an abstraction layer over the raw database connection and interaction. Each Model is a subclass of the main interface that contains all the needed methods and attributes to elliminate the sometimes painful Database work. 
	


## Database
The application diagram is shown below
![database diagram](https://raw.githubusercontent.com/beaverden/boox/master/docs/architecture/DatabaseDiagram.png?token=AKZybg9Ly2-z5ibOok49CzRT3YXlWdpFks5a_AAjwA%3D%3D)

## Development roles
##### Rozimovschii Denis 
1. Books functionality module
2. Search module
3. Report module
4. Profile module
5. Goodreads API for book addition
6. Google books API for book addition

#### Vitel Silviu-Constantin
1. Login module
2. Register module
3. Model class development (Database abstraction layer)
4. Notification module
5. Facebook API for auth
6. Goodreads API for auth
7. Google Maps API for location