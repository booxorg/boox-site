# Boox

## Project description

The project described in this paper consists of a web application that handles the exchange of books between different users. These users have the possibility of uploading information about the books they want to exchange or search the books that they want based on certain keywords and filters. 

The application integrates external services (such as Goodreads and Google Books) for extracting, displaying and recommending books. The functionality of the application will be based on an REST API. If the user wants it, a notification can be sent when one of his preferred books is available for exchange. A special user (the administrator) can export statistics about the application in any of the following formats: HTML, JSON, XML.

### User roles

Based on the privileges that the users have in the context of the application, we can define three types of users:
1. The visitor: this user can view the profiles created on the application and search for books, but he cannot initiate an exchange

2. The registered user: this user can view the profiles created on the site, add books, remove books (from his own portfolio), initiate and decline and exchange

3. The administrator: this user can remove the accounts of other users, remove books and export data about the traffic on the application   




## Technologies

### Python
All the server side application code is written in Python, a high level scripting programming language used in such popular web frameworks as Django, Flask, Pyramid. It has proven to be readable and easy to write, as well as maintainable over time.

### Apache
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

### Framework
The mini-framework is based on MVC model, having Models (database classes), Views (all views extending the base class View, that are being rendered and shown to the user) and Controllers (that will connect user interactions to the backend and realise all the application's business logic). 

_The main architectural diagram is below, a more detailed, technical one is available [here](https://github.com/beaverden/boox/blob/master/docs/architecture/ArchitecturalDiagram.svg)_
![architectural-diagram](https://github.com/beaverden/boox/blob/master/docs/architecture/GeneralDiagram.svg)

1. **Router** will accept, parse and find the matching route for the url. Then it will call the associated controller and return a fully qualified and rendered response.
    The components of a route url are:
    1. **Variable** `{%variable name%::%variable match regex%}`. The regex shows how the variable value should look and the name is what will be passed to the controller as a key to the variables dictionary.
    2. **Text** without any variables
    
    After the parsing has succeeded, the router will call the action method of the route and pass it all the variables found.

2. **Controller** will accept the request variables from the router and execute the logic neded to handle it. For example, adding the newly registered user to the database, adding a book, marking a book as removed, etc. All of the actions will have an attached controller.
    1. `BooksController` handles adding (publishBook) and removing a book. Also it will serve all the books required by the views. When adding a book, the server will verify its existence in the GoodReads and GoogleBooks databases and deny the user adding if it's not present.
    2. `NotifyController` will handle user notifications about nearby books and reminders
    3. `FileRequestHandler` will generate and serve the application resources like Images, PDFs, JavaScript files and CSS files, it will contain the routes to such folders
    4. `SearchController` will apply the filters and return the most appropriate matches
    5. `AuthController` takes care of the login and register processes, adds new users to the database and verifies their validity during login
    6. `ProfileController` serves the information about the user profile like name, username, all the books it has, avatar
    7. `ReportController`generates and servers statistics about the current application state, including the most active users, most popular books, etc. Also available in formats like JSON, PDF

3. **Model** is an abstraction layer over the raw database connection and interaction. Each Model is a subclass of the main interface that contains all the needed methods and attributes to elliminate the sometimes painful Database work. 
	


### Database
The application diagram is shown below
![database diagram](https://raw.githubusercontent.com/beaverden/boox/master/docs/architecture/DatabaseDiagram.png?token=AKZybg9Ly2-z5ibOok49CzRT3YXlWdpFks5a_AAjwA%3D%3D)

### Frontend 
The technologies used for design are
1. HTML5 (Hyper Text Markup Language for defining the structure of the pages)
2. CSS3 (Cascading Style Sheets for designing the layout and look of the frontend)
3. JavaScript (For interaction and AJAX requests to the server)

### Server side API
The RESTful application will provide useful APIs for interaction:
Clients must make a request to the API and handle the result
1. User registration `POST` `/register` 
2. User login `POST` `/login`
3. Select books `GET` `/book?id={book_id}&format={return_format}&limit=1`
4. Select multiple books `GET` `/book?id={book_id}&format={return_format}&limit={max_limit}`
5. Get user info `GET` `/user?id={user_id}`
6. Publish book `POST` `/add_book`
7. Remove book `DELETE` `/remove_book`
8. Search books `GET` `/search?filters={filter_dict}&keywords={keywords}&format={return_format}&limit={max_result_limit}`
9. Generate report `GET` `/report?type={report_type}`
10. Request book `POST` `/request`

### External APIs
Some of the modules that compose the application require the use of one or more APIs to correctly perform their tasks. The APIs used in this project come from Goodreads, Facebook, Google Books and Google Maps. 
#### Goodreads API
This API requires the user to have a developer key that can be passed through the link when accessing a method. Some of the methods require the using of OAuth, but those methods are not used in this project. For example, a request looks like this: `https://www.goodreads.com/search.xml?key=YOUR_KEY&q=Ender%27s+Game`
The response is an XML document that describes the object we’ve requested, in this case being the book “Ender’s Game”.

#### Facebook Oauth2 API
A new app will be registered in "Facebook App Creation" section.
The URL ```https://www.facebook.com/`v3.0`/dialog/oauth? client_id={app-id}  &redirect_uri={redirect-uri}  &state={state-param}``` will be used to get the temporary Oauth2 access token. 
Then requests to the Facebook Graph API will be made to aceess user first name, last name, email, etc.

#### Geocoding API (Google Maps)
Geocoding is the process of converting human-readable addresses into geographic coordinates. The Geocoding API provides a direct way to perform this conversion via an HTTP request.

The Geocoding API request has the following format: https://maps.googleapis.com/maps/api/geocode/outputFormat?parameters

The output format can be json or xml. The application presented in this paper uses Latitude/Longitude Lookup. For this lookup, some parameters have to be included in the geocoding request:

-   address, the street address that the application wants to geocode
    
-   Components, a components filter with elements separated by a pipe; each element in the components filter is a component:value pair
    
-   key, the application’s API key

A geocoding request which returns a json looks like this:
https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=API_KEY

#### Google Books API

The Google Books API is used in combination with the Goodreads API to provide more information about books that don’t have all the characteristics set by the user who added them. To perform a search, the application sends an HTTP GET request to the following URI:

https://www.googleapis.com/books/v1/volumes?q=search+terms

The request has a single required parameter q that tells the API to search for volumes that contain the specified string. There is a set of special keywords that can be specified in the search terms to search in particular fields, such as:

-   Intitle: returns results where the text is found in the title
    
-   Inauthor: returns result where the text is found in the author’s name
    
-   inpublisher, subject, isbn, etc.

### Use cases
##### Book adding, including a invalid named book
![book add usecase](https://github.com/beaverden/boox/blob/master/docs/usecase/svg/AddBookUseCase.svg)

##### Book publishing options
![book publish options](https://github.com/beaverden/boox/blob/master/docs/usecase/svg/PublishBook.svg)

##### Search book filters
![search filters](https://github.com/beaverden/boox/blob/master/docs/usecase/svg/SearchUseCase.svg)



### Development roles
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
