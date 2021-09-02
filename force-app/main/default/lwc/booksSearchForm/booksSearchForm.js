import { LightningElement,track,wire } from 'lwc';
import getBooks from '@salesforce/apex/BooksSearchCLS.getBooks';

const DELAY =300;


export default class BooksSearchForm extends LightningElement {
    bookName='';
    @track bookList=[];
    @wire(getBooks,{bckName:'$bookName'})
    retriveAccounts({error,data}){
        if(data){
            this.bookList=data;
        }
        else if(error){
            
        }
    }
    handleKeyChange(event){
        const searchString=event.target.value;
        window.clearTimeout(this.delayTimeout);
        this.delayTimeout=setTimeout(()=>{
            this.bookName=searchString;
        },DELAY)

    }
   

}