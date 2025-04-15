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
import { styles } from "@/styles/login.styles";
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import COLORS from "@/constants/colors"; // assuming you created this

const roles = [
  { key: "student", icon: "user-graduate", label: "Student" },
  { key: "teacher", icon: "chalkboard-teacher", label: "Teacher" },
  { key: "admin", icon: "user-shield", label: "Admin" },
];

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("student");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password || !selectedRole) {
      
      Alert.alert("Error", "Please fill all fields and select a role");
      return;
    }
    console.log(JSON.stringify({ email, password, role: selectedRole }));
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
          role: selectedRole,
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

        {/* Role Selector */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginVertical: 20,
          }}
        >
          {roles.map((role) => (
            <TouchableOpacity
              key={role.key}
              onPress={() => setSelectedRole(role.key)}
              style={{
                alignItems: "center",
                padding: 10,
                borderRadius: 10,
                backgroundColor:
                  selectedRole === role.key
                    ? COLORS.primary
                    : COLORS.background,
              }}
            >
              <FontAwesome5
                name={role.icon}
                size={24}
                color={selectedRole === role.key ? "#fff" : COLORS.text}
              />
              <Text
                style={{
                  color: selectedRole === role.key ? "#fff" : COLORS.text,
                }}
              >
                {role.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? "Loading..." : "Login"}
          </Text>
          
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace("/signup")}>
          <Text style={styles.signUpLink}>Don't have an account? Signup</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
