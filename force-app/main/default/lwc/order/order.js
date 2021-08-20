import { LightningElement, track, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import USER_ID from '@salesforce/user/Id';
import NAME_FIELD from '@salesforce/schema/User.Name';
import showCartItems from '@salesforce/apex/showCart.showCartItems';
import createOrder from '@salesforce/apex/orderController.createOrder';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import { MessageContext, subscribe, publish } from 'lightning/messageService';
import messageChannel from "@salesforce/messageChannel/messageDemo__c";
import assignCartItemsToOrder from '@salesforce/apex/showOrder.assignCartItemsToOrder';
import allOrders from '@salesforce/apex/showOrder.allOrders';
import sendEmailToController from '@salesforce/apex/ControllerLwcExample.sendEmailToController';
import uId from '@salesforce/user/Id';



export default class userDetails extends LightningElement {
    subscription = null;
    @track error;
    @track Items = [];

    @track name = '';
    @track email = '';
    @track phone = ''
    @track street = ''
    @track streetNum = ''
    @track flatNum = ''
    @track postalCode = ''
    @track city = ''
    @track country = ''


    userId = uId;


    @track subject = 'Test Email'
    @track body = 'Hello'
    @track toSend = 'ttopor12@gmail.com'

    @wire(MessageContext)
    messageContext;



    handleNameChange(evt) {
        this.name = evt.detail.value;
    }
    handleEmailChange(evt) {
        this.email = evt.detail.value;
    }

    handlePhoneChange(evt) {
        this.phone = evt.detail.value;
    }
    handleStreetChange(evt) {
        this.street = evt.detail.value;
    }
    handleStreetNumberChange(evt) {
        this.streetNum = evt.detail.value;
    }
    handleFlatNumberChange(evt) {
        this.flatNum = evt.detail.value;
    }
    handlePostalCodeChange(evt) {
        this.postalCode = evt.detail.value;
    }
    handleCityChange(evt) {
        this.city = evt.detail.value;
    }
    handleCountryChange(evt) {
        this.country = evt.detail.value;
    }

    get total() {
        return this.Items.map((i) => (i.PriceBooks__c * i.Quantity__c)).reduce((a, b) => a + b, 0)
    }



    @wire(getRecord, {
        recordId: USER_ID,
        fields: [NAME_FIELD]
    }) wireuser({
        error,
        data
    }) {
        if (error) {
            this.error = error;
        } else if (data) {
            this.name = data.fields.Name.value;
        }
    }





    itemresponse
    @wire(showCartItems, { userId: '$userId' })
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

    orders = []

    orderresponse
    @wire(allOrders)
    wiredOrderItems(response) {
        const { data, error } = response;
        this.orderresponse = response
        if (data) {
            this.orders = data

        } else if (error) {
            this.showToast('ERROR', error.body.message, 'error')
        }
    }


    refresh(msg) {
        if (msg.status === 'refresh') {
            refreshApex(this.itemresponse);
        }
    }

    connectedCallback() {
        this.subscription = subscribe(this.messageContext, messageChannel, (msg) => this.refresh(msg))
    }


    handleAprove(evt) {
        evt.preventDefault();
        createOrder({
            email: this.email, price: this.total, phone: this.phone, street: this.street, streetNumber: this.streetNum,
            flatNum: this.flatNum, city: this.city, country: this.country, postalCode: this.postalCode, name: this.name
        }).then((newOrderId) => {
            const orderModify = this.Items.map((item) => item.Id)
            assignCartItemsToOrder({ cartItemsIds: orderModify, orderId: newOrderId });
            this.showToast('Success', 'Review Record Updated', 'success');

            const messagePayload = {
                status: 'refresh'
            }

            publish(this.messageContext, messageChannel, messagePayload)

            const recordInput = { body: this.body, toSend: this.email, subject: this.subject }  //You can send parameters
            sendEmailToController(recordInput)
                .then(() => {
                    //If response is ok
                }).catch(error => {
                    //If there is an error on response
                })



        }).catch((error) => {
            this.showToast('Error', JSON.stringify(error), 'error');
            console.log(error);
        })



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