public with sharing class cartController {
   @AuraEnabled
   public static void insertRecord(Id bookId,Integer quantity){
       Id userId = UserInfo.getUserId();
     Cart__c item= new Cart__c();
     item.User__c=userId;
     item.Books__c=bookId;
     item.Quantity__c=quantity;
     insert item;
   }
@AuraEnabled
   public static void insertRecords(Id[] booksIds){
       for(Id bookId:booksIds){
           cartController.insertRecord(bookId,1);
       }

   }
}
