
# Selection box
Selection box allows you to create a box that can select elements.
## How to use
Selection box requires you to have an HTML Canvas element. Once you have one, put
this in your JS:
```js
new SelectionBox ( /* your canvas element */ )
```
You can then configure how the selection box behaves...
```js
const myselectionbox = new SelectionBox ( /* your canvas element */ );

myselectionbox.onselect = function ( ) {
    /*Your code here*/
};
```
...the color of the selection box...
```js
const myselectionbox = new SelectionBox ( /* your canvas element */ );

// Color has to be in HEX format
myselectionbox.settings.color = "#00CCFF"
```
...and if the selection box is to remain after the mouse is released.
```js
const myselcetionbox = new SelectionBox( /* your canvas element */ );

myselectionbox.settings.showBoxAfterSelect = true;
```
A full example is bundled with this package.
## Additional features
### Hitbox class and checkCollision.
Example:
```js
var myHitboxes = [ new Hitbox ( 3, 5 ), new Hitbox ( 4, 6)];
const myselectionbox = new SelectionBox ( /* your canvas elemnt */ );
myselectionbox.onselection = function ( ) {

    myselectionbox.checkCollision ( myHitboxes );

}
```
### How to use Hitbox class:
```js
new Hitbox ( x, y )
```
### How to use checkCollision:
```js
myselectionbox.checkCollision ( /* list of hitboxes */ );

//Returns:
{
    collidedhitboxes:[ /* list of hitboxes */ ],
    collidedindicies:[ /* list of the indexes of those hitboxes */ ]
}
```
<br><br>
Note:
This was developed by Che Yu; He is my ten year old kid. 
