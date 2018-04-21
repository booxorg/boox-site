from liteframework.routing import route

@route(url='/test', method='GET')
def test_route(variables):
    return 'Hello!'

@route(url='/', method='GET')
def main_route(variables):
    return 'This is the main page'
