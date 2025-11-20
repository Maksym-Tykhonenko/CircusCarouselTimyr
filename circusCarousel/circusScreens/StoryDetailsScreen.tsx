import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenBackground } from '../circusComponents/ScreenBackground';
import { Story } from '../circusTypes';
import { CircusIconButton } from '../circusComponents/CircusIconButton';

type Props = {
  story: Story;
  onBack: () => void;
};

export const StoryDetailsScreen = ({ story, onBack }: Props) => {
  return (
    <ScreenBackground>
      <SafeAreaView style={styles.storyDetailsContainer}>
        <View style={styles.storyHeader}>
          <CircusIconButton
            label="←"
            accessibilityLabel="Go back to stories"
            onPress={onBack}
          />
          <Text style={styles.storyHeaderTitle}>Story</Text>
          <CircusIconButton
            label="⇪"
            accessibilityLabel="Share story"
            onPress={() => {}}
          />
        </View>
        <ScrollView contentContainerStyle={styles.storyDetailsContent}>
          <Text style={styles.storyDetailsTitle}>{story.title}</Text>
          <Text style={styles.storyDetailsBody}>{story.content}</Text>
        </ScrollView>
      </SafeAreaView>
    </ScreenBackground>
  );
};

const styles = StyleSheet.create({
  storyDetailsContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  storyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  storyHeaderTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  storyDetailsContent: {
    padding: 24,
    marginTop: 20,
    marginHorizontal: 20,

    marginBottom: 120,
    borderRadius: 20,
    paddingBottom: 120,
    backgroundColor: '#EBE3CE',
  },
  storyDetailsTitle: {
    fontSize: 26,
    color: '#5E0707',
    fontWeight: '800',
    marginBottom: 16,

  },
  storyDetailsBody: {
    color: '#5E0707',
    lineHeight: 22,
    // backgroundColor: '#051A45',
    fontSize: 16,
  },
});

