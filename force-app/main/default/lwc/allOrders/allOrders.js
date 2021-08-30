import { LightningElement, wire, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import allOrdersSumarry from '@salesforce/apex/showOrder.allOrdersSumarry';
import { MessageContext, subscribe } from 'lightning/messageService';
import messageChannel from "@salesforce/messageChannel/messageDemo__c";
import OBJECT_API_NAME from '@salesforce/schema/Order__c';
import EMAIL from '@salesforce/schema/Order__c.Email__c';
import NAME from '@salesforce/schema/Order__c.Name__c';
import CITY from '@salesforce/schema/Order__c.City__c';
import COUNTRY from '@salesforce/schema/Order__c.Country__c';
import PHONE from '@salesforce/schema/Order__c.Phone__c';
import { refreshApex } from '@salesforce/apex';
import { deleteRecord } from 'lightning/uiRecordApi';
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
            this.check()
        } else if (error) {
            this.showToast('ERROR', error.body.message, 'error')
        }
    }

    check() {
        this.testitems = this.testitems.map((i) => ({ ...i, statusCheck: i.Status__c === "New" }))
    }

    refresh(msg) {
        if (msg.status === 'refresh') {
            refreshApex(this.bookresponse);
        }
    }


    connectedCallback() {
        subscribe(this.msg, messageChannel, (msg) => this.refresh(msg))
    }

    handleSubmit() {
        this.template.querySelectorAll('lightning-record-edit-form').forEach((i) => i.submit())

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


    removeRecord(event) {
        deleteRecord(event.target.dataset.id).then(() => {
            refreshApex(this.testresponse);
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Record deleted successfully',
                    variant: 'success'
                })
            )
        })
    }





    get objectApiName() {
        try {
            return OBJECT_API_NAME;

        } catch (error) {
            return 'NA';
        }
    }

    get email() {
        try {
            return EMAIL;

        } catch (error) {
            return 'NA';
        }
    }
    get nameText() {
        try {
            return NAME;

        } catch (error) {
            return 'NA';
        }
    }
    get city() {
        try {
            return CITY;

        } catch (error) {
            return 'NA';
        }
    }
    get country() {
        try {
            return COUNTRY;

        } catch (error) {
            return 'NA';
        }
    }
    get phone() {
        try {
            return PHONE;

        } catch (error) {
            return 'NA';
        }
    }
}