import os, errno
from bs4 import BeautifulSoup
from selenium import webdriver
import urllib, urllib.request
import time
import random
from selenium.webdriver.common.keys import Keys
import argparse

parser = argparse.ArgumentParser()
parser.add_argument("-S", "--search", help='search the parameter from web')
parser.add_argument("-N", "--number", default=20, help='crawling count, default is 20')
args = parser.parse_args()

search = args.search
number = int(args.number)

base_folder = 'image/'
base_url = 'https://www.google.com/search'
webDriver = "../../CromeDriver/chromedriver.exe"
browser = webdriver.Chrome(webDriver)

def Crawl(word):
    params ={
        "q":word
        ,"tbm":"isch"
        ,"sa":"1"
        ,"source":"lnms&tbm=isch"
    }

    url = base_url + '?' + urllib.parse.urlencode(params)
    browser.get(url)
    html = browser.page_source
    time.sleep(0.5)

    soup_temp = BeautifulSoup(html,'html.parser')
    img4page = len(soup_temp.findAll("img"))
    
    elem = browser.find_element_by_tag_name("body")
    imgCnt = 0
    while imgCnt < number*10:
        elem.send_keys(Keys.PAGE_DOWN)
        rnd = random.random()
        time.sleep(rnd)
        imgCnt+=img4page

    html = browser.page_source
    soup = BeautifulSoup(html,'html.parser')
    img = soup.findAll("img")

    browser.find_elements_by_tag_name('img')

    fileNum=0
    srcURL=[]

    for line in img:
        if str(line).find('data-src') != -1 and str(line).find('http')<100:  
            print("%3d : " % fileNum, line['data-src'])  
            srcURL.append(line['data-src'])
            fileNum+=1

    saveDir = base_folder + word + '/'

    try:
        if not(os.path.isdir(saveDir)):
            os.makedirs(os.path.join(saveDir))
    except OSError as e:
        if e.errno != errno.EEXIST:
            print("[%s] Error  : Failed to create directory!!!!!" % word)
            raise

    for i,src in zip(range(fileNum),srcURL):
        urllib.request.urlretrieve(src, saveDir+word+"_%03d.jpg" % i)
        print("[%s] Notice : %3d saved" % (word, i))

if search:
    print('---    Crawling Start    ---')
    Crawl(search)
    print('---  Crawling Complete   ---')
else:
    search_list = []
    print('--- Read from search.txt ---')
    with open('search.txt', 'r', encoding='UTF8') as f:
        search_list = f.readlines()
    print('---   Reading Complete   ---')
    print('---    Crawling Start    ---')
    for search in search_list:
        print('Search :', search)
        Crawl(search.rstrip())
    print('---  Crawling Complete   ---')

browser.close()