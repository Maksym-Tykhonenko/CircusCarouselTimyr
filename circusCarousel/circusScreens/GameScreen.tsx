import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CircusButton } from '../circusComponents/CircusButton';
import { CircusIconButton } from '../circusComponents/CircusIconButton';
import {
  RouletteWheel,
  RouletteWheelHandle,
} from '../circusComponents/RouletteWheel';
import { ScreenBackground } from '../circusComponents/ScreenBackground';
import { challengeDeck, wordDeck } from '../circusData/content';
import { useTimer } from '../circusHooks/useTimer';

type Props = {
  onBack: () => void;
  onOpenStories: () => void;
  onOpenSettings: () => void;
};

const GamePanel = ({
  rounds,
  timePerAct,
  onRoundsChange,
  onTimeChange,
}: {
  rounds: number;
  timePerAct: number;
  onRoundsChange: (value: number) => void;
  onTimeChange: (value: number) => void;
}) => {
  const adjust = (next: number, setter: (value: number) => void) => {
    if (next < 1) {
      return;
    }
    setter(next);
  };

  return (
    <View style={styles.gamePanel}>
      <Text style={styles.panelTitle}>Game Setup</Text>
      <View style={styles.panelRow}>
        <Text style={styles.panelLabel}>Rounds</Text>
        <View style={styles.panelControls}>
          <CircusIconButton
            label="-"
            size="medium"
            accessibilityLabel="Decrease rounds"
            onPress={() => adjust(rounds - 1, onRoundsChange)}
          />
          <Text style={styles.panelValue}>{rounds}</Text>
          <CircusIconButton
            label="+"
            size="medium"
            accessibilityLabel="Increase rounds"
            onPress={() => adjust(rounds + 1, onRoundsChange)}
          />
        </View>
      </View>
      <View style={styles.panelRow}>
        <Text style={styles.panelLabel}>Time per act</Text>
        <View style={styles.panelControls}>
          <CircusIconButton
            label="-"
            size="medium"
            accessibilityLabel="Decrease time per act"
            onPress={() => adjust(timePerAct - 15, onTimeChange)}
          />
          <Text style={styles.panelValue}>{timePerAct}s</Text>
          <CircusIconButton
            label="+"
            size="medium"
            accessibilityLabel="Increase time per act"
            onPress={() => adjust(timePerAct + 15, onTimeChange)}
          />
        </View>
      </View>
    </View>
  );
};

