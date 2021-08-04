import { LightningElement,api,track } from 'lwc';
import getReviews from '@salesforce/apex/BookExperiences.getReviews';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';



export default class BookReviews extends NavigationMixin(LightningElement) {

    privateBookId;

@track bookExperiences=[]

    connectedCallback(){
        this.getBookReviews();
    }

    @api
    get bookId(){
        return this.privateBookId;
    }
    set bookId(value){
        this.privateBookId=value;
        this.getBookReviews();
    }
    @api
    getBookReviews(){
        getReviews({bookId:this.privateBookId}).then((reviews)=>{
            this.bookExperiences=reviews;
        }).catch((error)=>{
            this.showToast('ERROR',error.body.message,'error');
           
        })
    }

    userClickHandler(event){
        const userId = event.target.getAttribute('data-userid');
        this[NavigationMixin.Navigate]({
            type: "standard__recordPage",
            attributes: {
              recordId: userId,
              objectApiName: "User",
              actionName: "view",
            }
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
    get hasReviews(){
        if(this.bookExperiences.length>0){
            return true;
        }
        return false;
    }
}