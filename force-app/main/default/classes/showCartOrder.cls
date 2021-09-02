public with sharing class showCartOrder {
    @AuraEnabled(cacheable=true)
    public static List<Cart__c> getCartItemsById(Id customOrderId){
        return [SELECT Id, Books__c,BookName__c, PriceBooks__c, User__c, Order__c, Quantity__c
        FROM Cart__c   
        WHERE Order__c =: customOrderId] ; 
    }
}
