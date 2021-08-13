import { LightningElement, wire, track, api } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import { MessageContext, subscribe } from 'lightning/messageService';
import messageChannel from "@salesforce/messageChannel/messageDemo__c";
import { CurrentPageReference } from 'lightning/navigation';


import BOOK_ID from '@salesforce/schema/Books__c.Id'
import BOOK_NAME from '@salesforce/schema/Books__c.Name'
import BOOK_AUTHOR from '@salesforce/schema/Books__c.Author__c'
import BOOK_PRICE from '@salesforce/schema/Books__c.Price__c'
import BOOK_DESCRIPTION from '@salesforce/schema/Books__c.Description__c'
import BOOK_TYPE from '@salesforce/schema/Books__c.Type__c'
import BOOK_QUANTITY from '@salesforce/schema/Books__c.Quantity__c'
import BOOK_IMG from '@salesforce/schema/Books__c.PhotoURL__c'

const fields = [
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
    subscription
    @api tableLength;

    @wire(CurrentPageReference) pageRef;
    @wire(MessageContext)
    msg


    @wire(getRecord, { recordId: '$bookId', fields })
    book;

    connectedCallback() {
        this.subscription = subscribe(this.msg, messageChannel, (msg) => this.callBackMethod(msg))
    }

    callBackMethod(payload) {
        this.bookId = payload.bookId;
    }


    tabChangeHanlder(event) {
        this.selectedTabValue = event.target.value;
    }
    reviewAddedHandler() {
        const bookReviewComponent = this.template.querySelector('c-book-reviews');
        if (bookReviewComponent) {
            bookReviewComponent.getBookReviews();
        }

        this.selectedTabValue = 'viewexperience';
    }

    get bookFound() {
        if (this.book.data) {
            return true
        }
        return false
    }
}