import { LightningElement, wire } from 'lwc';
import allOrders from '@salesforce/apex/showOrder.allOrders';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import showCartItems from '@salesforce/apex/showCart.showCartItems';
import { refreshApex } from '@salesforce/apex';
import { MessageContext, subscribe } from 'lightning/messageService';
import messageChannel from "@salesforce/messageChannel/messageDemo__c";

export default class Resume extends LightningElement {

    orderedItems
    Items = []
    orderresponse
    @wire(allOrders)
    wiredOrderItems(response) {
        const { data, error } = response;
        this.orderresponse = response
        if (data) {
            this.orderedItems = data

        } else if (error) {
            this.showToast('Error', JSON.stringify(error), 'error');
        }
    }

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


        } else if (error) {
            this.showToast('ERROR', error.body.message, 'error')
        }
    }

    get total() {
        return this.Items.map((i) => (i.PriceBooks__c * i.Quantity__c)).reduce((a, b) => a + b, 0)
    }

    refresh(msg) {
        console.log(msg);
        if (msg.status === 'refresh') {
            refreshApex(this.orderresponse);
        }
    }



    connectedCallback() {
        subscribe(this.messageContext, messageChannel, (msg) => this.refresh(msg))


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