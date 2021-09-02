public with sharing class BooksSearchCLS {
    public BooksSearchCLS() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Books__c> getBooks(String bckName){
       String bookString='%'+bckName+'%';
       return [Select Author__c,Description__c,Picture__c,Quantity__c,Kod_ISBN__c from Books__c where Author__c like:bookString];
    }
}