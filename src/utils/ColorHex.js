var ColorHex = {};

ColorHex.Red = 0xF26C4F;   
ColorHex.RedOrange = 0xF68E55;   
ColorHex.YellowOrange = 0xFBAF5C;    
ColorHex.Yellow = 0xFFF467;    
ColorHex.PeaGreen = 0xACD372;    
ColorHex.YellowGreen = 0x7CC576;   
ColorHex.Green = 0x3BB878;   
ColorHex.GreenCyan = 0x1ABBB4;   
ColorHex.Cyan = 0x00BFF3;    
ColorHex.CyanBlue = 0x438CCA;    
ColorHex.Blue = 0x5574B9;    
ColorHex.BlueViolet = 0x605CA8;    
ColorHex.Violet = 0x855FA8;    
ColorHex.VioletMagenta = 0xA763A8;   
ColorHex.Magenta = 0xF06EA9;   
ColorHex.MagentaRed = 0xF26D7D;
ColorHex.White = 0xffffff;
ColorHex.Gray05 = 0xCACACA;
ColorHex.Gray10 = 0xEBEBEB;
ColorHex.Gray15 = 0xE1E1E1;
ColorHex.Gray20 = 0xD7D7D7;
ColorHex.Gray25 = 0xD7D7D7;
ColorHex.Gray30 = 0xC2C2C2;
ColorHex.Gray35 = 0xB7B7B7;
ColorHex.Gray40 = 0xACACAC;
ColorHex.Gray45 = 0xA0A0A0;
ColorHex.Gray50 = 0x959595;
ColorHex.Gray55 = 0x898989;
ColorHex.Gray60 = 0x7D7D7D;
ColorHex.Gray65 = 0x707070;
ColorHex.Gray70 = 0x626262;
ColorHex.Gray75 = 0x555555;
ColorHex.Gray80 = 0x464646;
ColorHex.Gray85 = 0x363636;
ColorHex.Gray90 = 0x262626;
ColorHex.Gray95 = 0x111111;
ColorHex.Black = 0x000000;

ColorHex.colors = [ColorHex.Red, ColorHex.RedOrange, ColorHex.YellowOrange, ColorHex.Yellow, ColorHex.PeaGreen, ColorHex.YellowGreen, 
ColorHex.Green, ColorHex.GreenCyan, ColorHex.Cyan, ColorHex.CyanBlue, ColorHex.Blue, ColorHex.BlueViolet, ColorHex.Violet, 
ColorHex.VioletMagenta, ColorHex.Magenta, ColorHex.MagentaRed];

ColorHex.colorsMountain = [ColorHex.White, ColorHex.Gray15, ColorHex.Gray30, ColorHex.PeaGreen, ColorHex.YellowGreen, ColorHex.Green, ColorHex.GreenCyan];
ColorHex.colorsGreen = [0x00ff00, 0x00e500, 0x00cc00, 0x00b200, 0x009900, 0x007f00, 0x006600, 0x004c00, 0x003300, 0x001900, 0x000000];

var rainbowColorHexCurrentIndex = 0;

ColorHex.GetGray = function(ratio) {
  var index = Math.floor(ratio * ColorHex.grays.length);
  return ColorHex.grays[index % ColorHex.grays.length];
}

ColorHex.GetRainbow = function(ratio) {
  var index = Math.floor(ratio * ColorHex.colors.length);
  return ColorHex.colors[index % ColorHex.colors.length];
}

ColorHex.GetMountain = function(ratio) {
  var index =Math.floor( ratio * ColorHex.colorsMountain.length);
  return ColorHex.colorsMountain[index % ColorHex.colorsMountain.length];
}

ColorHex.GetGreen = function(ratio) {
  var index =Math.floor( ratio * ColorHex.colorsGreen.length);
  return ColorHex.colorsGreen[index % ColorHex.colorsGreen.length];
}

ColorHex.GetRainbowHSL = function (n) 
{
    n = n * 240 / 255;
    return 'hsl(' + n + ',100%,50%)';
};

// Auto iterate each call
ColorHex.Rainbow = function () {
  rainbowColorHexCurrentIndex = (rainbowColorHexCurrentIndex + 1) % ColorHex.colors.length;
  return ColorHex.colors[rainbowColorHexCurrentIndex];
};

// Direct access
ColorHex.Get = function(index) {
  return ColorHex.colors[index % ColorHex.colors.length];
}

ColorHex.grays = [ColorHex.White, ColorHex.Gray05, ColorHex.Gray10, ColorHex.Gray15, ColorHex.Gray20, ColorHex.Gray25, ColorHex.Gray30, 
ColorHex.Gray35, ColorHex.Gray40, ColorHex.Gray45, ColorHex.Gray50, ColorHex.Gray55, ColorHex.Gray60, 
ColorHex.Gray65, ColorHex.Gray70, ColorHex.Gray75, ColorHex.Gray80, ColorHex.Gray85, ColorHex.Gray90, ColorHex.Gray95];
