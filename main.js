

MyCollection = new Meteor.Collection('myCollection1');


if (Meteor.isClient)
    {
	Meteor.startup(function()
		{
		Session.set('dontShow', false);

		Deps.autorun(function()
			{
			Meteor.subscribe('myCollection', Session.equals('dontShow', true), function onReady()
				{
				// This is where the bug lies: the local collection has not been updated yet
				console.log('Data as seen from onReady:');
				console.log( MyCollection.find({}).map(function(o) { return o.value; }) );

				// THIS IS A WORKAROUND
				Meteor.setTimeout(function()
					{
					console.log('Data as seen from onReady/setTimeout:');
					console.log( MyCollection.find({}).map(function(o) { return o.value; }) );
					}, 0);
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
