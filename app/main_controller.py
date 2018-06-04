# Main controller, should handle requests to the main page
import liteframework.routing as Routing
import liteframework.controller as Controller

@Routing.Route(url='/', method='GET')
def index(request={}, variables={}):
    pass_variables = {
        'title' : 'BooX: the sharing platform'
    }
    return Controller.view('main.html', pass_variables)

@Routing.Route(url='/register', method='GET')
def register(request={}, variables={}):
    pass_variables = {
        'title' : 'Register'
    }
    return Controller.view('register.html', pass_variables)

@Routing.Route(url='/login', method='GET')
def login(request={}, variables={}):
    pass_variables = {
        'title' : 'Login'
    }
    return Controller.view('login.html', pass_variables)    

@Routing.Route(url='/add', method='GET')
def add_book(request={}, variables={}):
    pass_variables = {
        'title' : 'Add a book'
    }
    return Controller.view('addbook.html', pass_variables)    

@Routing.Route(url='/post', method='POST')
def info(request={}, variables={}):
    text = request.input.getfirst('test', 'no test')
    return Controller.response(text)