import { Text, View } from "react-native";
import { Button } from '@monorepo/shared';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Button title="Click me!" onPress={() => alert('Button clicked!')} variant="primary" />
    </View>
  );
}
