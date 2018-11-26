
var Key = function (code)
{
	this.down = false
	this.code = code
}

var Keyboard = {}

Keyboard.P = new Key(80)
Keyboard.Space = new Key(32)
Keyboard.Up = new Key(38)
Keyboard.Left = new Key(37)
Keyboard.Down = new Key(40)
Keyboard.Right = new Key(39)
Keyboard.M = new Key(77)
Keyboard.W = new Key(87)
Keyboard.A = new Key(65)
Keyboard.S = new Key(83)
Keyboard.D = new Key(68)

Keyboard.onKeyDown = function (event)
{
	for (var propertyName in Keyboard) {
		if (Keyboard.hasOwnProperty(propertyName) && Keyboard[propertyName] instanceof Key && event.keyCode == Keyboard[propertyName].code) {
			Keyboard[propertyName].down = true
		}
	}
}

Keyboard.onKeyUp = function (event)
{
	// console.log(event.keyCode)
	for (var propertyName in Keyboard) {
		if (Keyboard.hasOwnProperty(propertyName) && Keyboard[propertyName] instanceof Key && event.keyCode == Keyboard[propertyName].code) {
			Keyboard[propertyName].down = false
		}
	}
}