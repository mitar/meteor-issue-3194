

MyCollection = new Meteor.Collection('myCollection1');


if (Meteor.isClient)
    {
	Meteor.startup(function()
		{
		Session.set('dontShow', false);

    Tracker.autorun(function (computation) {
      var handle = Meteor.subscribe('myCollection', Session.equals('dontShow', true));
      Tracker.autorun(function (computation) {
        if (!handle.ready()) return;
        computation.stop();

        console.log('Data as seen when ready:');
        console.log( MyCollection.find({}).map(function(o) { return o.value; }) );
      });
    });

		});

	Template.main.events(
		{
		'click #toggleSubscribe': function(event, template)
			{
			Session.set('dontShow', !Session.equals('dontShow', true));
			},
		});
    }

if (Meteor.isServer)
    {
    MyCollection.remove({});
    MyCollection.insert({ value: 0 });
    MyCollection.insert({ value: 1 });
    MyCollection.insert({ value: 2 });

    Meteor.publish('myCollection', function(dontShow)
		{
		return dontShow ? this.ready() : MyCollection.find({});
		});
    }
