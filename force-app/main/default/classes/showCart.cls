public with sharing class showCart {
    @AuraEnabled(cacheable=true)
    public static List<Cart__c> showCartItems(String userId){
       return [Select Id,Quantity__c,User__c,Name,Books__c,BookName__c,PriceBooks__c,Order__c from Cart__c WHERE Order__c=: null AND User__c=:userId];
}


}