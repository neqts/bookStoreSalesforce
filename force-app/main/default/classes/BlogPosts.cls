public with sharing class BlogPosts {
  @AuraEnabled(cacheable=true)
  public static List<Blog__c> getPosts(){
     return [Select Id,Name,Title__c,Content__c,CreatedDate from Blog__c];
  }
}
