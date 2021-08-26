public with sharing class lastPost {
    @AuraEnabled(cacheable=true)
    public static List<Blog__c> postControler(){
       return [Select Id,Name,Title__c,Content__c,CreatedDate from Blog__c LIMIT 1];
    }
  }