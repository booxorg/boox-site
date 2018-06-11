# Main controller, should handle requests to the main page
import liteframework.routing as Routing
import liteframework.controller as Controller
import liteframework.global_function as Global 
import liteframework.application as App

@Global.GlobalFunction
def api_address():
    return App.config.get('API', 'api_address')


@Routing.Route(url='/', method='GET')
def index(request={}, variables={}):
    pass_variables = {
        'title' : 'BooX: the sharing platform'
    }
    return Controller.response_view('main.html', pass_variables)

@Routing.Route(url='/register', method='GET')
def register(request={}, variables={}):
    pass_variables = {
        'title' : 'Register'
    }
    return Controller.response_view('register.html', pass_variables)

@Routing.Route(url='/login', method='GET')
def login(request={}, variables={}):
    pass_variables = {
        'title' : 'Login'
    }
    return Controller.response_view('login.html', pass_variables)    

@Routing.Route(url='/add', method='GET')
def add_book(request={}, variables={}):
    pass_variables = {
        'title' : 'Add a book'
    }
    return Controller.response_view('addbook.html', pass_variables)    

@Routing.Route(url='/search', method='GET')
def add_book(request={}, variables={}):
    pass_variables = {
        'title' : 'Search for a book'
    }
    return Controller.response_view('personalized_search.html', pass_variables)    