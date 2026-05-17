import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";

export default function SplashScreen() {
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(0.75)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(cardOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 60,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    const timer = setTimeout(() => {
      router.replace("/signin");
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoCard,
          {
            opacity: cardOpacity,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Animated.View style={{ opacity: opacityAnim, alignItems: "center" }}>
          {/* Bird icon */}
          <View style={styles.birdWrap}>
            <View style={styles.birdBody} />
            <View style={styles.birdWingTop} />
            <View style={styles.birdTail} />
          </View>
          <Text style={styles.logoText}>hopeline</Text>
          <Text style={styles.tagline}>YOUR WRITING SOLUTIONS</Text>
        </Animated.View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3D0A6B",
    alignItems: "center",
    justifyContent: "center",
  },
  logoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    width: 230,
    height: 190,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.35,
    shadowRadius: 28,
    elevation: 20,
  },
  birdWrap: {
    width: 52,
    height: 42,
    position: "relative",
    marginBottom: 8,
  },
  birdBody: {
    position: "absolute",
    width: 28,
    height: 20,
    borderRadius: 14,
    backgroundColor: "#6B21A8",
    bottom: 0,
    left: 10,
    transform: [{ rotate: "-10deg" }],
  },
  birdWingTop: {
    position: "absolute",
    width: 22,
    height: 14,
    borderRadius: 11,
    backgroundColor: "#9333EA",
    top: 4,
    right: 0,
    transform: [{ rotate: "15deg" }],
  },
  birdTail: {
    position: "absolute",
    width: 12,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#7E22CE",
    bottom: 0,
    left: 0,
    transform: [{ rotate: "20deg" }],
  },
  logoText: {
    fontSize: 34,
    fontWeight: "700",
    color: "#6B21A8",
    fontStyle: "italic",
    letterSpacing: -0.5,
    lineHeight: 40,
  },
  tagline: {
    fontSize: 8,
    color: "#9CA3AF",
    letterSpacing: 2.5,
    marginTop: 3,
  },
});
