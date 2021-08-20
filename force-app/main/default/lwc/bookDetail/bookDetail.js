import { LightningElement, api, wire, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { MessageContext, subscribe, unsubscribe, publish } from 'lightning/messageService';
import messageChannel from "@salesforce/messageChannel/messageDemo__c";
import insertRecord from '@salesforce/apex/cartController.insertRecord';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class BookDetail extends NavigationMixin(LightningElement) {


    @api book;
    selectedCartId
    @track quantity = ''

    @wire(MessageContext)
    messageContext;



    buy() {
        insertRecord({
            bookId: this.bookDi,
            quantity: this.quantity,
            booksName: this.bookName,
            price: this.bookPrice
        }).then(() => {
            const messagePayload = {
                status: 'refresh'
            }
            publish(this.messageContext, messageChannel, messagePayload)
            this.showToast('Success', 'Review Record Updated', 'success');

        }).catch((error) => {
            this.showToast('Error', JSON.stringify(error), 'error');
        })
    }




    handleFieldChange(event) {
        this.quantity = event.target.value
    }




    fullDetails() {
        this[NavigationMixin.Navigate]({
            type: "standard__recordPage",
            attributes: {
                recordId: this.book.data.fields.Id.value,
                objectApiName: "Books__c",
                actionName: "view",
            }
        });
    }

    get bookName() {
        try {
            return this.book.data.fields.Name.value;

        } catch (error) {
            return 'NA';
        }
    }
    get bookDi() {
        try {
            return this.book.data.fields.Id.value;

        } catch (error) {
            return 'NA';
        }
    }

    get bookTitle() {
        try {
            return this.book.data.fields.Type__c.value;

        } catch (error) {
            return 'NA';
        }
    }

    get bookAuthor() {
        try {
            return this.book.data.fields.Author__c.value;

        } catch (error) {
            return 'NA';
        }
    }
    get bookQuantity() {
        try {
            return this.book.data.fields.Quantity__c.value;

        } catch (error) {
            return 'NA';
        }
    }
    get bookPrice() {
        try {
            return this.book.data.fields.Price__c.value;

        } catch (error) {
            return 'NA';
        }
    }
    get bookDescribe() {
        try {
            return this.book.data.fields.Description__c.value;

        } catch (error) {
            return 'NA';
        }
    }

    get bookImg() {
        try {
            return this.book.data.fields.PhotoURL__c.value;

        } catch (error) {
            return 'NA';
        }
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