import React, {FC} from 'react';
import {Spinner as NativeSpinner} from 'native-base';
import Colors from "../constants/Colors";
import {StyleSheet, StyleProp} from "react-native";

interface IListItem {
  show?: boolean
  color?: string
  page?: boolean
  style?: StyleProp<any>
  size?: 'large' | 'small'
}

const Spinner: FC<IListItem> = ({show = true, color = Colors.tintColor, page, style = {}, size = 'large'}) => {
  if (!show) return null;
  return (
    <NativeSpinner color={color} size={size} style={[styles.spinner, page ? styles.page_spinner : {}, style]}/>
  );
};

const styles = StyleSheet.create({
  spinner: {
    flex: 0,
    height: 30,
    width: '100%',
  },
  page_spinner: {
    top: 24,
    position: 'absolute',
    alignSelf: 'center'
  },
});

export default Spinner;
