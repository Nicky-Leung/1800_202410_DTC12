# Import libraries
import requests
#from splinter import Browser
import re
from bs4 import BeautifulSoup
import pandas as pd
import matplotlib.pyplot as plt
import time

from splinter import Browser

#browser=Browser('chrome')

base_url = "https://www.facebook.com/marketplace/vancouver/search?"

min_price = 1000
max_price = 5000
days_listed = 7
make = "Toyota"
model = "Corolla"

url = f"{base_url}minPrice={min_price}&maxPrice={max_price}&query={make}{model}&exact=false"
print(url)


  



