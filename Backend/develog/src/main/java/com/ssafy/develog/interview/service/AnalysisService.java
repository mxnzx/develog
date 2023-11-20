package com.ssafy.develog.interview.service;

import com.ssafy.develog.interview.dto.request.RequestRecordDetail;
import com.ssafy.develog.interview.dto.request.RequestVoiceAnalysis;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Slf4j
@RequiredArgsConstructor
public class AnalysisService {

    private static int negativeSimilarity(int dreamNegativePoint, int dataNegativePoint) {

        int result = Math.abs(dreamNegativePoint - dataNegativePoint);
        return 100 - result;
    }

    private static int positiveSimilarity(int dreamPositivePoint, int dataPositivePoint) {

        int result = Math.abs(dreamPositivePoint - dataPositivePoint);
        return 100 - result;
    }

    public static double jaccardSimilarity(String s1, String s2) {
        Set<Character> set1 = new HashSet<>();
        Set<Character> set2 = new HashSet<>();

        // 문자열을 집합으로 변환
        for (char c : s1.toCharArray()) {
            set1.add(c);
        }

        for (char c : s2.toCharArray()) {
            set2.add(c);
        }

        // 교집합 크기 계산
        Set<Character> intersection = new HashSet<>(set1);
        intersection.retainAll(set2);

        // 합집합 크기 계산
        Set<Character> union = new HashSet<>(set1);
        union.addAll(set2);

        // Jaccard 유사도 계산
        return (double) intersection.size() / union.size() * 100 * 30 / 100;
    }

    public static double cosineSimilarity(String s1, String s2) {
        Map<String, Integer> vector1 = buildTermFrequencyVector(s1);
        Map<String, Integer> vector2 = buildTermFrequencyVector(s2);

        // 벡터의 내적 계산
        double dotProduct = calculateDotProduct(vector1, vector2);

        // 벡터의 크기 계산
        double magnitude1 = calculateMagnitude(vector1);
        double magnitude2 = calculateMagnitude(vector2);

        // 코사인 유사도 계산
        return dotProduct / (magnitude1 * magnitude2);
    }

    private static Map<String, Integer> buildTermFrequencyVector(String text) {
        Map<String, Integer> vector = new HashMap<>();
        String[] terms = text.split(" ");

        for (String term : terms) {
            vector.put(term, vector.getOrDefault(term, 0) + 1);
        }

        return vector;
    }

    private static double calculateDotProduct(Map<String, Integer> vector1, Map<String, Integer> vector2) {
        double dotProduct = 0.0;

        for (String term : vector1.keySet()) {
            if (vector2.containsKey(term)) {
                dotProduct += vector1.get(term) * vector2.get(term);
            }
        }

        return dotProduct;
    }

    private static double calculateMagnitude(Map<String, Integer> vector) {
        double magnitude = 0.0;

        for (int value : vector.values()) {
            magnitude += Math.pow(value, 2);
        }

        return Math.sqrt(magnitude);
    }

    private static double levenshtein(String s1, String s2) {
        String longer = s1, shorter = s2;

        if (s1.length() < s2.length()) {
            longer = s2;
            shorter = s1;
        }

        int longerLength = longer.length();
        if (longerLength == 0) return 1.0;
        return (longerLength - editDistance(longer, shorter)) / (double) longerLength;
    }

    private static int editDistance(String s1, String s2) {
        s1 = s1.toLowerCase();
        s2 = s2.toLowerCase();
        int[] costs = new int[s2.length() + 1];

        for (int i = 0; i <= s1.length(); i++) {
            int lastValue = i;
            for (int j = 0; j <= s2.length(); j++) {
                if (i == 0) {
                    costs[j] = j;
                } else {
                    if (j > 0) {
                        int newValue = costs[j - 1];

                        if (s1.charAt(i - 1) != s2.charAt(j - 1)) {
                            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                        }

                        costs[j - 1] = lastValue;
                        lastValue = newValue;
                    }
                }
            }

            if (i > 0) costs[s2.length()] = lastValue;
        }

        return costs[s2.length()];
    }

    public static int speedAnalysis(String voiceText, int voiceSecond){
        int best = voiceText.length() / 5;
        return (100 - Math.abs(best - voiceSecond)) * 30 / 100;
    }

    public static int containScoreAnalysis(RequestVoiceAnalysis request) {
        return request.getContainsKeyword().size() * 40 /
                (request.getContainsKeyword().size() + request.getUnContainsKeyword().size());
    }

    public static int containKeywordScoreAnalysis(RequestRecordDetail request) {
        return request.getContainsKeyword().size() * 40 /
                (request.getContainsKeyword().size() + request.getUnContainsKeyword().size());
    }
}
