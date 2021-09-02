public with sharing class bookSearchIdName {
    @AuraEnabled(cacheable=true)
  public static List<Books__c> getId(){
   return [Select Id,Name from Books__c];
  }
}