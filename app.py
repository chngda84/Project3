# import necessary libraries
from flask import Flask, render_template
import os


# create instance of Flask app
app = Flask(__name__)

# Create route that renders index.html template
@app.route("/")
def home(): 

    # Return template and data
    return render_template("index.html")
    
@app.route("/map")
def map(): 

    # Return template and data
    return render_template("map.html")

@app.route("/data")
def data():
    return render_template("data.html")

@app.route("/graph")
def graph():
    return render_template("graph.html")

@app.route("/image")
def image():
    return render_template("Capture.png")

if __name__ == "__main__":
    app.run(debug=True)