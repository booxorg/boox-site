from liteframework.routing import route

@route(url='/test/{name::[A-Za-z]+}', method='GET')
def test_route(variables):
    return 'Hello! ' + variables['name']

@route(url='/', method='GET')
def main_route(variables):
    return 'This is the main page 2'

@route(url='/silviu{num::\d}denis{num2::\d}')
def test2(variables):
    return variables['num'] + variables['num2']