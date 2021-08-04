import { LightningElement,wire,track } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import { registerListener } from 'c/pubsub';
import { unregisterAllListeners } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';


import BOOK_ID from '@salesforce/schema/Books__c.Id'
import BOOK_NAME from '@salesforce/schema/Books__c.Name'
import BOOK_AUTHOR from '@salesforce/schema/Books__c.Author__c'
import BOOK_PRICE from '@salesforce/schema/Books__c.Price__c'
import BOOK_DESCRIPTION from '@salesforce/schema/Books__c.Description__c'
import BOOK_TYPE from '@salesforce/schema/Books__c.Type__c'
import BOOK_QUANTITY from '@salesforce/schema/Books__c.Quantity__c'
import BOOK_IMG from '@salesforce/schema/Books__c.PhotoURL__c'

const fields=[
    BOOK_ID,
    BOOK_NAME,
    BOOK_AUTHOR,
    BOOK_DESCRIPTION,
    BOOK_TYPE,
    BOOK_QUANTITY,
    BOOK_IMG,
    BOOK_PRICE

]


export default class BookDetails extends LightningElement {
    @track bookId;
    @track selectedTabValue;


    @wire(CurrentPageReference) pageRef;

    @wire(getRecord,{ recordId : '$bookId',fields})
    book;

    connectedCallback(){
        registerListener('bookselect',this.callBackMethod,this)
       
    }
    callBackMethod(payload){
        this.bookId=payload;
    }

    disconnectedCallback(){
        unregisterAllListeners(this);
    }


    tabChangeHanlder(event){
        this.selectedTabValue = event.target.value;
    }
    reviewAddedHandler(){
        const bookReviewComponent = this.template.querySelector('c-book-reviews');
        if(bookReviewComponent){
            bookReviewComponent.getBookReviews();
        }

        this.selectedTabValue = 'viewexperience';
    }

    get bookFound(){
        if(this.book.data){
            return true
        }
        return false
    }
}