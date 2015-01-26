# jonjamz:forms

A minimalist Meteor package for creating reusable forms and form elements, with support for reactivity, validation and submission (including complex workflows).

Compatible with Bootstrap and other UI frameworks.

This package uses [aldeed:simple-schema](https://github.com/aldeed/meteor-simple-schema) for field validation.

#### Comparison with aldeed:autoform

[aldeed:autoform](https://github.com/aldeed/meteor-autoform) and jonjamz:forms serves different purposes:
- **aldeed:autoform** automatically generates insert and update forms for your collections. It is a large and rich package, tightly integrated with aldeed:simple-schema and aldeed:collection2.
- **jonjamz:forms** only provides a thin framework for building reusable forms, form elements and form workflows.

#### Installation

```sh
$ meteor add jonjamz:forms
```

####Table of Contents <sub><sup>([DocToc](http://doctoc.herokuapp.com/))</sup></sub>

- [Examples](#)
	- [Check That It Works](#)
	- [Basic Usage: Define Your Own Form Elements](#)
	- [Advanced Usage: Create Your Own Form Models](#)
- [API Reference](#)
	- [Example Of Complex Workflow](#)
- [License](#)

<br />

## Examples

### Check That It Works

jonjamz:forms comes with two predefined basic components, `basicFormModel` and  `basicInput`, so that you  can quickly see the package in action:

```html
<template name="createNews">
    <h4>Create a News</h4>
    {{#basicFormModel schema=getShema action=getAction}}
        {{>basicInput field="title"}}
        {{>basicInput field="body"}}
        <button type="submit" disabled="{{#if formHelpers.invalidCount}}disabled{{/if}}">Submit</button>
    {{/basicFormModel}}
</template>
```
```javascript
Template.createNews.helpers({

	getSchema: function() {
		return new SimpleSchema({
			title: { type: String, max: 3 }, 
			body:  { type: String, max: 10, optional: true } });
	},

	getAction: function() {
        return function(els, callbacks, changed) {            
            console.log('---------  News Submitted!  ---------');
            console.log('Fields:');
            console.log(this);
            callbacks.success();
            }
		}
	}	
});
```

### Basic Usage: Define Your Own Form Element

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

Create your form:
```html
<template name="updateNews">
    <h4>Update a News</h4>
    {{#basicFormModel schema=getShema data=currentNews action=getAction}}
        {{>myInput field="title"}}
        {{>myInput field="body"}}
        <button type="submit" disabled="{{#if formHelpers.invalidCount}}disabled{{/if}}">Submit</button>
    {{/basicFormModel}}
</template>
```

```javascript
Template.newsForm.helpers({

	getSchema: function () {
		// Return the schema used in a collection2 (see package aldeed:collection2)
		return News.simpleSchema();
	},

	getAction: function () {
		var newsId = this.currentNews._id;    
		return function(els, callbacks, changed) {
            if (!_.isEmpty(changed))
				News.update(newsId, changed);
            callbacks.success();
		}
	}	
});
```


### Advanced Usage: Define Your Own Form Model

Create a form model:
```html
<!-- 
	Use this template like this:
		{{#bootstrapModal modalId=... modalTitle=... schema=... data=... action=...}}
-->
<template name="bootstrapModal">
    <div class="modal fade" id="{{modalId}}">
        <div class="modal-dialog">
            <div class="modal-content">
                <form>
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">{{modalTitle}}</h4>
                    </div>
                    <div class="modal-body">
                        {{> UI.contentBlock data=data formHelpers=formHelpers}}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                        <button type="submit" class="btn btn-primary" disabled="{{#if invalidCount}}disabled{{/if}}">Save</button>
                    </div>
                </form>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
</template>
```
Notice that the form model must contain the `UI.contentBlock` line with the proper fields, so just copy it as shown.

Register your form model:
```javascript
JonjamzForms.registerModel({
    template: 'bootstrapModal',
    submitType: 'normal'
});
```

Create your form:
```html
<template name="updateNews">
    {{#bootstrapModal modalId="updateANews" modalTitle="Update a News" schema=getShema data=currentNews action=getAction}}
        {{>myInput field="title"}}
        {{>myInput field="body"}}
    {{/bootstrapModal}}
</template>
```

Use your form:
```html
<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#updateANews">Update</button>

<!-- Modal -->
{{>updateNews currentNews=currentNews}}
```

### Expert Usage: Complex Workflows

[View the Live Example](http://forms-example.meteor.com/)

Built with Bootstrap 3 and the `sacha:spin` package, it demonstrates how flexible and extensible this package is.

<br />

## API Reference

...
...
...
...
...
...
...
...
...
... here goes the existing doc, with a bit of revamping ...
...
...
...
...
...
...
...
...
...
...

<br />

## License

MIT or whatever
