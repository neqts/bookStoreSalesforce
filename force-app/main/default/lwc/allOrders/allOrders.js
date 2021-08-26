import { LightningElement, wire, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import allOrdersSumarry from '@salesforce/apex/showOrder.allOrdersSumarry';
import { MessageContext, subscribe } from 'lightning/messageService';
import messageChannel from "@salesforce/messageChannel/messageDemo__c";
import { refreshApex } from '@salesforce/apex';
export default class AllOrders extends LightningElement {


    @track clickedButtonLabel = 'Details';
    @track boolVisible = false;
    @track name = false
    @track text
    @track text2
    @track text3

    @wire(MessageContext)
    msg

    testitems = []
    testresponse
    @wire(allOrdersSumarry)
    wiredTest(response) {
        const { data, error } = response;
        this.testresponse = response
        if (data) {
            this.testitems = data
            console.log(data);
        } else if (error) {
            this.showToast('ERROR', error.body.message, 'error')
        }
    }

    refresh(msg) {
        if (msg.status === 'refresh') {
            refreshApex(this.bookresponse);
        }
    }


    connectedCallback() {
        subscribe(this.msg, messageChannel, (msg) => this.refresh(msg))
    }




    showToast(title, message, variant) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(evt);
    }



    show() {
        if (this.name === true) {
            this.text = "Name:"
            this.text2 = 'Quantity:'
            this.text3 = 'Price:'
            this.text4 = 'User:'
            return this.text5 = 'Summary Price:'
        } else if (this.name === false) {
            this.text = ''
            this.text2 = ''
            this.text3 = ''
            this.text4 = ''
            return this.text5 = ''
        }
    }

    handleClick(event) {
        const label = event.target.label;



        if (label === 'Details') {

            this.clickedButtonLabel = 'Hide';
            this.boolVisible = true;
            this.name = true

        } else if (label === 'Hide') {

            this.clickedButtonLabel = 'Details';
            this.boolVisible = false;
            this.name = false

        }
        this.show()
    }
}