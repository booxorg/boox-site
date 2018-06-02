from liteframework.routing import Route
from liteframework.controller import Controller

@Route(url='/', method='GET')
def index(variables):
    return Controller.view('main')

