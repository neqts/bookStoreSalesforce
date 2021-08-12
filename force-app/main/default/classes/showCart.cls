public with sharing class showCart {
    @AuraEnabled(cacheable=true)
    public static List<Cart__c> showCartItems(){
       return [Select Id,Quantity__c,Name,Books__c,BookName__c,PriceBooks__c from Cart__c];
}
}