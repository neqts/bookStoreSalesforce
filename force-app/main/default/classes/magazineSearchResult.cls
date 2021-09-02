public with sharing class magazineSearchResult {
  @AuraEnabled(cacheable=true)
  public static List<Books__c> magazineType(String bookTypeId){
      if(String.isEmpty(bookTypeId)){
          return [Select Id,Name, Price__c,Type__c,Quantity__c from Books__c where Quantity__c>0];
      }else {
          return [Select Id,Name, Price__c,Type__c,Quantity__c from Books__c where Quantity__c>0 AND Type__c=:bookTypeId];
      }
  }
  @AuraEnabled(cacheable=true)
  public static List<AggregateResult> magazineQunatityType(String bookTypeId){
      if(String.isEmpty(bookTypeId)){
     return [Select SUM(Quantity__c) quntity from Books__c];
      }else {
        return [Select SUM(Quantity__c) quntity from Books__c where Quantity__c>0 AND Type__c=:bookTypeId];
      }

}
}