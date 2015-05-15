var Color = {};

Color.Red = '#F26C4F';   
Color.RedOrange = '#F68E55';   
Color.YellowOrange = '#FBAF5C';    
Color.Yellow = '#FFF467';    
Color.PeaGreen = '#ACD372';    
Color.YellowGreen = '#7CC576';   
Color.Green = '#3BB878';   
Color.GreenCyan = '#1ABBB4';   
Color.Cyan = '#00BFF3';    
Color.CyanBlue = '#438CCA';    
Color.Blue = '#5574B9';    
Color.BlueViolet = '#605CA8';    
Color.Violet = '#855FA8';    
Color.VioletMagenta = '#A763A8';   
Color.Magenta = '#F06EA9';   
Color.MagentaRed = '#F26D7D';
Color.White = '#ffffff';
Color.Gray05 = '#CACACA';
Color.Gray10 = '#EBEBEB';
Color.Gray15 = '#E1E1E1';
Color.Gray20 = '#D7D7D7';
Color.Gray25 = '#D7D7D7';
Color.Gray30 = '#C2C2C2';
Color.Gray35 = '#B7B7B7';
Color.Gray40 = '#ACACAC';
Color.Gray45 = '#A0A0A0';
Color.Gray50 = '#959595';
Color.Gray55 = '#898989';
Color.Gray60 = '#7D7D7D';
Color.Gray65 = '#707070';
Color.Gray70 = '#626262';
Color.Gray75 = '#555555';
Color.Gray80 = '#464646';
Color.Gray85 = '#363636';
Color.Gray90 = '#262626';
Color.Gray95 = '#111111';
Color.Black = '#000000';

Color.colors = [Color.Red, Color.RedOrange, Color.YellowOrange, Color.Yellow, Color.PeaGreen, Color.YellowGreen, 
Color.Green, Color.GreenCyan, Color.Cyan, Color.CyanBlue, Color.Blue, Color.BlueViolet, Color.Violet, 
Color.VioletMagenta, Color.Magenta, Color.MagentaRed];

Color.colorsMountain = [Color.White, Color.Gray15, Color.Gray30, Color.PeaGreen, Color.YellowGreen, Color.Green, Color.GreenCyan];
Color.colorsGreen = ['#00ff00', '#00e500', '#00cc00', '#00b200', '#009900', '#007f00', '#006600', '#004c00', '#003300', '#001900', '#000000'];

var rainbowColorCurrentIndex = 0;

Color.GetGray = function(ratio) {
  var index = Math.floor(ratio * Color.grays.length);
  return Color.grays[index % Color.grays.length];
}

Color.GetRainbow = function(ratio) {
  var index = Math.floor(ratio * Color.colors.length);
  return Color.colors[index % Color.colors.length];
}

Color.GetMountain = function(ratio) {
  var index =Math.floor( ratio * Color.colorsMountain.length);
  return Color.colorsMountain[index % Color.colorsMountain.length];
}

Color.GetGreen = function(ratio) {
  var index =Math.floor( ratio * Color.colorsGreen.length);
  return Color.colorsGreen[index % Color.colorsGreen.length];
}

Color.GetRainbowHSL = function (n) 
{
    n = n * 240 / 255;
    return 'hsl(' + n + ',100%,50%)';
};

// Auto iterate each call
Color.Rainbow = function () {
  rainbowColorCurrentIndex = (rainbowColorCurrentIndex + 1) % Color.colors.length;
  return Color.colors[rainbowColorCurrentIndex];
};

// Direct access
Color.Get = function(index) {
  return Color.colors[index % Color.colors.length];
}

Color.grays = [Color.White, Color.Gray05, Color.Gray10, Color.Gray15, Color.Gray20, Color.Gray25, Color.Gray30, 
Color.Gray35, Color.Gray40, Color.Gray45, Color.Gray50, Color.Gray55, Color.Gray60, 
Color.Gray65, Color.Gray70, Color.Gray75, Color.Gray80, Color.Gray85, Color.Gray90, Color.Gray95];
