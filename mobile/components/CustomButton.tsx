import { cn } from "@/utils/lib";
import { TouchableOpacity, Text } from "react-native";

const CustomButton = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "default",
  IconLeft,
  IconRight,
  className,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-full rounded-full flex flex-row justify-center items-center shadow-sm ${className}`}
    >
      {IconLeft && <IconLeft />}
      <Text className="text-white">{title}</Text>
      {IconRight && <IconRight />}
    </TouchableOpacity>
  );
};

export default CustomButton;
