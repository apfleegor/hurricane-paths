# from turtle import pd
from splinter import Browser
from bs4 import BeautifulSoup as bs
import time
from webdriver_manager.chrome import ChromeDriverManager
import re
import pandas as pd
import numpy as np

def get_hurr_ids():
    hurricane_data = pd.read_json("static/js/test.json")
    hurricane_data["Year"] = hurricane_data["Year"].astype(str)
    hurricane_data["id"] = hurricane_data["Name"].str.lower() + hurricane_data["Year"].str.slice(start=2)
    return hurricane_data["id"].unique().tolist()

def scrape_gifs():      
    # Set up Splinter
    executable_path = {'executable_path': ChromeDriverManager().install()}
    browser = Browser('chrome', **executable_path, headless=False)

    url = "https://bmcnoldy.rsmas.miami.edu/tropics/radar/"
    browser.visit(url)

    time.sleep(1)

    # Scrape page into Soup
    html = browser.html
    soup = bs(html, "html.parser")


    #Read in Data from json
    hurricane_data = get_hurr_ids()
    nums = '\d+'


    # for loop for getting all of the hrefs on the page and filtering to only return the .gifs
    href_array = []
    hurricanes = []
    for link in soup.find_all('a', attrs={'href': re.compile("^tropics")}):

        href_link = link.get('href')
        
        for hurricane in hurricane_data:
            hurricane_link = "tropics/" + hurricane
            if href_link.startswith(hurricane_link):

                href_array.append(href_link)
                hurricanes.append(hurricane)
        
        
    df = pd.DataFrame({'hurricane': hurricanes,
                        'gif_url': href_array})


    # if WHATEVER does not end in '.gif' drop from array
    gif_df = df[df['gif_url'].str.endswith('.gif')]

    # clean up df
    gif_df = gif_df.drop_duplicates(subset=["hurricane"], keep='last')
    gif_df = gif_df.reset_index(drop=True)
    gif_df["name"] = gif_df["hurricane"].str.slice(stop=-2)
    gif_df["name"] = gif_df["name"].str.capitalize()
    gif_df["year"] = gif_df["hurricane"].str.slice(start=-2)
    gif_df["full_year"] = gif_df["year"].apply(lambda x: "20" + x if int(x) < 50 else "19" + x)
    gif_df["id"] = gif_df["name"] + " " + gif_df["full_year"]

    final_df = gif_df[["gif_url", "id"]]

    
    final_df.to_json('static/js/gif_scrape.json')

    # browser.quit()



scrape_gifs()