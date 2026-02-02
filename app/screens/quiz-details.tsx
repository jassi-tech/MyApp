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
import { Palette } from "@/constants/theme";

const { width } = Dimensions.get("window");

const MOCK_QUESTIONS: Record<string, any[]> = {
  "1": [
    {
      id: "q1",
      question: "What is 15 + 27?",
      options: ["32", "42", "52", "45"],
      correct: 1,
    },
    {
      id: "q2",
      question: "What is the value of Pi (to 2 decimal places)?",
      options: ["3.12", "3.16", "3.14", "3.18"],
      correct: 2,
    },
    {
      id: "q3",
      question: "What is the square root of 144?",
      options: ["10", "11", "12", "13"],
      correct: 2,
    },
  ],
  "2": [
      {
          id: "q1",
          question: "What is the chemical symbol for Water?",
          options: ["H2O", "O2", "CO2", "HO2"],
          correct: 0,
      }
  ],
  // Fallback for other subjects
  default: [
    {
      id: "qd1",
      question: "Sample Question 1?",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correct: 0,
    },
    {
      id: "qd2",
      question: "Sample Question 2?",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correct: 1,
    },
  ],
};

export default function QuizDetailsScreen() {
  const router = useRouter();
  const { id, title } = useLocalSearchParams();
  const questions = MOCK_QUESTIONS[id as string] || MOCK_QUESTIONS.default;

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

  if (showResult) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.resultContainer}>
          <Ionicons name="checkmark-circle" size={80} color="#22c55e" />
          <ThemedText style={styles.resultTitle}>Quiz Completed!</ThemedText>
          <ThemedText style={styles.resultSubtitle}>
            You scored {score} out of {questions.length}
          </ThemedText>
          
          <View style={styles.autoSaveNotice}>
            <Ionicons name="cloud-done-outline" size={20} color="#ccc" />
            <ThemedText style={styles.autoSaveText}>Results auto-saved successfully</ThemedText>
          </View>

          <TouchableOpacity style={styles.restartButton} onPress={handleRestart}>
            <ThemedText style={styles.restartButtonText}>Restart Quiz</ThemedText>
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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="close" size={24} color={Palette.white} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <ThemedText style={styles.headerTitle}>{title}</ThemedText>
          <ThemedText style={styles.timerText}>
            <Ionicons name="time-outline" size={14} /> {timeLeft}s
          </ThemedText>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBarBackground}>
          <View 
            style={[
              styles.progressBarFill, 
              { width: `${((currentIndex + 1) / questions.length) * 100}%` }
            ]} 
          />
        </View>
        <ThemedText style={styles.progressText}>
          Question {currentIndex + 1} of {questions.length}
        </ThemedText>
      </View>

      <Animated.View 
        key={currentIndex}
        entering={FadeInRight} 
        exiting={FadeOutLeft}
        style={styles.questionCard}
      >
        <ThemedText style={styles.questionText}>
          {currentQuestion.question}
        </ThemedText>

        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option: string, index: number) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionCard,
                selectedOption === index && styles.selectedOptionCard,
              ]}
              onPress={() => setSelectedOption(index)}
            >
              <View style={[
                styles.optionIndex,
                selectedOption === index && styles.selectedOptionIndex
              ]}>
                <ThemedText style={[
                  styles.optionIndexText,
                  selectedOption === index && styles.selectedOptionIndexText
                ]}>
                  {String.fromCharCode(65 + index)}
                </ThemedText>
              </View>
              <ThemedText style={[
                styles.optionText,
                selectedOption === index && styles.selectedOptionText
              ]}>
                {option}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.nextButton, selectedOption === null && styles.disabledButton]}
          onPress={handleNext}
          disabled={selectedOption === null}
        >
          <ThemedText style={styles.nextButtonText}>
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
    backgroundColor: Palette.black,
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
    backgroundColor: Palette.darkGray,
    justifyContent: "center",
    alignItems: "center",
  },
  headerInfo: {
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Palette.white,
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
    backgroundColor: "#333",
    borderRadius: 4,
    marginBottom: 8,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#0ea5e9",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: "#888",
    textAlign: "right",
  },
  questionCard: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  questionText: {
    fontSize: 22,
    fontWeight: "700",
    color: Palette.white,
    lineHeight: 32,
    marginBottom: 30,
  },
  optionsContainer: {
    gap: 12,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Palette.darkGray,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#333",
  },
  selectedOptionCard: {
    borderColor: "#0ea5e9",
    backgroundColor: "#0c4a6e",
  },
  optionIndex: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#444",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  selectedOptionIndex: {
    backgroundColor: "#0ea5e9",
  },
  optionIndexText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ccc",
  },
  selectedOptionIndexText: {
    color: Palette.white,
  },
  optionText: {
    fontSize: 16,
    color: "#ccc",
    flex: 1,
  },
  selectedOptionText: {
    color: Palette.white,
    fontWeight: "600",
  },
  footer: {
    padding: 20,
    backgroundColor: Palette.black,
  },
  nextButton: {
    backgroundColor: "#0ea5e9",
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#1e293b",
    opacity: 0.6,
  },
  nextButtonText: {
    color: Palette.white,
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
    fontSize: 28,
    fontWeight: "bold",
    color: Palette.white,
    marginTop: 24,
  },
  resultSubtitle: {
    fontSize: 18,
    color: "#ccc",
    marginTop: 8,
    marginBottom: 32,
  },
  autoSaveNotice: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#1f2937",
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 12,
      marginBottom: 40,
  },
  autoSaveText: {
      fontSize: 13,
      color: "#ccc",
      marginLeft: 8,
  },
  restartButton: {
    backgroundColor: "#333",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginBottom: 12,
  },
  restartButtonText: {
    color: Palette.white,
    fontSize: 16,
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
