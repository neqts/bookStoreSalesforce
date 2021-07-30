import { LightningElement,track } from 'lwc';

export default class BookSearchOne extends LightningElement {

    @track bookTypeId='' ;
    searchTypeValue='';
  
    bookTypeSelectHandler(event){
        this.bookTypeId=event.detail;
        console.log(this.bookTypeId);
    }
 
    handleSearch(event){
        this.searchTypeValue=event.detail;
    }
}