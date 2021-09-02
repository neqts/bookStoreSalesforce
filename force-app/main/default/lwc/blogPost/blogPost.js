import { LightningElement, wire, track } from 'lwc';
import getPosts from '@salesforce/apex/BlogPosts.getPosts';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import BLOG_ID from '@salesforce/schema/Blog__c.Id'
import BLOG_TITLE from '@salesforce/schema/Blog__c.Title__c'
import BLOG_CONTENT from '@salesforce/schema/Blog__c.Content__c'
import { getRecord } from 'lightning/uiRecordApi';
import { MessageContext, subscribe } from 'lightning/messageService';
import messageChannel from "@salesforce/messageChannel/messageDemo__c";
import { refreshApex } from '@salesforce/apex';
import { subscribe as subscribePE, unsubscribe as unsubscribePE, onError } from 'lightning/empApi';


const CHANEL = '/event/createRecord__e'
const fields = [
    BLOG_ID,
    BLOG_TITLE,
    BLOG_CONTENT

]

export default class BlogPost extends LightningElement {
    @track main = [];
    @track blogId;
    @track selectedBlogId;
    subscritpionPe;


    @wire(MessageContext)
    msgCntx


    refresh(msg) {
        if (msg.status === 'refresh') {
            refreshApex(this.bookresponse);
        }
    }


    handleSubscribePE() {
        subscribePE(CHANEL, -1, (msg) => {
            this.refresh({ status: 'refresh' });

        })
    }





    connectedCallback() {
        subscribe(this.msgCntx, messageChannel, (msg) => this.refresh(msg))
    }


    @wire(getRecord, { recordId: '$blogId', fields })
    blog;


    bookresponse;
    @wire(getPosts)
    wiredPosts(response) {
        const { data, error } = response;
        this.bookresponse = response
        if (data) {

            this.main = data;
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



}