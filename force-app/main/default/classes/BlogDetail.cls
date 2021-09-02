public with sharing class BlogDetail {
    @AuraEnabled
    public static List<Blog__c> getBlogDetail(){
       return [Select Content__c,Title__c from Blog__c];
    }
}
