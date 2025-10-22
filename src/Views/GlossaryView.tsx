import { StyleSheet, Text, View } from 'react-native';
import useGlossaryViewModel from '../ViewModels/GlossaryViewModel';

const GlossaryView = () => {
  const {} = useGlossaryViewModel();

  return (
    <View style={styles.mainContainer}>
      <Text>this is the glossary page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

export default GlossaryView;
