import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import CustomButton from '../Components/CustomButton';
import { statusColor } from '../Models/Enums';
import useGamesViewModel from '../ViewModels/GamesViewModel';

const GamesView = () => {
  const {
    pageTitle,
    games,
    date,
    dateToDisplay,
    open,
    isLoading,
    onDateChange,
    setDate,
    setOpen,
    getScoresForToday,
    showGameData,
    SaveGame,
  } = useGamesViewModel();

  return (
    <View style={styles.mainContainer}>
      <CustomButton
        title="Select date for games"
        disabled={isLoading}
        onPress={() => setOpen(true)}
      />
      <DatePicker
        modal
        mode="date"
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
          getScoresForToday(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      {dateToDisplay !== '' && (
        <Text style={styles.dateText}>Games for {dateToDisplay}</Text>
      )}
      <View style={styles.previewDotView}>
        <View style={styles.buttonStylePreview}>
          <Text>Upcoming</Text>
          <View
            style={[
              styles.gameDot,
              {
                backgroundColor: statusColor['PREVIEW'],
              },
            ]}
          />
        </View>
        <View style={styles.buttonStylePreview}>
          <Text>Live Game</Text>
          <View
            style={[
              styles.gameDot,
              {
                backgroundColor: statusColor['LIVE'],
              },
            ]}
          />
        </View>
        <View style={styles.buttonStylePreview}>
          <Text>Final</Text>
          <View
            style={[
              styles.gameDot,
              {
                backgroundColor: statusColor['FINAL'],
              },
            ]}
          />
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => getScoresForToday(date)}
            colors={['#9Bd35A']} // Optional: Customize indicator color
            tintColor="#888" // Optional: Customize tint color for iOS
          />
        }
      >
        {/* <CustomActivityIndicator visible={isLoading} /> */}
        <View style={{ flex: 1 }}>
          {games.length >= 1 ? (
            games.map((game, index) => (
              <View
                style={styles.gameContainer}
                key={game.teams?.home?.id || index}
              >
                <TouchableOpacity
                  style={styles.gameButton}
                  onPress={() => showGameData(game)}
                >
                  <View style={styles.buttonStyle}>
                    <Text>
                      {game.teams?.home?.teamName} vs{' '}
                      {game.teams?.away?.teamName}
                    </Text>
                    {game?.status?.state !== 'PREVIEW' && (
                      <Text>
                        {game?.scores?.[game.teams?.home?.abbreviation]} -
                        {game?.scores?.[game.teams?.away?.abbreviation]}
                      </Text>
                    )}
                    <View style={styles.rightSide}>
                      <Text>
                        {game?.startTime
                          ? new Date(game.startTime).toLocaleTimeString(
                              undefined,
                              {
                                hour: '2-digit',
                                minute: '2-digit',
                              },
                            )
                          : ''}
                      </Text>
                      <View
                        style={[
                          styles.gameDot,
                          {
                            backgroundColor:
                              statusColor[game.status?.state ?? ''],
                          },
                        ]}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.reminderButton}
                  onPress={() => SaveGame(game)}
                >
                  <FontAwesome
                    name="heart"
                    solid={game.isSaved}
                    color="red"
                    size={20}
                  />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <View>
              <Text style={styles.dateText}>There are no games today</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    margin: 10,
  },
  gameContainer: {
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 5,
    paddingVertical: 5,
    borderRadius: 10,
    alignItems: 'stretch',
    flex: 1,
    flexDirection: 'row',
  },
  reminderButton: {
    alignSelf: 'center',
    width: '10%',
  },
  gameButton: {
    width: '90%',
    // borderColor: "black",
    // borderWidth: 1,
    // marginBottom: 5,
    // marginTop: 5,
    // paddingVertical: 5,
    // borderRadius: 10,
    // alignItems: "stretch",
  },
  dateText: {
    alignSelf: 'center',
  },
  previewDotView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 10,
  },

  buttonStylePreview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  buttonStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: '100%',
  },
  rightSide: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  gameDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});

export default GamesView;
