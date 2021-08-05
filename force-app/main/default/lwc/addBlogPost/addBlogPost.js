import { LightningElement, api } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Blog__c.Title__c'
import CONTENT_FIELD from '@salesforce/schema/Blog__c.Content__c'
import DATE_FIELD from '@salesforce/schema/Blog__c.CreatedDate__c'
import EXPERIENCE_OBJECT from '@salesforce/schema/Blog__c'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { createRecord } from 'lightning/uiRecordApi';

export default class AddBlogPost extends LightningElement {

    blogTitle = '';
    blogContent = '';
    blogDate;


    handleTitleChange(event) {
        this.blogTitle = event.target.value;

    }
    handleDescriptionChange(event) {
        this.blogContent = event.target.value;
    }

    addPost() {
        const fields = {};
        fields[NAME_FIELD.fieldApiName] = this.blogTitle;
        fields[CONTENT_FIELD.fieldApiName] = this.blogContent;
        fields[DATE_FIELD.fieldApiName] = this.blogDate;


        const recordInput = { apiName: EXPERIENCE_OBJECT.objectApiName, fields };


        createRecord(recordInput).then(post => {

            this.showToast('Success', 'Review Record Updated', 'success');
            const recordAdded = new CustomEvent('postadded');
            this.dispatchEvent(recordAdded)
        }).catch(error => {
            this.showToast('ERROR', error.body.message, 'error')
        });

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