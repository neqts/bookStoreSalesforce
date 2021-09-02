public with sharing class cartController {
   @AuraEnabled
   public static void insertRecord(Id bookId, Integer quantity,String booksName,Integer price){
       Id userId = UserInfo.getUserId();
     Cart__c item= new Cart__c();
     item.User__c=userId;
     item.Books__c=bookId;
     item.Quantity__c=quantity;
     item.BookName__c=booksName;
     item.PriceBooks__c=price;
     
     insert item;
   }



   
}