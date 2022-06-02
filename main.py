from flask import Flask, render_template, request
app = Flask('app')

@app.route('/')
def hello_world():
  return render_template("index.html")

@app.route('/exec', methods=["POST"])
def exec():
  import os
  #resp = os.system(request.form.get("run"))
  import subprocess
  cmd =  request.form.get("run").split()
  resp = subprocess.Popen( cmd, stdout=subprocess.PIPE ).communicate()[0]
  #return str(resp)
  return resp.decode("utf-8").replace("\n","<br>")
app.run(host='0.0.0.0', port=8080)
