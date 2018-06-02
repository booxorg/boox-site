#!/usr/bin/python2.7
import sys, os
import monitor
import posixpath
monitor.start(interval=1.0)
monitor.track(os.path.join(os.path.dirname(__file__), '..'))

from liteframework.application import Application
from liteframework.routing import Router
from app.routes import *

#####################################################################################
###    The entry point of the application. 
###    Apache offsers control by calling this function and regains control after it finishes
#####################################################################################

def application(environ, start_response):   
    # Wrapper to set SCRIPT_NAME to actual mount point.
    environ['SCRIPT_NAME'] = posixpath.dirname(environ['SCRIPT_NAME'])
    if environ['SCRIPT_NAME'] == '/':
        environ['SCRIPT_NAME'] = ''
    path = os.path.join(os.path.dirname(__file__), '..')
    Application.init(environ, start_response, path)
    return Router.handle_request()

