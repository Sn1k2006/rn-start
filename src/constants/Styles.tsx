import {StyleSheet, TextStyle} from 'react-native';
import Fonts from "./Fonts";
import Colors from "./Colors";

const textGeneralStyle = {
  fontSize: 14,
  lineHeight: 17,
}

const text: TextStyle = {
  ...textGeneralStyle,
  color: Colors.text,
  fontFamily: Fonts.regular,
};
const muted: TextStyle = {
  ...textGeneralStyle,
  color: Colors.muted,
  fontFamily: Fonts.regular,
};
const light: TextStyle = {
  color: Colors.text,
  fontSize: 13,
  lineHeight: 18,
  fontFamily: Fonts.light,
};
const semi: TextStyle = {
  ...textGeneralStyle,
  color: Colors.text,
  fontFamily: Fonts.semiBold,
};
const bold: TextStyle = {
  ...textGeneralStyle,
  color: Colors.text,
  fontFamily: Fonts.bold,
};

export default StyleSheet.create({
  text,
  muted,
  light,
  semi,
  bold,
});
