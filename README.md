<h1>autoOne for Meteor.js</h1>
An easy way to gather data from collections.
```js
meteor add guncebektas:autoone
```
<h2>How to </h2>
<p>You can use autoOne or autoCms </p>
```js
Players.autoOne = {
  columns: {
    picture: {
      type: 'image',
      width: 40
    },
    name: {

    },
    surname: {

    }
  }
}
```
<p>In HTML</p>
```js
{{> autoOne collection="Players" id="fKHnzve5vu6i7Jix6" field="picture" type="value"}}
{{> autoOne collection="Players" id="fKHnzve5vu6i7Jix6" field="name" type="value"}}
{{> autoOne collection="Players" id="fKHnzve5vu6i7Jix6" field="surname" type="value"}}
{{> autoOne collection="Players" id="fKHnzve5vu6i7Jix6" field="edit"}}
{{> autoOne collection="Players" id="fKHnzve5vu6i7Jix6" field="delete"}}
```