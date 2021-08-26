import { LightningElement, wire, track } from 'lwc';
import lastPost from '@salesforce/apex/lastPost.postControler';
import { NavigationMixin } from 'lightning/navigation';


export default class LastPost extends NavigationMixin(LightningElement) {

    @track main = [];


    bookresponse;
    @wire(lastPost)
    wiredPosts(response) {
        const { data, error } = response;
        this.bookresponse = response
        if (data) {

            this.main = data;
        } else if (error) {
            this.showToast('ERROR', error.body.message, 'error')
        }
    }

    handleClick() {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                pageName: 'news'
            },

        });
    }
}