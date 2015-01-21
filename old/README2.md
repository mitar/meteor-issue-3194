# jonjamz:forms

A minimalist Meteor package for creating reusable forms and form elements, with support for reactivity, validation and submission (including complex workflows).

Compatible with Bootstrap and other UI frameworks.

This package uses [aldeed:simple-schema](https://github.com/aldeed/meteor-simple-schema) for field validation.


## Comparison with aldeed:autoform

[aldeed:autoform](https://github.com/aldeed/meteor-autoform) and jonjamz:forms serves different purposes:
- **aldeed:autoform** automatically generates insert and update forms for your collections. It is a large and rich package, tightly integrated with aldeed:simple-schema and aldeed:collection2.
- **jonjamz:forms** only provides a thin framework for building reusable forms, form elements and form workflows.

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

Or a richer version, using Bootstrap for example:

```html
<template name="myInput">
    <div class="form-group {{#unless valid}}has-error{{/unless}}">
        <label class="control-label">{{label}}</label>
        <input class="form-control reactive-element" value="{{value}}">
        <p class="help-block">{{#unless valid}}{{errorMessage}}{{/unless}}</p>
    </div>
</template>
```

Register your form element:
```javascript
JonjamzForms.registerElement({
	template: 'myInput',
	validationEvent: 'keyup'
});
```

Create a form:
```html
<template name="myForm">
    {{#defaultFormBlock schema=getShema data=currentPost action=getAction}}
        {{>myInput field="title"}}
        {{>myInput field="date"}}
        {{>myInput field="body"}}
    {{/defaultFormBlock}}
</template>
```

```javascript
Template.myForm.helpers({

	getSchema: function () {
		// Example 1: build your schema right here (see package aldeed:simple-schema)
		return new SimpleSchema({
			title: { type: String, max: 5 }, 
			date:  { type: Date }, 
			body:  { type: String, max: 100, optional: true } });
	
		// Example 2: return the schema used in a collection2 (see package aldeed:collection2)
		return Posts.simpleSchema();
	},

	getAction: function () {
		var postId = this.currentPost._id;    
		return function(els, callbacks, changed) {
            if (!_.isEmpty(changed))
				Posts.update(postId, changed);
		}
	}	
});
```

## Example Of Complex Workflow

[View the Live Example](http://forms-example.meteor.com/)

Built with Bootstrap 3 and the `sacha:spin` package, it demonstrates how flexible and extensible this package is.

## Basic API

...

... here goes half of the existing doc, with a bit of reorganization ...

...

## Advanced API: create your own form blocks

The advanced API must be used when you want to reuse the same submission logic with different forms.

...

... here goes the other half of the existing doc, with a bit of reorganization ...

...

## License

MIT or whatever
