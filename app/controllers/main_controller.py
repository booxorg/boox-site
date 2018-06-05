# Main controller, should handle requests to the main page
import liteframework.routing as Routing
import liteframework.controller as Controller

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