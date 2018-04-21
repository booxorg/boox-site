#!/usr/bin/python2.7
import sys, os
import monitor
monitor.start(interval=1.0)
monitor.track(os.path.join(os.path.dirname(__file__), '..'))

from liteframework.application import Application

#####################################################################################
###    The entry point of the application. 
###    Apache offsers control by calling this function and regains control after it finishes
#####################################################################################

def application(environ, start_response):   
    app = Application(environ, start_response)
    return app.handle_request()

