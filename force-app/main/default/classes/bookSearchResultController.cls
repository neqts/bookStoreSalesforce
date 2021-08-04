public with sharing class bookSearchResultController {
  @AuraEnabled(cacheable=true)
  public static List<Books__C> getBooks(String bookTypeId,String search){
    String query= 'Select Id,Name,Picture__c,	PhotoURL__c,Author__c,Description__c,Type__c,Quantity__c,Price__c From Books__c Where Quantity__c>0';
    if(search!=null&&!String.isEmpty(search)){
      query+=' AND Name Like \'%'+ search + '%\''; 

    }


    if(bookTypeId!=null&&!String.isEmpty(bookTypeId)){
      query+=' AND Type__c=\''+bookTypeId+'\'';
 }

return Database.query(query);
}

}
