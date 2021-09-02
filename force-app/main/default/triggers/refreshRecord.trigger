trigger refreshRecord on blog__c (after insert) {
  List<createRecord__e>events=new List<createRecord__e>();
  for(blog__c book : Trigger.new){
      events.add(new createRecord__e(
        blog__c=book.Id
      ));
  }
  Eventbus.publish(events);
}