#!/usr/bin/env python
# -*- coding: utf-8 -*-
from http.server import BaseHTTPRequestHandler, HTTPServer
import time
import json
import cgi
from tashaphyne.stemming import ArabicLightStemmer
ArListem = ArabicLightStemmer()

hostName = "localhost"
serverPort = 8080

class MyServer(BaseHTTPRequestHandler):
    def _set_response(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()
    def _set_headers(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
    def do_HEAD(self):
        self._set_headers()
    def do_GET(self):
        self._set_headers()
        self.wfile.write(bytes(json.dumps({'hello': 'world', 'received': 'ok'}), "utf-8"))
    def do_POST(self):
        content_length = int(self.headers['Content-Length']) # <--- Gets the size of data
        message = json.loads(self.rfile.read(content_length).decode('utf-8')) # <--- Gets the data itself
        offers = message["offers"]
        terms = [];
        for offer in offers:
            stem = ArListem.light_stem(offer["token"])
            term = ArListem.get_root()
            if len(term)!=1:
                terms.append({"token":term,"offerId":offer["offerId"]})
        # send the message back
        self._set_headers()
        self.wfile.write(bytes(json.dumps({"offers":terms}), "utf-8"))

if __name__ == "__main__":        
    webServer = HTTPServer((hostName, serverPort), MyServer)
    print("Server started http://%s:%s" % (hostName, serverPort))

    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass

    webServer.server_close()
    print("Server stopped.")
