import { View, Text, Pressable } from "react-native";
import { cssInterop } from "nativewind";

// Explicitly register all React Native components used in our shared components
cssInterop(View, { className: "view" });
cssInterop(Text, { className: "text" });
cssInterop(Pressable, { className: "pressable" });
