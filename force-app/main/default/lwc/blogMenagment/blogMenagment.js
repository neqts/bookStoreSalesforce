import { getRecord } from 'lightning/uiRecordApi';
import { LightningElement, wire, track } from 'lwc';
import { MessageContext, publish, subscribe } from 'lightning/messageService';
import messageChannel from "@salesforce/messageChannel/messageDemo__c";
import BLOG_ID from '@salesforce/schema/Blog__c.Id'
import BLOG_CONTENT from '@salesforce/schema/Blog__c.Content__c'
import BLOG_TITLE from '@salesforce/schema/Blog__c.Title__c'



const fields = [
    BLOG_ID,
    BLOG_TITLE,
    BLOG_CONTENT
]


export default class BlogMenagment extends LightningElement {

    @track blogId = '';
    @track selectTabValue

    @wire(MessageContext)
    msgCntx
    handleMessge(msg) {
        this.blogId = msg.postId
        console.log(this.blogId);
    }

    @wire(getRecord, { blogId: '$blogId', fields })
    blog

    connectedCallback() {
        subscribe(this.msgCntx, messageChannel, (msg) => this.handleMessge(msg))
        console.log(this.blog.data)

    }

    callBackMethod(payload) {
        this.blogId = payload
    }



    tabChangeHanlder(event) {
        this.selectTabValue = event.target.value;
    }
    get blogFound() {
        if (this.blog.data) {
            return true
        } else {
            return false
        }
    }


}