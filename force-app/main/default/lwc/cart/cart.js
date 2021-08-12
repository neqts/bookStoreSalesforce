import { LightningElement, wire, track, api } from 'lwc';
import { MessageContext, subscribe } from 'lightning/messageService';
import messageChannel from "@salesforce/messageChannel/messageDemo__c";
import getBookDetails from '@salesforce/apex/SelectBookById.getBookDetails';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import showCartItems from '@salesforce/apex/showCart.showCartItems';
import { refreshApex } from '@salesforce/apex';
import { deleteRecord } from 'lightning/uiRecordApi';


export default class Cart extends LightningElement {
    subscription = null;
    subscriptionRefresh = null
    subscriptionRefreshDelete = null

    @track Items
    @track itemId = ''
    @api tableLength



    @wire(MessageContext)
    messageContext;





    itemresponse
    @wire(showCartItems)
    wiredCartItems(response) {
        const { data, error } = response;
        this.itemresponse = response
        if (data) {
            this.Items = data
            this.tableLength = data.length
            console.log(data);

        } else if (error) {

        }
    }
    disconnectedCallback() {
        unsubscribe(this.subscriptionRefresh);

    }

    removeRecord(event) {
        deleteRecord(event.target.dataset.id).then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Record deleted successfully',
                    variant: 'success'
                })
            )

        })
        this.subscriptionRefreshDelete = subscribe(this.messageContext, messageChannel, (msg) => this.refresh(msg))
    }

    refresh(msg) {
        console.log(msg.status);
        if (msg.status === 'refresh') {
            refreshApex(this.itemresponse);
        }
    }

    connectedCallback() {
        this.subscription = subscribe(this.messageContext, messageChannel, (msg) => this.handleMessge(msg))
        this.subscriptionRefresh = subscribe(this.messageContext, messageChannel, (msg) => this.refresh(msg))
        this.subscriptionRefreshDelete
    }

    handleMessge(msg) {
        this.cartItems = [...this.cartItems, msg.cartId];

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