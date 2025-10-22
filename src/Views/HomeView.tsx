import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../Components/CustomButton';
import useHomeViewModel from '../ViewModels/HomeViewModel';

const HomeView = () => {
  const { navButtonPress } = useHomeViewModel();
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.buttonContainer}>
        <CustomButton
          style={styles.button}
          title="Teams"
          onPress={() => navButtonPress('Details')}
          iconName="save"
        />
        <CustomButton
          style={styles.button}
          title="Shows"
          onPress={() => navButtonPress('Shows')}
          iconName="save"
        />
        <CustomButton
          style={styles.button}
          title="Stats"
          onPress={() => navButtonPress('Stats')}
          iconName="save"
        />
        <CustomButton
          style={styles.button}
          title="Glossary"
          onPress={() => navButtonPress('Glossary')}
          iconName="save"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    margin: 10,
  },
  buttonContainer: {
    gap: 10,
  },
  button: {},
});

export default HomeView;
