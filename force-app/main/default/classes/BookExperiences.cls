public with sharing class BookExperiences {
  @AuraEnabled
  public static List<Reviews__c> getReviews(String bookId){
    return [Select Id,Name,Author__c,Title__c,Description__c,Nick__c, CreatedDate,
    CreatedBy.Name,
    CreatedBy.SmallPhotoUrl,
    CreatedBy.CompanyName from Reviews__c where Books__c =:bookId ORDER BY CreatedDate DESC];
  }
}