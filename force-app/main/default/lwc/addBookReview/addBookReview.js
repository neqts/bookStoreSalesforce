import DESC_FIELD from '@salesforce/schema/Reviews__c.Description__c'
import NAME_FIELD from '@salesforce/schema/Reviews__c.Name'
import NICK_FIELD from '@salesforce/schema/Reviews__c.Nick__c'
import EXPERIENCE_OBJECT from '@salesforce/schema/Reviews__c'
import BOOK_FIELD from '@salesforce/schema/Reviews__c.Books__c'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { createRecord } from 'lightning/uiRecordApi';
import { LightningElement,api } from 'lwc';
createRecord


export default class AddBookReview extends LightningElement {
    @api bookName;
    @api bookId;
    reviewTitle='';
    reviewDesc='';
    reviewNick='';
    handleTitleChange(event){
        this.reviewTitle=event.target.value;
    }

    handleDescriptionChange(event){
        this.reviewDesc=event.target.value;
    }

    handleNickChange(event){
        this.reviewNick=event.target.value;
    }

    addExperience(){
        const fields ={};
        fields[NAME_FIELD.fieldApiName]=this.reviewTitle;
        fields[DESC_FIELD.fieldApiName]=this.reviewDesc;
        fields[BOOK_FIELD.fieldApiName]=this.bookId;
        fields[NICK_FIELD.fieldApiName]=this.reviewNick;

        const recordInput  = {apiName : EXPERIENCE_OBJECT.objectApiName, fields};

        createRecord(recordInput).then(bookReviews=> {
            this.showToast('Success','Review Record Updated','success');
            const recordAdded = new CustomEvent('reviewadded');
            this.dispatchEvent(recordAdded)
        }).catch(error =>{
           this.showToast('ERROR',error.body.message,'error')
        });

        

    }
    showToast(title,message,variant){
        const evt = new ShowToastEvent({
            title:title,
            message:message,
            variant:variant,
        });
        this.dispatchEvent(evt);
    }
}