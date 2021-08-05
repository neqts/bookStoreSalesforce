import getBookTypes from '@salesforce/apex/BookSearchFormController.getBookTypes';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
import { LightningElement, track, wire } from 'lwc';



export default class BookSearchFormTest extends NavigationMixin(LightningElement) {
    @track bookTypes;
    @track bookId;
    @wire(getBookTypes)
    wiredBookType({ data, error }) {
        if (data) {
            this.bookTypes = [{ value: '', label: 'All Types' }];
            data.forEach(element => {
                const bookType = {};
                bookType.label = element;
                bookType.value = element;
                this.bookTypes.push(bookType);
            });
        } else if (error) {
            this.showToast('Error', error.body.message, 'error');
        }
    }



    handleBookTypeChange(event) {
        const bookTypeId = event.detail.value;
        const bookTypeSelectionChangeEvent = new CustomEvent('booktypeselect', { detail: bookTypeId });
        this.dispatchEvent(bookTypeSelectionChangeEvent)
        console.log(event.detail.value)

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