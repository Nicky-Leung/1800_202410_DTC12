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



data = {
    'item_name': ['Item A', 'Item B', 'Item C'],
    'price_sold': [100, 150, 80],
    'date': ['2024-03-01', '2024-03-02', '2024-03-03'],
    'condition': ['New', 'Used', 'New'],
    'other_info': ['Info 1', 'Info 2', 'Info 3']
}

df = pd.DataFrame(data)

df.to_csv('scripts/data.csv', index=False)






