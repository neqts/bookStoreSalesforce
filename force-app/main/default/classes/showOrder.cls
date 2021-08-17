public with sharing class showOrder {
    @AuraEnabled(cacheable=true)
    public static List<Order__c> allOrders(){
       return [Select createddate,Summary_Price__c,Status__c,Name,street__c,Street_Number__c,Postal_Code__c,City__c,Country__c,Email__c,Flat_number__c,phone__c,Id from Order__c order by createddate DESC limit 1 ];
}
}