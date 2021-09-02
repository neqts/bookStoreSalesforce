public with sharing class orderController {
   @AuraEnabled
   public static Id createOrder(String email, Integer price,Integer phone,String street,Integer streetNumber,Integer flatNum,String city,String country,String postalCode,String name){


    String userId = UserInfo.getUserId();
      List<Cart__c> cartItems = [SELECT Id,	Quantity__c,User__c,Books__r.Id FROM Cart__c Where User__c=:userId AND Order__c=:null];
        for(Cart__c cartItem: cartItems){
            Books__c bookQuantity = [SELECT Id, Quantity__c FROM Books__c WHERE Id =: cartItem.Books__r.Id];
            bookQuantity.Quantity__c -= cartItem.Quantity__c;
            update bookQuantity;
        }

      Order__c order = new Order__c();
       order.User__c = UserInfo.getUserId();
       order.Summary_Price__c = price;
       order.Email__c = email;
       order.phone__c=phone;
       order.street__c=street;
       order.Street_Number__c=streetNumber;
       order.Flat_number__c=flatNum;
       order.City__c=city;
       order.Country__c=country;
       order.Postal_Code__c=postalCode;
       order.Name__c=name;
      



       insert order;
       return order.Id;
   }
   
}