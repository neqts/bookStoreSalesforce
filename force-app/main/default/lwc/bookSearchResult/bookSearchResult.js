import { LightningElement, api, wire, track } from 'lwc';
import getBooks from '@salesforce/apex/bookSearchResultController.getBooks';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { MessageContext, publish, subscribe } from 'lightning/messageService';
import messageChannel from "@salesforce/messageChannel/messageDemo__c";
import { refreshApex } from '@salesforce/apex';




export default class BookSearchResult extends LightningElement {
    @api bookTypeId;
    @track books;
    @api searchType;
    @track selectedBookId;



    @wire(MessageContext)
    msgCntx


    bookresponse
    @wire(getBooks, { bookTypeId: '$bookTypeId', search: '$searchType' })
    wiredBooks(response) {
        const { data, error } = response;
        this.bookresponse = response
        if (data) {
            this.books = data
        } else if (error) {
            console.log(error);
        }
    }


    refresh(msg) {
        if (msg.status === 'refresh') {
            refreshApex(this.bookresponse);
        }
    }


    connectedCallback() {
        subscribe(this.msgCntx, messageChannel, (msg) => this.refresh(msg))
    }

    bookSelectHandler(event) {
        const bookId = event.detail;
        this.selectedBookId = bookId;
        publish(this.msgCntx, messageChannel, { bookId: bookId })
    }


    showToast(title, message, variant) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(evt);
    }
    get booksFound() {
        if (this.books) {
            return true;
        }
        return false;
    }


}