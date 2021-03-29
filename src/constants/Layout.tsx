import {Dimensions, StatusBar} from 'react-native';
import {getModel} from "react-native-device-info";

let width: number = Dimensions.get('window').width;
let height: number = Dimensions.get('window').height;

class Layout {
  public maxWidth: number = 600;
  public window: { width: number, height: number } = {
    width,
    height,
  };
  public isSmallDevice: boolean = this.window.width <= 360;
  public isIpad: boolean = this.window.width > 998;

  public hasMonobrow = (): string[] | null => {
    const model: string = getModel();
    return model.match(/iPhone 11|iPhone X|iPhone 12/)
  };

  public paddingTop: number =  StatusBar.currentHeight ||  24
  public paddingBottom: number = 0
  public paddingVertical: number = this.paddingBottom + this.paddingTop
}

export default new Layout();


