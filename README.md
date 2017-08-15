Control media query with JavaScript.

## Usage

```js
var MediaScreen = require('media-screen');

MediaScreen()
  .width()
  .gt(640)
  .then(function () {
    // pass
  }, function () {
    // else
  });
```

### MediaScreen:

  **Media screen** is the main function that accepts a single argument, which is an element to watch.


#### Pararmeters:

  **element** _optional: default window_

  Accepts:

  * Dom Object.

  * CSS Selector.

  Also accepts list of elements. _not recommended_

  ```js
  MediaScreen();   // defaults to window
  // or
  MediaScreen(docuemnt.getElementById('main'));
  // or
  MediaScreen('.container.fluid');
  ```



### Options, Conditions:

  **MediaScreen** returns a list of options and conditions methods:



  #### width(): _option_

  Tell the **MediaScreen** to watch only the width of the element.

  ```js
  MediaScreen()
    .width()    
    ...
  ```

  **width()** option returns a list of conditions.



  #### height(): _option_

  Tell the **MediaScreen** to watch only the height of the element.

  ```js
  MediaScreen()
    .height()
    ...
  ```

  **height()** option returns a list of conditions.



  #### always(): _condition_

  Tells **MediaScreen** to call the handler whenever the width of the element or its height or both are changed.

  ```js
  MediaScreen()
    .width()
    .always()
    .then(function (dimensions) {
      // passed
    });
    ...
  ```

  **always** condition returns only the **then** handler.

  _note: when **always** is called without an option 'dimension', **MediaScreen** will watch both dimensions_.


  
  #### gt(): _condition_

  Tells **MediaScreen** to dispatch an event when width or height is greater than the **limit**.

  **Parameters:** 
  
  * limit: {Number}.

  * always: {Boolean}. _optional default false_ runs the callback function each time the element is resized instead of only once when its width or height is greater than the limit.

  * elseAlways: {Boolean}. _optional default false_  runs the else callback function each time the element is resized instead of only once when its width or height is less than the limit.


  ```js
  MediaScreen()
    .width()
    .gt(1024, true)
    .then(...)
  ```

  **gt()** condition returns only the **then** handler.


  #### lt(): _condition_

  Tells **MediaScreen** to dispatch an event when width or height is less than the **limit**.

  **Parameters:** 
  
  * limit: {Number}.

  * always: {Boolean}. _optional default false_ runs the callback function each time the element is resized instead of only once when its width or height is less than the limit.

  * elseAlways: {Boolean}. _optional default false_  runs the else callback function each time the element is resized instead of only once when its width or height is greater than the limit.


  ```js
  MediaScreen()
    .height()
    .lt(1024, false, true)
    .then(...)
  ```

  **lt()** option returns only the **then()** handler.


  #### in(): _condition_

  Tells **MediaScreen** to dispatch an event when width or height is between **min** and **max** arguments range.

  **Parameters:** 
  
  * min: {Number}.

  * max: {Number}.

  * always: {Boolean}. _optional default false_ runs the callback function each time the element is resized instead of only once when its width or height is between **min** and **max** arguments range.

  * elseAlways: {Boolean}. _optional default false_  runs the else callback function each time the element is resized instead of only once when its width or height is out of **min** and **max** arguments range.


  ```js
  MediaScreen()
    .height()
    .in(640, 1024, false, true)
    .then(...)
  ```

  **in()** option returns only the **then()** handler.


  #### out(): _condition_

  Tells **MediaScreen** to dispatch an event when width or height is out of **min** and **max** arguments range.

  **Parameters:** 
  
  * min: {Number}.

  * max: {Number}.

  * always: {Boolean}. _optional default false_ runs the callback function each time the element is resized instead of only once when its width or height is out of **min** and **max** arguments range.

  * elseAlways: {Boolean}. _optional default false_  runs the else callback function each time the element is resized instead of only once when its width or height is between **min** and **max** arguments range.


  ```js
  MediaScreen()
    .height()
    .in(640, 1024, false, true)
    .then(...)
  ```

  **out()** option returns only the **then()** handler.


  #### landscape(): _condition_

  Tells **MediaScreen** to dispatch an event when the width of the element is greater than its height.

  **Parameters:** 
  
  * always: {Boolean}. _optional default false_ runs the callback function each time the element is resized instead of only once when its width is greater than its height.

  * elseAlways: {Boolean}. _optional default false_  runs the else callback function each time the element is resized instead of only once when its height is greater than its width.


  ```js
  MediaScreen()
    .landscape(false, true)
    .then(...)
  ```

  **landscape()** option returns only the **then()** handler.


  #### portrait(): _condition_

  Tells **MediaScreen** to dispatch an event when the height of the element is greater than its width.

  **Parameters:** 
  
  * always: {Boolean}. _optional default false_ runs the callback function each time the element is resized instead of only once when its height is greater than its width.

  * elseAlways: {Boolean}. _optional default false_  runs the else callback function each time the element is resized instead of only once when its width is greater than its height.


  ```js
  MediaScreen()
    .portrait(false, true)
    .then(...)
  ```

  **portrait()** option returns only the **then()** handler.



### Handler:


  #### then():

  **then** has two callback handlers called whenever a condition is passed unless you set the always paramter to true, then it will be called whenever the element is resized and it still passes the condition.

  **Parameters:** 
  
  * callback: {Function}. 

  * elseCalback: {Function}. _optional_

  The callbacks will have the context of the element and a single argument object describing the current dimensions of the element. 


  ```js
  MediaScreen()
    .portrait(false, true)
    .then(function (dimensions) {
      console.log(dimensions);  // { width: 465, height: 759 }
    }, function (dimensions) {

    })
    .MediaScreen(...)
    ...
  ```

  **then** handler returns a **MediaScreen** wrapper for new query.

  
  
  Thank you...