#!/usr/bin/env python


from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
from jinja2 import Template, Environment, FileSystemLoader, select_autoescape
import urlparse
import SocketServer
import os

env = Environment(
    loader=FileSystemLoader('Views'),
    autoescape=select_autoescape(['html', 'xml'])
)

class S(BaseHTTPRequestHandler):
    def _set_headers(self, content_type):
        self.send_response(200)
        self.send_header('Content-type', content_type)
        self.end_headers()

    def do_GET(self):
	data = urlparse.urlparse(self.path)
	if 'Assets' in data.path:
		# VERY UNSAFE
		if 'Style' in data.path:
			self._set_headers('text/css')
		elif 'Images' in data.path:
			print os.path.splitext(data.path)[1]
			self._set_headers('image/' + os.path.splitext(data.path)[1].replace('.','')) 
		self.wfile.write(open(data.path[1:],'rb').read())
	else:
		self._set_headers('text/html')
		name = os.path.basename(data.path)
		template = env.get_template('common.html')
        	self.wfile.write(template.render(page_name = name))

    def do_HEAD(self):
        self._set_headers()
        
    def do_POST(self):
        # Doesn't do anything with posted data
        self._set_headers()
        self.wfile.write("<html><body><h1>POST!</h1></body></html>")
        
def run(server_class=HTTPServer, handler_class=S, port=80):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print 'Starting httpd...'
    httpd.serve_forever()

if __name__ == "__main__":
    from sys import argv

    if len(argv) == 2:
        run(port=int(argv[1]))
    else:
        run()


