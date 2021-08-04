public with sharing class BookExperiences {
  @AuraEnabled
  public static List<Reviews__c> getReviews(String bookId){
    return [Select Id,Name,Author__c,Title__c,Description__c,Nick__c from Reviews__c where Books__c =:bookId];
  }
}
