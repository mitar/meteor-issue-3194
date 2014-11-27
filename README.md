Meteor Issue: Subscription not ready in onReady callback
=========================================================

In Deps.autorun, when using a session variable to modify a subscription, the onReady() callback
is called when data is not ready yet. Using setTimeout(0) solves the problem.

<h4>How to reproduce:</h4>

1. $ git clone https://github.com/steph643/meteor-issue-3194/
2. Go to folder meteor-issue-3194 and run meteor
3. Launch the browser on http://localhost:3000/page1
4. Click on 'Toggle Subscribe'


<h4>Program Output</h4>

At startup, onReady() behaves as expected :

```
Data as seen from onReady:
[0, 1, 2]
Data as seen from onReady/setTimeout:
[0, 1, 2]
```
When clicking the 'Toggle Subscribe' button, collection data is not the same before and after setTimeout(0):
```
Data as seen from onReady:
[0, 1, 2]
Data as seen from onReady/setTimeout:
[]
```
