import { LightningElement, api, wire, track } from 'lwc';
import magazineType from '@salesforce/apex/magazineSearchResult.magazineType';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import QUANTITY_FIELD from '@salesforce/schema/Books__c.Quantity__c';
import OBJECT_API_NAME from '@salesforce/schema/Books__c';
import PRICE_FIELD from '@salesforce/schema/Books__c.Price__c';
import NAME_FIELD from '@salesforce/schema/Books__c.Name';
import magazineQunatityType from '@salesforce/apex/magazineSearchResult.magazineQunatityType';
import { refreshApex } from '@salesforce/apex';


export default class MagazineSearchResult extends LightningElement {

    @api bookTypeId;
    @track books
    @api bookId = '';
    @track magazineQuantity;
    @track testId




    @wire(magazineType, { bookTypeId: '$bookTypeId' })
    wiredBooks({ data, error }) {
        if (data) {
            this.books = data
            this.testId = data.Id

        } else if (error) {
            this.showToast('ERROR', error.body.message, 'error');
        }
    }


    magazineresponse
    @wire(magazineQunatityType, { bookTypeId: '$bookTypeId' })
    wiredQuantity(response) {
        const { data, error } = response;
        this.magazineresponse = response
        if (data) {
            this.magazineQuantity = data[0]
        } else if (error) {
            this.showToast('ERROR', error.body.message, 'error');
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



    handleSave() {
        this.showToast('Success', 'Review Record Updated', 'success');
        refreshApex(this.magazineresponse);
    }



    get fields() { return [this.quantityField, this.priceField] }


    get quantityField() {
        try {
            return QUANTITY_FIELD;

        } catch (error) {
            return 'NA';
        }
    }

    get nameField() {
        try {
            return NAME_FIELD;

        } catch (error) {
            return 'NA';
        }
    }


    get priceField() {
        try {
            return PRICE_FIELD

        } catch (error) {
            return 'NA';
        }
    }


    get objectField() {
        try {
            return OBJECT_API_NAME;

        } catch (error) {
            return 'NA';
        }
    }


    get bookFound() {
        if (this.books) {
            return true
        }
        return false

    }
    get test() {
        if (this.magazineQuantity.quntity > 100) {
            return 'green'
        }
        return 'red'

    }
    get quantityFound() {
        if (this.magazineQuantity) {
            return true
        }
        return false
    }
}