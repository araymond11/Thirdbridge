import { useNavigation } from "expo-router";
import React, { FunctionComponent, PropsWithChildren, useRef } from "react";
import {
  Animated,
  Dimensions,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Colors } from "../utils";

type Props = {
  title: string;
  rightComponent?: React.ReactNode;
  imageUrl?: string;
};

const { height: screenHeight } = Dimensions.get("window");

const INITIAL_IMAGE_SIZE = screenHeight * 0.25;

export const PageContainer: FunctionComponent<PropsWithChildren<Props>> = ({
  children,
  title,
  imageUrl,
  rightComponent = <View style={styles.right} />,
}) => {
  const insets = useSafeAreaInsets();
  const { goBack } = useNavigation();

  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);

  const animatedHeaderHeight = scrollOffsetY.interpolate({
    inputRange: [0, INITIAL_IMAGE_SIZE],
    outputRange: [(imageUrl ? INITIAL_IMAGE_SIZE : 32) + 65, 32 + 65],
    extrapolate: "clamp",
  });

  const imageSize = scrollOffsetY.interpolate({
    inputRange: [0, INITIAL_IMAGE_SIZE],
    outputRange: [INITIAL_IMAGE_SIZE, 32],
    extrapolate: "clamp",
  });

  const imagePositionX = scrollOffsetY.interpolate({
    inputRange: [0, INITIAL_IMAGE_SIZE],
    outputRange: [0, 160],
    extrapolate: "clamp",
  });

  const imagePositionY = scrollOffsetY.interpolate({
    inputRange: [0, 150],
    outputRange: [0, -30],
    extrapolate: "clamp",
  });

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 0;
      },
      onPanResponderMove: (_, gestureState) => {
        let adjustedScrollY = lastScrollY.current - gestureState.dy;

        adjustedScrollY = Math.max(
          0,
          Math.min(adjustedScrollY, INITIAL_IMAGE_SIZE)
        );

        scrollOffsetY.setValue(adjustedScrollY);
      },
      onPanResponderRelease: (_, gestureState) => {
        let adjustedScrollY = lastScrollY.current - gestureState.dy;

        adjustedScrollY = Math.max(
          0,
          Math.min(adjustedScrollY, INITIAL_IMAGE_SIZE)
        );

        lastScrollY.current = adjustedScrollY;

        scrollOffsetY.setValue(adjustedScrollY);
      },
    })
  ).current;

  return (
    <>
      <Animated.View
        style={[
          styles.headerContainer,
          {
            paddingTop: insets.top,
            height: animatedHeaderHeight,
          },
        ]}
      >
        <View style={styles.header}>
          <Pressable onPress={goBack} style={[styles.button, styles.path]}>
            <Text style={styles.back}>← Back</Text>
          </Pressable>
          <Text style={[styles.title]}>{title}</Text>
          <View style={styles.part}>{rightComponent}</View>
        </View>
        {imageUrl && (
          <Animated.View
            style={[
              styles.imageContainer,
              {
                transform: [
                  { translateX: imagePositionX },
                  { translateY: imagePositionY },
                ],
              },
            ]}
          >
            <Animated.Image
              source={{
                uri: imageUrl,
              }}
              style={[
                styles.image,
                {
                  marginBottom: insets.top,
                  width: imageSize,
                  height: imageSize,
                },
              ]}
            />
          </Animated.View>
        )}
      </Animated.View>
      {imageUrl ? (
        <Animated.View style={[styles.content]} {...panResponder.panHandlers}>
          {children}
        </Animated.View>
      ) : (
        <View style={[styles.content]}>{children}</View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  back: {
    fontSize: 12,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  button: {
    paddingVertical: 16,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  headerContainer: {
    backgroundColor: Colors.WHITE,
    borderBottomWidth: 1,
    borderColor: Colors.GRAY,
    overflow: "hidden",
  },
  path: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  part: {
    flex: 1,
  },
  right: {
    position: "absolute",
  },
  image: {
    alignSelf: "center",
    resizeMode: "contain",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
