# jonjamz:forms

A minimalist Meteor package for creating reusable forms and form elements, with support for reactivity, validation and submission (including complex workflows).

Compatible with Bootstrap and other UI frameworks.

This package uses [aldeed:simple-schema](https://github.com/aldeed/meteor-simple-schema) for field validation.


## Comparison with aldeed:autoform

[aldeed:autoform](https://github.com/aldeed/meteor-autoform) and jonjamz:forms serves different purposes:
- **aldeed:autoform** main purpose is automatic generation of insert and update forms for your collections. It is a very rich package, tightly integrated with aldeed:simple-schema and aldeed:collection2.
- **jonjamz:forms** only provides a thin framework for reusable forms, form elements and form workflows.

## Installation

```sh
$ meteor add jonjamz:forms
```

## Basic Usage

Create a form element:

```html
<template name="myInput">
   <input class="reactive-element" value="{{value}}">
   <p>{{#unless valid}}{{errorMessage}}{{/unless}}</p>
</template>
```

Or a richer version, using Bootstrap:

```html
<template name="myInput">
    <div class="form-group  {{#unless valid}}has-error{{/unless}}">
        <label class="control-label">{{label}}</label>
        <input class="form-control reactive-element" value="{{value}}">
        <p class="help-block">{{#unless valid}}{{errorMessage}}{{/unless}}</p>
    </div>
</template>
```

Register your form element:
```javascript
ReactiveForms.registerElement({
	template: 'myInput',
	validationEvent: 'keyup'
});
```

Create a form:
```html
<template name="myForm">
    {{#simpleFormContainer schema=getShema data=currentPost action=getAction}}
        {{>myInput field="title"}}
        {{>myInput field="date"}}
        {{>myInput field="body"}}
    {{/simpleFormContainer}}
</template>
```

```javascript
Template.myForm.helpers({

	getSchema: function () {
		// Example 1: build your schema right here (see package aldeed:simple-schema)
		return new SimpleSchema({
			title: { type: String }, 
			date:  { type: Date }, 
			body:  { type: String } });
	
		// Example 2: return the schema used in a collection2 (see package aldeed:collection2)
		return Posts.simpleSchema();
	},

	getAction: function () {
		return function(els, callbacks, changed) {
            if (!_.isEmpty(changed))
				Posts.update(this.currentPost._id, changed);
		}
	}	
});
```




### Complex Workflow

Our relationships are resolved by the collection helper, avoiding unnecessary template helpers. So we can simply write:

```javascript
Template.books.helpers({
  books: function() {
    return Books.find();
  }
});
```

...with the corresponding template:

```html
<template name="books">
  <ul>
  {{#each books}}
    <li>{{name}} by {{author.fullName}}</li>
  {{/each}}
  </ul>
</template>
```

### Use outside of templates

You can of course access helpers outside of your templates:

```javascript
Books.findOne().author().firstName; // Charles
Books.findOne().author().fullName(); // Charles Darwin
```

## Meteor.users

You can also apply helpers to the Meteor.users collection

```javascript
Meteor.users.helpers({
  // ...
});
```

### License

MIT
