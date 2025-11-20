import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenBackground } from '../circusComponents/ScreenBackground';
import { CircusIconButton } from '../circusComponents/CircusIconButton';

type TeamMode = 'duo' | 'trio' | 'party';

type Props = {
  onBack: () => void;
};

export const SettingsScreen = ({ onBack }: Props) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hapticsEnabled, setHapticsEnabled] = useState(true);
  const [teamMode, setTeamMode] = useState<TeamMode>('party');

  const OptionRow = ({
    label,
    value,
    onToggle,
  }: {
    label: string;
    value: boolean;
    onToggle: () => void;
  }) => (
    <TouchableOpacity style={styles.optionRow} onPress={onToggle}>
      <Text style={styles.optionLabel}>{label}</Text>
      <View
        style={[
          styles.toggle,
          value ? styles.toggleActive : styles.toggleInactive,
        ]}>
        <View
          style={[
            styles.toggleThumb,
            value ? styles.toggleThumbActive : styles.toggleThumbInactive,
          ]}
        />
      </View>
    </TouchableOpacity>
  );

  const teamModes: { value: TeamMode; label: string; detail: string }[] = [
    { value: 'duo', label: 'Duo Dash', detail: 'Two teams face off' },
    { value: 'trio', label: 'Trio Relay', detail: 'Three-player troupes' },
    { value: 'party', label: 'Party Ring', detail: 'Unlimited teams rotate' },
  ];

  return (
    <ScreenBackground>
      <SafeAreaView style={styles.settingsContainer}>
        <View style={styles.storyHeader}>
          <CircusIconButton
            label="←"
            accessibilityLabel="Go back"
            onPress={onBack}
          />
          <Text style={styles.storyHeaderTitle}>Settings & Rules</Text>
          <View style={styles.headerSpacer} />
        </View>
        <ScrollView contentContainerStyle={styles.settingsContent}>
         
          <OptionRow
            label="Haptic feedback"
            value={hapticsEnabled}
            onToggle={() => setHapticsEnabled(prev => !prev)}
          />

          <View style={styles.sectionCard}>
            <Text style={styles.panelTitle}>Team Modes</Text>
            {teamModes.map(mode => (
              <TouchableOpacity
                key={mode.value}
                style={[
                  styles.teamModeCard,
                  teamMode === mode.value && styles.teamModeActive,
                ]}
                onPress={() => setTeamMode(mode.value)}>
                <Text style={styles.teamModeTitle}>{mode.label}</Text>
                <Text style={styles.teamModeDetail}>{mode.detail}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.sectionCard}>
            <Text style={styles.panelTitle}>Rules & Flow</Text>
            <Text style={styles.rulesText}>
              1. Form teams and select a leader for the first act.{'\n'}
              2. Choose rounds and time per act; the carousel assigns a
              challenge style each time.{'\n'}
              3. The active player performs, the team guesses.{'\n'}
              4. Correct cards earn points; skipped cards return to the deck.{'\n'}
              5. After all rounds, totals decide the winning troupe.
            </Text>
          </View>

          <View style={styles.sectionCard}>
            <Text style={styles.panelTitle}>Team Showdown</Text>
            <Text style={styles.rulesText}>
              Circus Carousel thrives on movement and laughter. Keep the room
              lively, rotate performers quickly, and let the timer push the
              momentum. For extra drama, end the night with a final spotlight
              performance where every team shouts clues at once.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScreenBackground>
  );
};

const styles = StyleSheet.create({
  settingsContainer: {
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
  settingsContent: {
    padding: 20,
    gap: 16,
    paddingBottom: 120,
  },
  optionRow: {
    backgroundColor: '#051A45',
    padding: 18,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionLabel: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  toggle: {
    width: 56,
    height: 30,
    borderRadius: 15,
    padding: 3,
  },
  toggleActive: {
    backgroundColor: '#6F2CF2',
  },
  toggleInactive: {
    backgroundColor: '#1C2A5B',
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  toggleThumbActive: {
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-end',
  },
  toggleThumbInactive: {
    backgroundColor: '#FFFFFF',
  },
  sectionCard: {
    backgroundColor: '#051A45',
    borderRadius: 24,
    padding: 20,
    gap: 12,
    marginTop: 12,
  },
  panelTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  rulesText: {
    color: '#C8E2FF',
    lineHeight: 20,
  },
  teamModeCard: {
    backgroundColor: '#031336',
    borderRadius: 18,
    padding: 16,
    marginTop: 8,
  },
  teamModeActive: {
    borderWidth: 1,
    borderColor: '#FCCE45',
  },
  teamModeTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  teamModeDetail: {
    color: '#C8E2FF',
    marginTop: 4,
  },
});

