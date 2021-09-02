public with sharing class SelectBookById {
  @AuraEnabled(cacheable=true)
  public static List<Books__c> getBookDetails(List<Id> cartIds){
      return [Select Name,Id,PhotoURL__c,Description__c,Picture__c,Price__c,Quantity__c,Type__c,Author__c from Books__c where Id IN :cartIds];
  }
}