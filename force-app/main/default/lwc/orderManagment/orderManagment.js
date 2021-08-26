import { LightningElement, wire } from 'lwc';
import allOrdersSumarry from '@salesforce/apex/showOrder.allOrdersSumarry';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import OBJECT_API_NAME from '@salesforce/schema/Order__c';
import STATUS from '@salesforce/schema/Order__c.Status__c';


export default class OrderManagment extends LightningElement {

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



    showToast(title, message, variant) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(evt);
    }
    get fields() { return [this.status] }


    get objectApiName() {
        try {
            return OBJECT_API_NAME;

        } catch (error) {
            return 'NA';
        }
    }

    get status() {
        try {
            return STATUS;

        } catch (error) {
            return 'NA';
        }
    }


}