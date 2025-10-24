import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { Animated, FlatList, StyleSheet, Text, View } from 'react-native';
import CustomActivityIndicator from '../Components/CustomActivityIndicator';
import InputWithButton from '../Components/InputWithButton';
import useGlossaryViewModel from '../ViewModels/GlossaryViewModel';

const GlossaryRow = ({ item, highlightedId }: any) => {
  const fadeAnim = new Animated.Value(0);

  // Animate highlight when this row matches highlightedId
  if (highlightedId === item.id) {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1200,
        useNativeDriver: false,
      }),
    ]).start();
  }

  const backgroundColor = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#f5f5f5', '#fff3b0'], // gray → yellow
  });

  return (
    <Animated.View style={[styles.itemContainer, { backgroundColor }]}>
      <Text style={styles.termTitle}>{item.fullName}</Text>
      <Text style={styles.termDef}>{item.definition}</Text>
    </Animated.View>
  );
};

const GlossaryView = () => {
  const {
    isLoading,
    terms,
    searchTerm,
    highlightedId,
    scrollViewRef,
    setSearchTerm,
    buildGlossary,
    searchByTerm,
  } = useGlossaryViewModel();

  useFocusEffect(
    useCallback(() => {
      buildGlossary();
    }, []),
  );

  return (
    <View style={styles.mainContainer}>
      <CustomActivityIndicator visible={isLoading} />

      <InputWithButton
        value={searchTerm}
        onChangeText={setSearchTerm}
        onPress={() => searchByTerm(searchTerm)}
        placeholder="Search glossary..."
        buttonTitle="Search"
        disabled={isLoading}
      />

      {terms?.data?.length ? (
        <FlatList
          ref={scrollViewRef}
          data={terms.data}
          keyExtractor={item => item.id?.toString() ?? Math.random().toString()}
          renderItem={({ item }) => (
            <GlossaryRow item={item} highlightedId={highlightedId} />
          )}
          onScrollToIndexFailed={info => {
            setTimeout(() => {
              scrollViewRef.current?.scrollToIndex({
                index: info.index,
                animated: true,
              });
            }, 300);
          }}
        />
      ) : (
        <Text style={styles.noDataText}>There is no data to show</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    margin: 10,
  },
  itemContainer: {
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
    padding: 8,
    borderRadius: 8,
  },
  termTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  termDef: {
    fontSize: 14,
    color: '#555',
  },
  noDataText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#999',
  },
});

export default GlossaryView;
