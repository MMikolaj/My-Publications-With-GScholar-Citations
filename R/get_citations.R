#### loading packages ####
library(dplyr)
library(tidyr)
library(purrr)
library(scholar)
library(xml2)
library(fuzzyjoin)


#### retrieving data from google scholar

#### IMPORTANT !!!!!!!!!!!!!!!!!! #
google_id <- "u4CfP-UAAAAJ" ## your GOOGLE SCHOLAR ID #

#### author data 

author <- get_profile(google_id)

### publications

pubs <- get_publications(google_id)

## lets check the results
head(pubs)


#### dealing with xml containing publication data ####

xml_path <- "xml/My_Collection.xml" ## IMPORTANT: check the name of your file


## reading xml
my_refs <-read_xml(xml_path)

## nodes with doi

xml_dois <- my_refs %>% 
  xml_find_all(".//electronic-resource-num")

## nodes with title
xml_titles <- my_refs %>% 
  xml_find_all(".//title")

## nodes for each record 

xml_records <- my_refs %>% 
  xml_find_all(".//record")


## df with titles and dois from xml
title_doi_df <- data.frame(title=xml_text(xml_titles),
                           doi=xml_text(xml_dois))

## Titles of publications in the google scholar may differ from those in the xml. Also, google scholar does not provide doi number
##  Using fuzzymatching I joing the table with publication from google scholar with the titles and dois from xml
## I use innerjoin, what helps to remove publications from the google scholar that are not included in the xml


xml_pubs_w_doi <- stringdist_inner_join(title_doi_df, pubs,
                              by="title", 
                              max_dist=12, ignore_case=T) ## max dist is quite large, but, sometime titles may differ a lot

head(xml_pubs_w_doi)

#### adding data to xml ####


## adding cid - google scholar citation id, later it will needed as a link to the google scholar citation website of particular publication
map2(xml_records, xml_pubs_w_doi$cid,
     ~xml_add_child(.x, "cid", .y))

## and number of citations
map2(xml_records, xml_pubs_w_doi$cites,
     ~xml_add_child(.x, "google_cites", .y))


### adding author data

xml_add_child(my_refs, "author_citations", author$total_cites, .where = "before")
xml_add_child(my_refs, "author_h_index", author$h_index, .where = "before")


## inserts date and time of last update; just for housekeeping reasons
xml_add_child(my_refs, "last_update", format(Sys.time(), "%Y-%m-%d %H:%M"), .where = "before") 

## write an updated xmls
write_xml(my_refs, "xml/My_Collection_With_Google_Citations.xml")




