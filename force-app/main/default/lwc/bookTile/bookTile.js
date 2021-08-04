import { LightningElement,api,wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';

export default class BookTile extends LightningElement {
    @api book;
    @api bookSelectedId;

    @wire(CurrentPageReference) pageRef;

    handleBookSelect(event){
        event.preventDefault();
        const bookId =this.book.Id;
        const bookSelect = new CustomEvent('bookselect',{detail:bookId})
        this.dispatchEvent(bookSelect);

        fireEvent(this.pageRef,'bookselect',this.book.Id);
    }

    get isBookSelected(){
        return this.book.Id === this.bookSelectedId ? "tile selected" : "tile"
    }
      
}