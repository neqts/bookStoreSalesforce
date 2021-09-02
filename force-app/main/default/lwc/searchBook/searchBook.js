import { LightningElement,wire,track} from 'lwc';
export default class SearchBook extends LightningElement {
    
    bookName='';
   
    handleKeyChange(event){
        const searchString=event.target.value;
        
        const newCustomEvent= new CustomEvent('searchtypedbook', {detail:searchString});
        this.dispatchEvent(newCustomEvent)

        
    
}
}