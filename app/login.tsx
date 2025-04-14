import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "@/styles/signup.styles";
import { useRouter } from "expo-router";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    setIsLoading(true);

    try {
      const response = await fetch("http:/192.168.1.8:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert("Success", "Login successful!");
      } else {
        Alert.alert("Error", data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "Network request failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={"#888"}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={"#888"}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? "Loading..." : "Login"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/signup")}>
          <Text style={styles.loginLink}>Don't have an account? Signup</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default LoginScreen;
