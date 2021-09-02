public with sharing class showOrder {
    @AuraEnabled(cacheable=true)
    public static List<Order__c> allOrders(){
       return [Select createddate,Summary_Price__c,Status__c,Name,street__c,Street_Number__c,Postal_Code__c,City__c,Country__c,Email__c,Flat_number__c,phone__c,Id from Order__c order by createddate DESC limit 1 ];
}
@AuraEnabled(cacheable=true)
public static List<Cart__c> allOrdersWithoutExceptions(){
   return [Select 
   BookName__c,
   Quantity__c,
   User__c,
   Order__r.createddate,
   Order__r.Summary_Price__c,
   Order__r.Status__c,
   Order__r.Name,
   Order__r.street__c,
   Order__r.Street_Number__c,
   Order__r.Postal_Code__c,
   Order__r.City__c,
   Order__r.Country__c,
   Order__r.Email__c,
   Order__r.Flat_number__c,
   Order__r.phone__c,
   Order__r.Id from Cart__c];
}

@AuraEnabled(cacheable=true)
public static List<Order__c> allOrdersSumarry(){
   return [Select 
   Id,
 createddate,
  Summary_Price__c,
  User__c,
   Status__c,
   Name__c,
   street__c,
   Street_Number__c,
   Postal_Code__c,
   City__c,
   Country__c,
  Email__c,
  Flat_number__c,
  phone__c,
  (Select BookName__c,Quantity__c,PriceBooks__c,User__c from Cart__r)
   Id from Order__c ];
}


@AuraEnabled
public static void assignCartItemsToOrder(List<Id> cartItemsIds, Id orderId){
    List<Cart__c> cartItemsToModification = [SELECT Id, Order__c FROM Cart__c WHERE Id IN :cartItemsIds];
    for(Cart__c cartItem : cartItemsToModification){
        cartItem.Order__c = orderId;
    }
    update cartItemsToModification;
}



}