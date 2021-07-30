import { LightningElement,api,wire,track } from 'lwc';
import getBooks from '@salesforce/apex/bookSearchResultController.getBooks';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class BookSearchResult extends LightningElement {
    @api bookTypeId;
    @track books;
    @api searchType;
    
    @wire(getBooks,{bookTypeId:'$bookTypeId',search:'$searchType'})
    wiredBooks({data,error}){  
        if(data){
            this.books=data; 
            console.log(this.searchType) 
        }else if(error){
            this.showToast('ERROR',error.body.message,'error');
        }
    }
    

    showToast(title,message,variant){
        const evt = new ShowToastEvent({
            title:title,
            message:message,
            variant:variant,
        });
        this.dispatchEvent(evt);
    }
    get booksFound(){
        if(this.books){
            return true;
        }
        return false;
    }

}