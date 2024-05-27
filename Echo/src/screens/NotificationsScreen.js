import * as React from "react";
import {
  FlatList,
  ScrollView,
  View,
  StyleSheet,
  Image,
  Text,
} from "react-native";

const NotificationItem = ({ imageUri, message, time }) => (
  <View style={styles.notificationItem}>
    <Image
      resizeMode="auto"
      source={{ uri: imageUri }}
      style={styles.notificationImage}
    />
    <View style={styles.notificationMessageContainer}>
      <Text>{`${message} ${time}`}</Text>
    </View>
    <View style={styles.viewButtonContainer}>
      <Text>View</Text>
    </View>
  </View>
);

const notificationsToday = [
  {
    imageUri:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/95a62830ea942d09898188e900bc651c69a7f0f050dd4ae1e9bd9b42251bef54?apiKey=a65f153f0616484bbdddb43b863be0fa&",
    message: "Someone reacted to your post. You’re not alone!",
    time: "2m",
  },
  {
    imageUri:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/ad863a8be27880598427d1d2b4ae84d2cb59278392619fb54525fc8235454124?apiKey=a65f153f0616484bbdddb43b863be0fa&",
    message: "Someone reacted to your post. Best wishes!",
    time: "3m",
  },
  {
    imageUri:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/4475932be64dc985386dd45df3ef8b25e78b6e970697f9108acf6ef416672a67?apiKey=a65f153f0616484bbdddb43b863be0fa&",
    message: "Someone reacted to your post. Much love!",
    time: "25m",
  },
];

const notificationsYesterday = [
  {
    imageUri:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/35887d16dbe790339dcfb83c3b16cb8bf3af064ddcc6af7704fdf519e46cdfe4?apiKey=a65f153f0616484bbdddb43b863be0fa&",
    message: "Someone reacted to your post. You deserve it!",
    time: "1d",
  },
  {
    imageUri:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/d1d4ddc4d8e342837db1328a23a4905d9c456eb267e358ca804cdbe9b4ab1ee0?apiKey=a65f153f0616484bbdddb43b863be0fa&",
    message: "Someone reacted to your post. Stay strong!",
    time: "1d",
  },
  {
    imageUri:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/b46e17ab095e256240131f80670b130ed0d249489e0b0b3ea638521906af4457?apiKey=a65f153f0616484bbdddb43b863be0fa&",
    message: "Someone reacted to your post. Stay strong!",
    time: "1d",
  },
  {
    imageUri:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/a5c54e5754267b00dbad555b89afe758f67d0d34bfee25073e139dd37ae31b9b?apiKey=a65f153f0616484bbdddb43b863be0fa&",
    message: "Someone reacted to your post. Much love!",
    time: "1d",
  },
  {
    imageUri:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/d2b9f06626411c247cdc1a70536fccea1963436936bd7f02dc9fb750c3986e76?apiKey=a65f153f0616484bbdddb43b863be0fa&",
    message: "Someone reacted to your post. Much love!",
    time: "1d",
  },
];

function MyComponent() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          resizeMode="auto"
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/5d4e14b2a52b9e7fce1aba57d85182f5c355754df0e39b8db858aedc0dab678d?apiKey=a65f153f0616484bbdddb43b863be0fa&",
          }}
          style={styles.headerImage}
        />
        <View style={styles.headerTextContainer}>
          <Text>Notifications</Text>
        </View>
      </View>
      <View style={styles.sectionHeader}>
        <Text>Today</Text>
      </View>
      {notificationsToday.map((notification, index) => (
        <NotificationItem
          key={index}
          imageUri={notification.imageUri}
          message={notification.message}
          time={notification.time}
        />
      ))}
      <View style={styles.sectionHeader}>
        <Text>Yesterday</Text>
      </View>
      {notificationsYesterday.map((notification, index) => (
        <NotificationItem
          key={index}
          imageUri={notification.imageUri}
          message={notification.message}
          time={notification.time}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    display: "flex",
    maxWidth: 480,
    width: "100%",
    flexDirection: "column",
    alignItems: "stretch",
    color: "#000C34",
    fontWeight: "400",
    margin: "0 auto",
    padding: "54px 25px 0",
  },
  header: {
    justifyContent: "space-between",
    alignItems: "stretch",
    display: "flex",
    fontSize: 30,
    fontWeight: "700",
    whiteSpace: "nowrap",
    textAlign: "center",
  },
  headerImage: {
    position: "relative",
    width: 24,
    flexShrink: 0,
    aspectRatio: "1",
  },
  headerTextContainer: {
    leadingTrim: "both",
    textEdge: "cap",
    fontVariantNumeric: "lining-nums tabular-nums",
    fontFamily: "Nunito, sans-serif",
    flex: 1,
  },
  sectionHeader: {
    leadingTrim: "both",
    textEdge: "cap",
    fontVariantNumeric: "lining-nums tabular-nums",
    marginTop: 19,
    font: "700 16px/175% Nunito, sans-serif ",
  },
  notificationItem: {
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#F8F8F8",
    display: "flex",
    marginTop: 9,
    gap: 16,
    padding: 20,
  },
  notificationImage: {
    alignSelf: "stretch",
    position: "relative",
    width: 20,
    flexShrink: 0,
    margin: "auto 0",
    aspectRatio: "1",
  },
  notificationMessageContainer: {
    leadingTrim: "both",
    textEdge: "cap",
    fontVariantNumeric: "lining-nums tabular-nums",
    font: "16px Nunito, sans-serif ",
  },
  viewButtonContainer: {
    leadingTrim: "both",
    textEdge: "cap",
    fontVariantNumeric: "lining-nums tabular-nums",
    alignSelf: "stretch",
    margin: "auto 0",
    font: "13px/215% Nunito, sans-serif ",
  },
});

export default MyComponent;
