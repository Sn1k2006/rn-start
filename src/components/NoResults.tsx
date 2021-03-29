import React, {FC} from 'react';
import {StyleProp, StyleSheet} from 'react-native';
import {View, Text} from 'native-base';
import Styles from "../constants/Styles";

interface Props {
  text?: string,
  style?: StyleProp<any>
}

const NoResults:FC<Props> = ({text, style = {}}) => {
    return (
      <View style={[styles.container, style]}>
        <Text style={[Styles.muted, {fontSize: 16}]}>{text || 'Ничего не найдено'}</Text>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 32,
    alignItems: 'center'

  },
});

export default NoResults;
