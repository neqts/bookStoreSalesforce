public with sharing class BookDetail {
    @AuraEnabled(cacheable=true)
    public static List<Books__c> getDetails(){
        return [Select Name,Id,PhotoURL__c,Description__c,Picture__c,Price__c,Quantity__c,Type__c,Author__c from Books__c];
      }
}