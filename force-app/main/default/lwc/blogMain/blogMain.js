import { LightningElement, api, wire } from 'lwc';
import { MessageContext, publish } from 'lightning/messageService';
import messageChannel from "@salesforce/messageChannel/messageDemo__c";


export default class BlogMain extends LightningElement {

    @api postDetails;

    @wire(MessageContext)
    msgCtx


    handleShowDetails(event) {
        event.preventDefault();

        const postId = this.postDetails.Id;
        const messagePayload = {
            postId: postId,
        }

        publish(this.msgCtx, messageChannel, messagePayload);


    }
}