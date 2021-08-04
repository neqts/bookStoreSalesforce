import { LightningElement,wire,track} from 'lwc';
import getPosts from '@salesforce/apex/BlogPosts.getPosts';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class BlogPost extends LightningElement {
@track main=[];
@track date= new Date();


connectedCallback(){
    console.log(this.date);
    console.log(this.hours);
}




@wire(getPosts)

wiredPosts({data,error}){
    if(data){
        this.main=data;
    }else if(error){
        this.showToast('ERROR',error.body.message,'error')
    }
}


showToast(title,message,variant){
    const evt = new ShowToastEvent({
        title:title,
        message:message,
        variant:variant,
    });
    this.dispatchEvent(evt);
}
get hours(){
    return this.date?.getHours()
}
get minutes(){
    return this.date?.getMinutes()
}
get seconds(){
    return this.date?.getSeconds()
}
}