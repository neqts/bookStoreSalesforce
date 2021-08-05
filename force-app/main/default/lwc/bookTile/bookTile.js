import { LightningElement, api, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';
import { MessageContext, publish } from 'lightning/messageService';
import messageChannel from "@salesforce/messageChannel/messageDemo__c";

export default class BookTile extends LightningElement {
    @api book;
    @api bookSelectedId;

    @wire(CurrentPageReference) pageRef;

    @wire(MessageContext)
    msgCntx

    handleBookSelect(event) {
        event.preventDefault();
        const bookId = this.book.Id;
        const bookSelect = new CustomEvent('bookselect', { detail: bookId })
        this.dispatchEvent(bookSelect);

        publish(this.msgCntx, messageChannel, { bookId: bookId })

    }

    get isBookSelected() {
        return this.book.Id === this.bookSelectedId ? "tile selected" : "tile"
    }

}