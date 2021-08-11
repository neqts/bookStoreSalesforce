import { LightningElement, track, wire, api } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Books__c.Name';
import OBJECT_API_NAME from '@salesforce/schema/Books__c';
import AUTHOR_FIELD from '@salesforce/schema/Books__c.Author__c'
import PHOTO_FIELD from '@salesforce/schema/Books__c.Picture__c'
import DESCRIPTION_FIELD from '@salesforce/schema/Books__c.Description__c';
import QUANTITY_FIELD from '@salesforce/schema/Books__c.Quantity__c';
import PRICE_FIELD from '@salesforce/schema/Books__c.Price__c';
import PICTURE_URL_FIELD from '@salesforce/schema/Books__c.PhotoURL__c'
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { deleteRecord } from 'lightning/uiRecordApi';
import getDetails from '@salesforce/apex/BookDetail.getDetails';
import { MessageContext, subscribe, unsubscribe, publish } from 'lightning/messageService';
import messageChannel from "@salesforce/messageChannel/messageDemo__c";




export default class BookForm extends NavigationMixin(LightningElement) {



    @track lstOppotunities = []
    @api bookId = '';
    @track status;
    subscription = null;
    @wire(MessageContext)
    msgCtx
    handleMessge(msg) {
        this.bookId = msg.bookId
        this.status = msg.status

    }



    constructor() {
        super();
        getDetails({}).then(response => {
            this.lstOppotunities = response
        }).catch(error => {
            this.showToast('ERROR', error.body.message, 'error')
        })
    }

    deleteBook() {
        deleteRecord(this.bookId).then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Record deleted successfully',
                    variant: 'success'
                })
            )
            const messagePayload = {
                status: 'refresh'
            }
            publish(this.msgCtx, messageChannel, messagePayload)
        })

    }

    connectedCallback() {
        if (!this.subscription) {
            this.subscription = subscribe(this.msgCtx, messageChannel, (msg) => this.handleMessge(msg))

        }
    }
    disconnectedCallback() {
        unsubscribe(this.subscription);
    }






    createNewBookType() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: "Books__c",
                actionName: 'new'
            },
            state: {
                nooverride: 1,
                navigationLocation: 'RELATED_LIST',

            }
        }

        )
        const messagePayload = {
            status: 'refresh'
        }
        function abla() {
            console.log('XYZ');
            publish(this.msgCtx, messageChannel, messagePayload)
        }

        setTimeout(function () {
            abla()
        }, 2000);


    }




    get fields() { return [this.bookName, this.authorName, this.descriptionField, this.pictureUrl, this.quantityField, this.priceField, this.photoImg] }



    get bookName() {
        try {
            return NAME_FIELD;

        } catch (error) {
            return 'NA';
        }
    }
    get authorName() {
        try {
            return AUTHOR_FIELD;

        } catch (error) {
            return 'NA';
        }
    }
    get photoImg() {
        try {
            return PHOTO_FIELD;

        } catch (error) {
            return 'NA';
        }
    }


    get pictureUrl() {
        try {
            return PICTURE_URL_FIELD;

        } catch (error) {
            return 'NA';
        }
    }


    get descriptionField() {
        try {
            return DESCRIPTION_FIELD;

        } catch (error) {
            return 'NA';
        }
    }



    get quantityField() {
        try {
            return QUANTITY_FIELD;

        } catch (error) {
            return 'NA';
        }
    }



    get priceField() {
        try {
            return PRICE_FIELD;

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


    showToast(title, message, variant) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(evt);
    }

}