# jonjamz:forms

A minimalist Meteor package that allows creating reusable form components, with support for reactivity, validation and submission (including complex workflows).

Compatible with Bootstrap or any other UI framework.

This package uses [aldeed:simple-schema](https://github.com/aldeed/meteor-simple-schema) for form field validation.


## Comparison with aldeed:autoform

Although [aldeed:autoform](https://github.com/aldeed/meteor-autoform) and jonjamz:forms use aldeed:simple-schema, they have different purposes:
- [aldeed:autoform](https://github.com/aldeed/meteor-autoform) main purpose is automatic generation of insert and update forms for your collections. It includes many options and is tightly integrated with aldeed:simple-schema and [aldeed:collection2](https://github.com/aldeed/meteor-collection2).
- [jonjamz:forms](https://github.com/meteortemplates/forms) only provides a thin framework to create reusable forms components by yourself.

## Installation

```sh
$ meteor add jonjamz:forms
```

## Basic Usage

Create a form element (see next chapter for a list of available helpers) :

```html
Template.books.helpers({
  books: function() {
    return Books.find();
  }
});
```

Create a form:

```html
Template.books.helpers({
  books: function() {
    return Books.find();
  }
});
```

Declare the corresponding javascript objects:

```javascript
Template.books.helpers({
  books: function() {
    return Books.find();
  }
});
```

Use the form:

```html
Template.books.helpers({
  books: function() {
    return Books.find();
  }
});
```

```javascript
Template.books.helpers({
  books: function() {
    return Books.find();
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
