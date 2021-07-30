public with sharing class bookFinder {
  
    @AuraEnabled(cacheable=true)
    public static List<Books__c> getBook(String bckName){
        String keyString = '%'+bckName+'%';
        return [select id,name from Books__c where name like:keyString];
    }

    
    @AuraEnabled(cacheable=true)
    public static List<Books__c> showBoks(){
       return [select Type__c from Books__c];
    }
}
