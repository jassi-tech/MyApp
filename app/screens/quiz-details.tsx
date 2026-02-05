import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Dimensions,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";

import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/context/ThemeContext";

import { useStudent, QuizQuestion } from "@/context/StudentContext";

const { width } = Dimensions.get("window");

export default function QuizDetailsScreen() {
  const router = useRouter();
  const { id, title } = useLocalSearchParams();
  const { getQuizQuestions } = useStudent();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const { colors, fontScale } = useTheme();

  useEffect(() => {
    const fetchQuestions = async () => {
      if (id) {
        const data = await getQuizQuestions(id as string);
        setQuestions(data);
        setLoadingQuestions(false);
      }
    };
    fetchQuestions();
  }, [id]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds for the whole quiz

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      setShowResult(true);
    }
  }, [timeLeft, showResult]);

  const handleNext = () => {
    if (selectedOption !== null) {
      if (selectedOption === questions[currentIndex].correct) {
        setScore(score + 1);
      }

      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedOption(null);
      } else {
        setShowResult(true);
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
    setTimeLeft(60);
  };

  if (loadingQuestions) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }]}>
        <ThemedText>Loading Quiz Questions...</ThemedText>
      </SafeAreaView>
    );
  }

  if (questions.length === 0) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }]}>
        <ThemedText style={{ marginBottom: 20 }}>No questions found for this quiz.</ThemedText>
        <TouchableOpacity style={styles.homeButton} onPress={() => router.back()}>
          <ThemedText style={styles.homeButtonText}>Go Back</ThemedText>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (showResult) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
        <View style={styles.resultContainer}>
          <Ionicons name="checkmark-circle" size={80} color={colors.success} />
          <ThemedText style={[styles.resultTitle, { color: colors.text, fontSize: 28 * fontScale }]}>Quiz Completed!</ThemedText>
          <ThemedText style={[styles.resultSubtitle, { color: colors.textSecondary, fontSize: 18 * fontScale }]}>
            You scored {score} out of {questions.length}
          </ThemedText>
          
          <View style={[styles.autoSaveNotice, { backgroundColor: colors.card }]}>
            <Ionicons name="cloud-done-outline" size={20} color={colors.textSecondary} />
            <ThemedText style={[styles.autoSaveText, { color: colors.textSecondary }]}>Results auto-saved successfully</ThemedText>
          </View>

          <TouchableOpacity style={[styles.restartButton, { backgroundColor: colors.card }]} onPress={handleRestart}>
            <ThemedText style={[styles.restartButtonText, { color: colors.text }]}>Restart Quiz</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.homeButton} onPress={() => router.back()}>
            <ThemedText style={styles.homeButtonText}>Back to Subjects</ThemedText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity style={[styles.backButton, { backgroundColor: colors.card }]} onPress={() => router.back()}>
          <Ionicons name="close" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <ThemedText style={[styles.headerTitle, { color: colors.text, fontSize: 16 * fontScale }]}>{title}</ThemedText>
          <ThemedText style={styles.timerText}>
            <Ionicons name="time-outline" size={14} /> {timeLeft}s
          </ThemedText>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.progressContainer}>
        <View style={[styles.progressBarBackground, { backgroundColor: colors.border }]}>
          <View 
            style={[
              styles.progressBarFill, 
              { width: `${((currentIndex + 1) / questions.length) * 100}%`, backgroundColor: colors.primary }
            ]} 
          />
        </View>
        <ThemedText style={[styles.progressText, { color: colors.textSecondary }]}>
          Question {currentIndex + 1} of {questions.length}
        </ThemedText>
      </View>

      <Animated.View 
        key={currentIndex}
        entering={FadeInRight} 
        exiting={FadeOutLeft}
        style={styles.questionCard}
      >
        <ThemedText style={[styles.questionText, { color: colors.text, fontSize: 22 * fontScale }]}>
          {currentQuestion.question}
        </ThemedText>

        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option: string, index: number) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionCard,
                { backgroundColor: colors.card, borderColor: colors.border },
                selectedOption === index && { borderColor: colors.primary, backgroundColor: colors.primary + '20' },
              ]}
              onPress={() => setSelectedOption(index)}
            >
              <View style={[
                styles.optionIndex,
                { backgroundColor: colors.border },
                selectedOption === index && { backgroundColor: colors.primary }
              ]}>
                <ThemedText style={[
                  styles.optionIndexText,
                  { color: colors.textSecondary },
                  selectedOption === index && { color: "#fff" }
                ]}>
                  {String.fromCharCode(65 + index)}
                </ThemedText>
              </View>
              <ThemedText style={[
                styles.optionText,
                { color: colors.textSecondary, fontSize: 16 * fontScale },
                selectedOption === index && { color: colors.text, fontWeight: "600" }
              ]}>
                {option}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>

      <View style={[styles.footer, { backgroundColor: colors.background }]}>
        <TouchableOpacity
          style={[styles.nextButton, { backgroundColor: colors.primary }, selectedOption === null && { backgroundColor: colors.border, opacity: 0.6 }]}
          onPress={handleNext}
          disabled={selectedOption === null}
        >
          <ThemedText style={[styles.nextButtonText, { color: "#fff" }]}>
            {currentIndex === questions.length - 1 ? "Submit Quiz" : "Next Question"}
          </ThemedText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerInfo: {
    alignItems: "center",
  },
  headerTitle: {
    fontWeight: "bold",
  },
  timerText: {
    fontSize: 12,
    color: "#fb923c",
    marginTop: 2,
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  progressBarBackground: {
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    textAlign: "right",
  },
  questionCard: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  questionText: {
    fontWeight: "700",
    lineHeight: 32,
    marginBottom: 30,
  },
  optionsContainer: {
    gap: 12,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  optionIndex: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  optionIndexText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  optionText: {
    flex: 1,
  },
  footer: {
    padding: 20,
  },
  nextButton: {
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  resultContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  resultTitle: {
    fontWeight: "bold",
    marginTop: 24,
  },
  resultSubtitle: {
    marginTop: 8,
    marginBottom: 32,
  },
  autoSaveNotice: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 12,
      marginBottom: 40,
  },
  autoSaveText: {
      fontSize: 13,
      marginLeft: 8,
  },
  restartButton: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginBottom: 12,
  },
  restartButtonText: {
    fontWeight: "600",
  },
  homeButton: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    width: "100%",
    alignItems: "center",
  },
  homeButtonText: {
    color: "#0ea5e9",
    fontSize: 16,
    fontWeight: "600",
  },
});
