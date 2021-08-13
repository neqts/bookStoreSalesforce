import { LightningElement, wire, track, api } from 'lwc';
import { MessageContext, subscribe, publish } from 'lightning/messageService';
import messageChannel from "@salesforce/messageChannel/messageDemo__c";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import showCartItems from '@salesforce/apex/showCart.showCartItems';
import { refreshApex } from '@salesforce/apex';
import { deleteRecord } from 'lightning/uiRecordApi';


export default class Cart extends LightningElement {
    subscription = null;

    @track text = 'Your items in cart:'
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

        } else if (error) {
        }
    }


    removeRecord(event) {
        deleteRecord(event.target.dataset.id).then(() => {
            refreshApex(this.itemresponse);
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Record deleted successfully',
                    variant: 'success'
                })
            )
        })
    }

    refresh(msg) {
        console.log(msg);
        if (msg.status === 'refresh') {
            refreshApex(this.itemresponse);
        }
    }

    connectedCallback() {
        this.subscription = subscribe(this.messageContext, messageChannel, (msg) => this.refresh(msg))


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