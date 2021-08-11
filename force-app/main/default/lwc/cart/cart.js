import { LightningElement, wire, track } from 'lwc';
import { MessageContext, subscribe } from 'lightning/messageService';
import messageChannel from "@salesforce/messageChannel/messageDemo__c";
import getBookDetails from '@salesforce/apex/SelectBookById.getBookDetails';
import insertRecords from '@salesforce/apex/cartController.insertRecords';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';




export default class Cart extends LightningElement {
    @track cartId = ''
    subscription = null;
    @track books;
    @track cartItems = [];



    @wire(MessageContext)
    messageContext;



    bookresponse
    @wire(getBookDetails, { cartIds: '$cartItems' })
    wiredBooks(response) {
        const { data, error } = response;
        this.bookresponse = response
        if (data) {
            this.books = data
        } else if (error) {
        }
    }




    connectedCallback() {
        this.subscription = subscribe(this.messageContext, messageChannel, (msg) => this.handleMessge(msg))
    }

    handleMessge(msg) {
        this.cartItems = [...this.cartItems, msg.cartId];
    }
    handleClick() {
        insertRecords({ booksIds: this.cartItems }).then((data) => {
            if (data) {
                this.showToast('Success', 'Review Record Updated', 'success');
            } else if (error) {
                his.showToast('Error', 'Error', 'error');
            }
        });
    }


    showToast(title, message, variant) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(evt);
    }

}