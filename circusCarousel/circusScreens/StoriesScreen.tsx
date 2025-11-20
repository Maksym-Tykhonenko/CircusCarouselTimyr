import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenBackground } from '../circusComponents/ScreenBackground';
import { stories } from '../circusData/content';
import { Story } from '../circusTypes';
import { CircusIconButton } from '../circusComponents/CircusIconButton';

type Props = {
  onBack: () => void;
  onSelect: (story: Story) => void;
};

export const StoriesScreen = ({ onBack, onSelect }: Props) => {
  return (
    <ScreenBackground>
      <SafeAreaView style={styles.storyContainer}>
        <View style={styles.storyHeader}>
          <CircusIconButton
            label="←"
            accessibilityLabel="Back to previous screen"
            onPress={onBack}
          />
          <Text style={styles.storyHeaderTitle}>Circus Stories</Text>
          <View style={styles.headerSpacer} />
        </View>
        <ScrollView contentContainerStyle={styles.storyList}>
          {stories.map(story => (
            <TouchableOpacity
              key={story.id}
              onPress={() => onSelect(story)}
              style={styles.storyCard}>
              <View>
                <Text style={styles.storyTitle}>{story.title}</Text>
                <Text style={styles.storySummary}>{story.summary}</Text>
              </View>
              <Text style={styles.storyArrow}>→</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </ScreenBackground>
  );
};

const styles = StyleSheet.create({
  storyContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  storyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  headerSpacer: {
    width: 42,
    height: 42,
  },
  storyHeaderTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  storyList: {
    padding: 20,
    gap: 16,
    paddingBottom: 120,
  },
  storyCard: {
    backgroundColor: '#FFE4C9',
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  storyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3E0544',
  },
  storySummary: {
    color: '#6F2CF2',
    marginTop: 4,
    width: '50%',
  },
  storyArrow: {
    fontSize: 28,
    color: '#F14081',
  },
});

