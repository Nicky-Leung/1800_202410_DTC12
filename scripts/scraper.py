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
    'item_name': ['Item A', 'Item B', 'Item C']*5,
    'price_sold': [100, 150, 80]*5,
    'date': ['2024-03-01', '2024-03-02', '2024-03-03']*5,
    'condition': ['New', 'Used', 'New']*5,
    'other_info': ['Info 1', 'Info 2', 'Info 3']*5
}

df = pd.DataFrame(data)

# Check for null values 
# null_values = df.isnull().sum()
# print(null_values)

# Deal with null values
# df.dropna(inplace=True)
# df['price_sold'].fillna(df['price_sold'].mean(), inplace=True)
# df['condition'].fillna('new', inplace=True)

df.to_csv('scripts/data.csv', index=False)

average_price_all = df['price_sold'].mean()
lowest_price_all = df['price_sold'].min()
highest_price_all = df['price_sold'].max()

average_price_new = df[df['condition'] == 'New']['price_sold'].mean()
lowest_price_new = df[df['condition'] == 'New']['price_sold'].min()
highest_price_new = df[df['condition'] == 'New']['price_sold'].max()

average_price_used = df[df['condition'] == 'Used']['price_sold'].mean()
lowest_price_used = df[df['condition'] == 'Used']['price_sold'].min()
highest_price_used = df[df['condition'] == 'Used']['price_sold'].max()

# Make HTML content with the statistics 
html_content = f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Statistics</title>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <style>
        body {{
            background-color: #D3C7A1;
            color: #252220;
            padding: 20px;
        }}
        .container {{
            max-width: 800px;
            margin: 20px auto;
        }}
        table {{
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
            background-color: #7FAFC0;
            color: #7FAFC0;
        }}
        th, td {{
            padding: 8px;
            text-align: left;
            border-bottom: 1px solid #7FAFC0;
        }}
        th {{
            background-color: #D49D40;
            color: white;
        }}

    </style>
</head>
<body>
    <div class="container">
        <h2 class="text-center">Statistics</h2>
        <table class="table">
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Average Price Sold</th>
                    <th>Lowest Price</th>
                    <th>Highest Price</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>All Items</td>
                    <td>{average_price_all}</td>
                    <td>{lowest_price_all}</td>
                    <td>{highest_price_all}</td>
                </tr>
                <tr>
                    <td>New Items</td>
                    <td>{average_price_new}</td>
                    <td>{lowest_price_new}</td>
                    <td>{highest_price_new}</td>
                </tr>
                <tr>
                    <td>Used Items</td>
                    <td>{average_price_used}</td>
                    <td>{lowest_price_used}</td>
                    <td>{highest_price_used}</td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- Bootstrap JS (optional) -->
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>
"""

# Write HTML content with statistics to stats.html 
with open('stats.html', 'w') as file:
    file.write(html_content)

print("Statistics have been written to stats.html")

