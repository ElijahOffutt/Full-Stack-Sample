import { Component, OnInit } from '@angular/core';
// IMPORT THE CUSTOME DATA SERVICE FOR HANDLING HTTP REQUEST
import { DataService } from '../data.service'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit, OnChanges {

    // CACHE ITEMS IN AN ARRAY FOR LOOPING
    public unfiltered: Object;
    // CACHE ITEMS IN AN ARRAY FOR LOOPING
    public filtered: Object;
    // CACHE SEARCH PARAM
    public search: String;
    
    // ALLOW COMPONENT TO USE THE DATA SERVICE
  constructor( private data: DataService ) { }
    
    ngOnInit(){}
    
    // TRIGGER WHEN SEARCH IS CHANGING
  onKeyUp(value: string){
      
      // CHECK IF SEARCH PARAM EXISTS
      if(value.length <= 1){
      
      // USE OUR SERVICE TO ALTER LIST RESULTS
      this.data.getData(value).subscribe(
          // SET RETURNED DATA
          data => this.filtered = data
        );
        
        // USE OUR SERVICE TO ALTER LIST RESULTS
        this.data.getData(value).subscribe(
          // SET RETURNED DATA
          data => this.unfiltered = data
        );
          
          // SHOW REQUEST SENT
          console.log('Request Sent');
          
          // IF SEARCH PARAM IS EMPTY
      } else{
       
          // SET DATA TO A FILTERED VERSION OF IT SELF
          this.filtered = this.unfiltered.filter( (x)=>{
              
              // FILTER RETURNED DATA
              return JSON.stringify(x.user).match(value) || JSON.stringify(x.title).match(value) || JSON.stringify(x.url).match(value);
              
          } );
          
      }
      
  }

}
