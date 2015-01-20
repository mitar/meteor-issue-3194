# jonjamz:forms

A minimalist Meteor package that allows creating reusable forms and form components.
Support form reactivity, validation and submission (including complex workflows).
Compatible with Bootstrap or any other UI framework.

This package uses [aldeed:simple-schema](https://github.com/aldeed/meteor-simple-schema) for form field validation when required.


## Comparison with aldeed:autoform

Although [aldeed:autoform](https://github.com/aldeed/meteor-autoform) and jonjamz:forms use aldeed:simple-schema, they have different purposes:
- [aldeed:autoform](https://github.com/aldeed/meteor-autoform) main purpose is automatic generation of insert and update forms for your collections. It includes many options and is tightly integrated with aldeed:simple-schema and [aldeed:collection2](https://github.com/aldeed/meteor-collection2).
- [jonjamz:forms](https://github.com/meteortemplates/forms) only provides a thin framework to create reusable forms components by yourself.

## Installation

```sh
$ meteor add jonjamz:forms
```


## Usage

It's recommended to set up helpers to run on both server and client. This way your helpers can be accessed both server side and client side.

Some simple helpers:

```javascript
Books = new Mongo.Collection('books');
Authors = new Mongo.Collection('authors');

Books.helpers({
  author: function() {
    return Authors.findOne(this.authorId);
  }
});

Authors.helpers({
  fullName: function() {
    return this.firstName + ' ' + this.lastName;
  },
  books: function() {
    return Books.find({ authorId: this._id });
  }
});
```

### Example use within a template

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
