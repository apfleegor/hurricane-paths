#Import dependencies
from flask import Flask, jsonify, render_template
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, and_
from datetime import datetime as dt
from sqlalchemy.sql import text


app = Flask(__name__)

@app.route('/')
def home():
    return render_template("home.html")

@app.route('/hurricane-selector')
def hurricane():
    return render_template("hurricane.html")


if __name__ == "__main__":
    app.run(debug=True)
