import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class BookDetail extends NavigationMixin(LightningElement) {


    @api book;



    fullDetails(){
        this[NavigationMixin.Navigate]({
            type: "standard__recordPage",
            attributes :{
                recordId : this.book.data.fields.Id.value,
                objectApiName : "Books__c",
                actionName : "view",
            }
        });
    }

    get bookName(){
        try{
            return this.book.data.fields.Name.value;
            
        }catch(error){
            return 'NA';
        }
    }

    get bookTitle(){
        try{
            return this.book.data.fields.Type__c.value;
            
        }catch(error){
            return 'NA';
        }
    }

    get bookAuthor(){
        try{
            return this.book.data.fields.Author__c.value;
            
        }catch(error){
            return 'NA';
        }
    }
    get bookQuantity(){
        try{
            return this.book.data.fields.Quantity__c.value;
            
        }catch(error){
            return 'NA';
        }
    }
    get bookPrice(){
        try{
            return this.book.data.fields.Price__c.value;
            
        }catch(error){
            return 'NA';
        }
    }
    get bookDescribe(){
        try{
            return this.book.data.fields.Description__c.value;
            
        }catch(error){
            return 'NA';
        }
    }

    get bookImg(){
        try{
            return this.book.data.fields.PhotoURL__c.value;
            
        }catch(error){
            return 'NA';
        }
    }
}