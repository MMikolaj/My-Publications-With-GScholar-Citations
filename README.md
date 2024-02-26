# Listing your publications with Google Scholar citation data

## Introduction

The project aims to use an R script to extract number of citations from Google Scholar, combining it with xml generated by a reference manager and showing everything in nice formatted way on a html page using javascript.

The result can be seen [here](https://mmikolaj.github.io/My-Publications-With-GScholar-Citations/)

## Usage

### Step 1

To make it work you need to export list of your publications from your reference manager (e.g., Mendeley, Zenodo) in a .xml format.

### Step 2

In an get_citations.R file you need to provide your author ID from google scholar.

![Google Scholar author ID](GS_ID.png)

The script will retrieve your total number of citations and H index from google scholar, and number of citations for each publications. Then this data will be added to the .xml file you extracted from reference manager and everything will be saved in a separate file, for housekeeping.

### Step 3

In the index.html file fill your personal data, links to you socials (ORCID, X (Twitter), Github). Based on your last name provided in the \<`h1 id="author">` your name will be bold in each of your publications.

## Automatisation

The R script can be executed regularly to provide updates of the citation on various ways. One way is to use system task scheduler. In this case, a command that will send the updated xml file to the server hostin the website should be added. This can be done with

`RCurl::ftpUpload(what="xml/My_Collection_With_Google_Citations.xml",       to="sftp://username:password@adress/My_Collection_With_Google_Citations.xml")`

Other option is to use github actions, like it is done in this repository on a weekly basis.
