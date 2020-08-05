# toys-mini-pro-yehuda
mini project sever side creating toys db MongoDB Atlas and in node post add/delete/edit get  /search/page/cat ...

1. To display all documents  of toys  as json in DB use this link:
    https://mini-pro-toys-srv-yehuda.herokuapp.com/toys
    
 2. To search a toys in the DB use this like below:
    search query https://mini-pro-toys-srv-yehuda.herokuapp.com/toys/search/?s=<searched item>
    e.g https://mini-pro-toys-srv-yehuda.herokuapp.com/toys/search/?s=iron
    
3. For page limition you to use this link, In the below query string we decide how many toys will display in one page ( limit per page and also the sort order).
     https://mini-pro-toys-srv-yehuda.herokuapp.com/toys/limit/<inset a number>
     the num after limlt/<number> mean how may item for documents in the to skip and to display it 
      e.g https://mini-pro-toys-srv-yehuda.herokuapp.com/toys/limit/2
      in the example above it will skip 8 (2* 4 ) items and what is left by defualt it set to 4.
      
4. to get the amount of toys all in the db use this link:
      https://mini-pro-toys-srv-yehuda.herokuapp.com/toys/countToys
 
 5. To get the amount of toys in categoery use the this url domain/toys/catCount/<cat name>
    e.g https://mini-pro-toys-srv-yehuda.herokuapp.com/toys/catCount/Dolls
    it's case sensitive on <cat name> you need as the catgory writen in the DB.

 6. Filter out toys by category for the db use the the url like this domain/toys/cat/<cat name>
    e.g https://mini-pro-toys-srv-yehuda.herokuapp.com/toys/cat/Dolls
    it's case sensitive on <cat name> you need as the catgory writen in the DB.
    
 7. To get a single toy  use domain/toys/single/<id>
    e.g https://mini-pro-toys-srv-yehuda.herokuapp.com/toys/single/5f259a517282f945d396a38e
    
To add or to edit or to delete toys to/in/from the you need to usd post method by use postman tool.

8. The add toy to DB use this the template you in the postman body->row->json
   insert in the post field this url:
   https://mini-pro-toys-srv-yehuda.herokuapp.com/toys/add
   in body:
     {  
        "name": "Simba",
        "category": "Animals",
        "image": "https://cdn.pixabay.com/photo/2020/05/03/08/25/mask-duty-5124245__340.jpg",
        "price": 990
    }
    
9. To edit a toy in the DB use this the template you in the postman body->row->json
      insert in the post field this url:
      https://mini-pro-toys-srv-yehuda.herokuapp.com/toys/edit
     in body:
     {
       "id":"o5f25e50d85d9f70c24086f98",
        "name": "Lion with corona",
        "category": "Animals",
        "image": "https://cdn.pixabay.com/photo/2020/05/03/08/25/mask-duty-5124245__340.jpg",
        "price": 90
    }
    
10.  to delete toy from the DB use this the template you in the postman body->row->json
      insert in the post field this url:
      https://mini-pro-toys-srv-yehuda.herokuapp.com/toys/del
     in body:
      {
       
        "del":"5f25eop50d85d9f70c24086f98"
     }
     
 11. to find out all toys you want between the minium price to the maxium you input in the string query
      use this url https://mini-pro-toys-srv-yehuda.herokuapp.com/toys/prices/?min=<mini number>&max=<mav number>
      e.g https://mini-pro-toys-srv-yehuda.herokuapp.com/toys/prices/?min=20&max=45 here you will toys that cost between 20-45 include.
      if there not value in the min or below zero by defualt the min is 0 and also in the there isn't a value it's set to 99999. 
      
     


     
  
