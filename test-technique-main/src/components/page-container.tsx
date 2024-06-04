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
const HEADER_MIN_HEIGHT = 45;
const SCROLL_DISTANCE = INITIAL_IMAGE_SIZE + HEADER_MIN_HEIGHT;

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
    inputRange: [0, 150],
    outputRange: [(imageUrl ? INITIAL_IMAGE_SIZE : 32) + 60, 32 + 60],
    extrapolate: "clamp",
  });

  const imageSize = scrollOffsetY.interpolate({
    inputRange: [0, 150],
    outputRange: [INITIAL_IMAGE_SIZE, 32],
    extrapolate: "clamp",
  });

  const imagePositionX = scrollOffsetY.interpolate({
    inputRange: [0, 150],
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
        return Math.abs(gestureState.dy) > 10;
      },
      onPanResponderMove: (_, gestureState) => {
        const dy = gestureState.dy;
        const newScrollY = Math.min(
          Math.max(lastScrollY.current - dy, 0),
          SCROLL_DISTANCE
        );
        scrollOffsetY.setValue(newScrollY);
      },
      onPanResponderRelease: (_, gestureState) => {
        const dy = gestureState.dy;
        lastScrollY.current = Math.min(
          Math.max(lastScrollY.current - dy, 0),
          SCROLL_DISTANCE
        );
        scrollOffsetY.setValue(lastScrollY.current);
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
