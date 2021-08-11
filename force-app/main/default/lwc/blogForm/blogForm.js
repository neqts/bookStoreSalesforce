import { LightningElement, track, wire, api } from 'lwc';
import OBJECT_API_NAME from '@salesforce/schema/Blog__c';
import TITLE_FIELD from '@salesforce/schema/Blog__c.Title__c';
import CONTENT_FIELD from '@salesforce/schema/Blog__c.Content__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { MessageContext, subscribe, unsubscribe, publish } from 'lightning/messageService';
import messageChannel from "@salesforce/messageChannel/messageDemo__c";
import { NavigationMixin } from 'lightning/navigation';
import { deleteRecord } from 'lightning/uiRecordApi';
import { subscribe as subsribeEmp, unsubscribe as unsubscribeEmp, onError } from 'lightning/empApi';


const CHANEL = '/event/createRecord__e'
export default class BlogForm extends NavigationMixin(LightningElement) {

    @api blogId = '';
    subscription = null;
    subscritpionPe;


    @wire(MessageContext)
    msgCtx
    handleMessge(msg) {
        this.blogId = msg.postId
    }


    handlePe() {
        subsribeEmp(CHANEL, -1, (msg) => this.handlePeMessage(msg)
        ).then(response => this.subscritpionPe = response)

        onError((error) => console.log(error))
    }


    handlePeMessage(msg) {
        this.blogId = msg.data.payload.blog__c;

    }

    connectedCallback() {
        if (!this.subscription) {
            this.subscription = subscribe(this.msgCtx, messageChannel, (msg) => this.handleMessge(msg))

        }
        this.handlePe()
    }
    createNewBlogPost() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: "Blog__c",
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

        publish(this.msgCtx, messageChannel, messagePayload)

    }


    deleteBlogPost() {

        deleteRecord(this.blogId).then(() => {

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

    disconnectedCallback() {
        unsubscribe(this.subscription);
        unsubscribeEmp(this.subscritpionPe)
    }

    get fields() { return [this.blogTitle, this.contentField] }


    get blogTitle() {
        try {
            return TITLE_FIELD;

        } catch (error) {
            return 'NA';
        }
    }
    get contentField() {
        try {
            return CONTENT_FIELD;

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