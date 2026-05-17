import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SignUpScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 480,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 480,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    // TODO: implement registration
    console.log("Sign up:", { email, password });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View
          style={[
            styles.content,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          {/* Logo */}
          <View style={styles.logoSection}>
            <BirdLogo />
            <Text style={styles.logoText}>hopeline</Text>
            <Text style={styles.tagline}>YOUR WRITING SOLUTIONS</Text>
          </View>

          {/* Title */}
          <Text style={styles.title}>Create your Account</Text>

          {/* Email */}
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#B0B7C3"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Password */}
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.input, { paddingRight: 50 }]}
              placeholder="Password"
              placeholderTextColor="#B0B7C3"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.eyeBtn}
              onPress={() => setShowPassword(!showPassword)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#9CA3AF"
              />
            </TouchableOpacity>
          </View>

          {/* Confirm Password */}
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.input, { paddingRight: 50 }]}
              placeholder="Confirm Password"
              placeholderTextColor="#B0B7C3"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirm}
            />
            <TouchableOpacity
              style={styles.eyeBtn}
              onPress={() => setShowConfirm(!showConfirm)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons
                name={showConfirm ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#9CA3AF"
              />
            </TouchableOpacity>
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.82}
            onPress={handleSignUp}
          >
            <Text style={styles.primaryButtonText}>Sign Up</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Or sign up with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Buttons */}
          <View style={styles.socialRow}>
            <SocialButton label="G" color="#4285F4" bgColor="#fff" bordered />
            <SocialButton label="f" color="#fff" bgColor="#1877F2" />
            <SocialButton label="✕" color="#fff" bgColor="#000" />
          </View>

          {/* Footer link */}
          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/signin")}>
              <Text style={styles.footerLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function BirdLogo() {
  return (
    <View style={birdStyles.wrap}>
      <View style={birdStyles.body} />
      <View style={birdStyles.wing} />
      <View style={birdStyles.tail} />
    </View>
  );
}

function SocialButton({
  label,
  color,
  bgColor,
  bordered,
}: {
  label: string;
  color: string;
  bgColor: string;
  bordered?: boolean;
}) {
  return (
    <TouchableOpacity
      style={[
        socialStyles.btn,
        { backgroundColor: bgColor },
        bordered && socialStyles.bordered,
      ]}
      activeOpacity={0.75}
    >
      <Text style={[socialStyles.label, { color }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const birdStyles = StyleSheet.create({
  wrap: {
    width: 48,
    height: 38,
    position: "relative",
    marginBottom: 6,
  },
  body: {
    position: "absolute",
    width: 28,
    height: 19,
    borderRadius: 14,
    backgroundColor: "#6B21A8",
    bottom: 0,
    left: 10,
    transform: [{ rotate: "-10deg" }],
  },
  wing: {
    position: "absolute",
    width: 22,
    height: 14,
    borderRadius: 11,
    backgroundColor: "#9333EA",
    top: 3,
    right: 0,
    transform: [{ rotate: "15deg" }],
  },
  tail: {
    position: "absolute",
    width: 12,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#7E22CE",
    bottom: 0,
    left: 0,
    transform: [{ rotate: "20deg" }],
  },
});

const socialStyles = StyleSheet.create({
  btn: {
    width: 48,
    height: 48,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  bordered: {
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
  },
  label: {
    fontSize: 19,
    fontWeight: "700",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 28,
    paddingTop: 48,
    paddingBottom: 32,
  },
  content: {
    flex: 1,
  },
  logoSection: {
    alignItems: "center",
    marginBottom: 36,
  },
  logoText: {
    fontSize: 30,
    fontWeight: "700",
    color: "#6B21A8",
    fontStyle: "italic",
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 7.5,
    color: "#9CA3AF",
    letterSpacing: 2.5,
    marginTop: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#1A1A2E",
    marginBottom: 24,
  },
  inputWrapper: {
    position: "relative",
    marginBottom: 14,
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#E8ECF4",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: "#1A1A2E",
    backgroundColor: "#F7F8FA",
  },
  eyeBtn: {
    position: "absolute",
    right: 14,
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },
  primaryButton: {
    backgroundColor: "#4B0082",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 4,
    marginBottom: 26,
    shadowColor: "#4B0082",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.38,
    shadowRadius: 10,
    elevation: 7,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.4,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 22,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E8ECF4",
  },
  dividerText: {
    fontSize: 13,
    color: "#9CA3AF",
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 18,
    marginBottom: 40,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#6B7280",
  },
  footerLink: {
    fontSize: 14,
    color: "#4B0082",
    fontWeight: "700",
  },
});
