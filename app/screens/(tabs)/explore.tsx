import { Text, View } from "react-native";
import { ExternalLink } from "@/components/external-link";

export default function TabTwoScreen() {
  return (
    <>
      <Text style={{ color: "red", padding: 60 }}>HOME</Text>
      <ExternalLink href="https://google.com" style={styles.container}>
        <Text style={styles.title}>Go to Google</Text>
      </ExternalLink>
      <ExternalLink href="https://google.com" style={styles.link}>
        Go to Google
      </ExternalLink>

      <View style={{ backgroundColor: "blue", borderRadius: 8 }}>
        <ExternalLink href="https://google.com" style={styles.link}>
          Go to Google
        </ExternalLink>
      </View>
    </>
  );
}

const styles = {
  container: {
    padding: 20,
  },
  title: {
    color: "white",
    fontSize: 16,
    // fontWeight: "bold",
    marginBottom: 10,
  },
  link: {
    color: "white",
    fontSize: 16,
    padding: 20,
  },
};
