public without sharing class BookSearchFormController {
   @AuraEnabled(cacheable=true)
    public static List<String> getBookTypes() {
        List<String> picklistValuesList = new List<String>();
        Schema.DescribeFieldResult fieldResult = Books__c.Type__c.getDescribe();
        List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
        for (Schema.PicklistEntry pickListVal : ple) {
            picklistValuesList.add(pickListVal.getLabel());
        }
        return picklistValuesList;
    }
}