# Main controller, should handle requests to the main page

from liteframework.routing import Route
from liteframework.controller import Controller

@Route(url='/{username::[A-Za-z]*}', method='GET')
def index(variables):
    pass_variables = dict()
    if variables['username']:
        pass_variables['username'] = variables['username']
    else:
        pass_variables['username'] = 'guest'
    return Controller.view('main', pass_variables)

