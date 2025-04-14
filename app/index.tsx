import { Text, View, StyleSheet } from "react-native";
import { styles } from "../styles/signup.styles";
import SignupScreen from "./signup";
export default function Index() {
  return (
    <View style={styles.container}>
      <SignupScreen></SignupScreen>
    </View>
  );
}
