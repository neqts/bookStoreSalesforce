import { LightningElement,api,wire,track } from 'lwc';
import getBooks from '@salesforce/apex/bookSearchResultController.getBooks';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';



export default class BookSearchResult extends LightningElement {
    @api bookTypeId;
    @track books;
    @api searchType;
    @track selectedBookId;
    
    @wire(getBooks,{bookTypeId:'$bookTypeId',search:'$searchType'})
    wiredBooks({data,error}){  
        if(data){
            this.books=data; 
        }else if(error){
            this.showToast('ERROR',error.body.message,'error');
        }
    }



    bookSelectHandler(event){
        const bookId=event.detail;
        this.selectedBookId= bookId;
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