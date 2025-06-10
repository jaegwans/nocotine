// components/FormInput.tsx

import colors from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./Input.styles";
type FormInputProps = TextInputProps & {
  label?: string | React.ReactNode;
  style?: object;
  value: string;
  setValue: (value: string) => void;
};

export default function FormInput({
  label,
  style,
  value,
  setValue,
  ...props
}: FormInputProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputWrapper}>
        <TextInput
          {...props}
          value={value}
          onChangeText={setValue}
          placeholderTextColor={colors.gray}
          style={[styles.input, style]}
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={() => setValue("")}>
            <Ionicons name="close-circle" size={20} color={colors.gray} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
