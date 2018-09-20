import { Injectable } from '@angular/core';

// IMPORT HTTP MODULE FROM ANGULAR
import { HttpClient } from '@angular/common/http';

// API URL
let API = 'http://localhost:5000/search/';

@Injectable({
  providedIn: 'root'
})
export class DataService {

    // CACHE DATA ARRAY
    stuff: Object;
    
    // DEFINE A PRIVATE INSTANCE OF THE HTTPCLIENT OBJECT
  constructor(private http: HttpClient) { }
    
    /*

      vvv DEFINING METHODS vvv

    */

    // GET DATA METHOD
    getData(search) {
        
        // CHECK IF SEARCH VALUE EXIST AND IS IN GOOD SHAPE
        if( search.length == 0 || search == false || search == null || search == undefined ){
            
            // IF ITS NOT RETURN A EMPTY ARRAY
            return []; 
            
        } else {
                
            // SET CACHE TO RESULTS OF SERVER CALL
            this.stuff = this.http.get(API+search);

            // RETURN DATA
            return this.stuff; 
            
        }
        
         
    }
    
}