export const GameScreen = ({
  onBack,
  onOpenStories,
  onOpenSettings,
}: Props) => {
  const wheelRef = useRef<RouletteWheelHandle>(null);
  const [rounds, setRounds] = useState(3);
  const [timePerAct, setTimePerAct] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [currentWord, setCurrentWord] = useState(wordDeck[0]);
  const [currentRound, setCurrentRound] = useState(1);
  const [challenge, setChallenge] = useState(
    'Spin the wheel to draw your first act.',
  );

  const timer = useTimer(isRunning, timePerAct, () => {
    setIsRunning(false);
    setCurrentRound(prev => Math.min(prev + 1, rounds));
  });

  const drawWord = () =>
    wordDeck[Math.floor(Math.random() * wordDeck.length)];

  const handleStart = () => {
    setScore(0);
    setCurrentRound(1);
    setCurrentWord(drawWord());
    setIsRunning(true);
    wheelRef.current?.spin();
  };

  const handleSkip = () => {
    setCurrentWord(drawWord());
    wheelRef.current?.spin();
  };

  const handleCorrect = () => {
    setScore(prev => prev + 1);
    setCurrentWord(drawWord());
    wheelRef.current?.spin();
  };

  useEffect(() => {
    if (!isRunning) {
      setChallenge('Spin the wheel to draw your next act.');
    }
  }, [isRunning]);

  const progress = useMemo(() => {
    const totalActs = rounds;
    return currentRound / totalActs;
  }, [currentRound, rounds]);

  return (
    <ScreenBackground>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <CircusIconButton
            label="←"
            accessibilityLabel="Go back to menu"
            onPress={onBack}
          />
          <CircusIconButton
            label="✶"
            accessibilityLabel="Open stories"
            onPress={onOpenStories}
          />
        </View>
        <ScrollView
          style={styles.homeContainer}
          contentContainerStyle={styles.homeContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.heroCard}>
            <Text style={styles.heroTitle}>Team Showdown</Text>
            <Text style={styles.heroSubtitle}>
              Circus Carousel is a party game where friends compete in quick,
              creative rounds inspired by the energy of a real circus show.
            </Text>
            <CircusButton label="Settings & Rules" onPress={onOpenSettings} />
          </View>

          <View style={styles.descriptionCard}>
            <Text style={styles.descriptionText}>
              Players form teams, set the number of rounds, choose the time for
              each act, and then step into a series of fast performances based
              on changing challenge styles. Each act keeps the game
              unpredictable, noisy, and fun. When all rounds are finished, the
              app totals the points and names the winning troupe.
            </Text>
          </View>

          <GamePanel
            rounds={rounds}
            timePerAct={timePerAct}
            onRoundsChange={setRounds}
            onTimeChange={setTimePerAct}
          />

          <View style={styles.wheelCard}>
            <Text style={styles.wheelTitle}>Each turn decides your act</Text>
            <Text style={styles.wheelSubtitle}>
              Spin the roulette to learn what your team must perform. Skip to
              spin again.
            </Text>
            <RouletteWheel
              ref={wheelRef}
              segments={challengeDeck}
              onResult={setChallenge}
            />
          </View>

          <View style={styles.progressBar}>
            <View
              style={[styles.progressFill, { width: `${progress * 100}%` }]}
            />
          </View>
          <Text style={styles.progressLabel}>
            Round {currentRound} of {rounds}
          </Text>

          <View style={styles.gameCard}>
            <Text style={styles.gameCardLabel}>Active Challenge</Text>
            <Text style={styles.challengeText}>{challenge}</Text>
            <Text style={styles.timerText}>{timer}s</Text>
            <Text style={styles.wordText}>{currentWord}</Text>
            <Text style={styles.scoreLabel}>Score: {score}</Text>
            <View style={styles.gameActions}>
              <CircusButton label="Start" onPress={handleStart} />
              <CircusButton label="Correct" onPress={handleCorrect} />
              <CircusButton
                variant="secondary"
                label="Skip"
                onPress={handleSkip}
              />
            </View>
          </View>

          <View style={styles.secondaryCard}>
            <Text style={styles.panelTitle}>Team Showdown tips</Text>
            <Text style={styles.tipText}>
              • One player steps into the spotlight each round.{'\n'}
              • Correct guesses earn points instantly.{'\n'}
              • Tough cards can be skipped — the timer never stops.{'\n'}
              • Keep score, keep calm, and celebrate the winning troupe.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScreenBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    alignItems: 'center',
  },
  homeContainer: {
    flex: 1,
  },
  homeContent: {
    padding: 24,
    paddingBottom: 120,
  },
  heroCard: {
    backgroundColor: '#051A45',
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: '#123578',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  heroSubtitle: {
    color: '#C8E2FF',
    fontSize: 16,
    marginBottom: 24,
    lineHeight: 22,
  },
  descriptionCard: {
    backgroundColor: '#07245D',
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
  },
  descriptionText: {
    color: '#E0F0FF',
    lineHeight: 20,
    fontSize: 15,
  },
  gamePanel: {
    backgroundColor: '#FFE4C9',
    borderRadius: 32,
    padding: 20,
    marginBottom: 16,
  },
  panelTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#300941',
    marginBottom: 12,
  },
  panelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  panelLabel: {
    fontSize: 16,
    color: '#300941',
    fontWeight: '600',
  },
  panelControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  panelValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#300941',
  },
  wheelCard: {
    backgroundColor: '#031336',
    borderRadius: 32,
    padding: 24,
    gap: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#123578',
  },
  wheelTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  wheelSubtitle: {
    color: '#C8E2FF',
    lineHeight: 20,
  },
  progressBar: {
    height: 12,
    backgroundColor: '#092B6B',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FCCE45',
  },
  progressLabel: {
    color: '#C8E2FF',
    marginBottom: 16,
  },
  gameCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
  },
  gameCardLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F14081',
  },
  challengeText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#300941',
    marginVertical: 6,
  },
  timerText: {
    fontSize: 32,
    fontWeight: '800',
    color: '#6F2CF2',
    marginBottom: 6,
  },
  wordText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#300941',
    marginBottom: 6,
  },
  scoreLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#3B0C45',
  },
  gameActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  secondaryCard: {
    backgroundColor: '#051A45',
    borderRadius: 24,
    padding: 20,
    marginBottom: 80,
  },
  tipText: {
    color: '#C8E2FF',
    lineHeight: 20,
    marginBottom: 12,
  },
});

