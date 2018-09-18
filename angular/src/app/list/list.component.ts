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
    public filtered: Object;
    // CACHE SEARCH PARAM
    public search: String;
    
    // ALLOW COMPONENT TO USE THE DATA SERVICE
  constructor( private data: DataService ) { }
    
    // TRIGGER WHEN SEARCH IS CHANGING
  onKeyUp(value: string){
      
      // USE OUR SERVICE TO ALTER LIST RESULTS
      this.data.getData(value).subscribe(
          data => this.filtered = data 
        );
      
  }

}
