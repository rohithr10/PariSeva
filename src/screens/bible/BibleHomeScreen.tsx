import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../constants/colors";
import { Spacing, Radius, Shadow } from "../../constants/spacing";
import { Routes } from "../../constants/routes";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import TopSafeArea from "../../components/common/TopSafeArea/TopSafeArea";

const CARD_WIDTH =
  (Dimensions.get("window").width - Spacing.screen * 2 - Spacing.xs * 2) / 3;

const BOOKS_OLD_TESTAMENT = [
  "Genesis",
  "Exodus",
  "Leviticus",
  "Numbers",
  "Deuteronomy",
  "Joshua",
  "Judges",
  "Ruth",
  "1 Samuel",
  "2 Samuel",
  "1 Kings",
  "2 Kings",
  "1 Chronicles",
  "2 Chronicles",
  "Ezra",
  "Nehemiah",
  "Tobit",
  "Judith",
  "Esther",
  "1 Maccabees",
  "2 Maccabees",
  "Job",
  "Psalms",
  "Proverbs",
  "Ecclesiastes",
  "Song of Songs",
  "Wisdom",
  "Sirach",
  "Isaiah",
  "Jeremiah",
  "Lamentations",
  "Baruch",
  "Ezekiel",
  "Daniel",
  "Hosea",
  "Joel",
  "Amos",
  "Obadiah",
  "Jonah",
  "Micah",
  "Nahum",
  "Habakkuk",
  "Zephaniah",
  "Haggai",
  "Zechariah",
  "Malachi",
];

const BOOKS_NEW_TESTAMENT = [
  "Matthew",
  "Mark",
  "Luke",
  "John",
  "Acts",
  "Romans",
  "1 Corinthians",
  "2 Corinthians",
  "Galatians",
  "Ephesians",
  "Philippians",
  "Colossians",
  "1 Thessalonians",
  "2 Thessalonians",
  "1 Timothy",
  "2 Timothy",
  "Titus",
  "Philemon",
  "Hebrews",
  "James",
  "1 Peter",
  "2 Peter",
  "1 John",
  "2 John",
  "3 John",
  "Jude",
  "Revelation",
];

export default function BibleHomeScreen() {
  const navigation = useNavigation<any>();
  const [tab, setTab] = useState<"OT" | "NT">("OT");
  const [search, setSearch] = useState("");

  const books = tab === "OT" ? BOOKS_OLD_TESTAMENT : BOOKS_NEW_TESTAMENT;
  const filtered = search
    ? books.filter((b) => b.toLowerCase().includes(search.toLowerCase()))
    : books;

  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <TopSafeArea color={Colors.primary.navy} />
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.primary.navyDark}
      />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Holy Bible</Text>
        <Text style={styles.headerSub}>Catholic Edition (RSVCE)</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Daily Reading Banner */}
        <TouchableOpacity
          style={styles.dailyBanner}
          onPress={() => navigation.navigate(Routes.DailyReading)}
        >
          <View style={styles.dailyLeft}>
            <Text style={styles.dailyLabel}>TODAY'S READING</Text>
            <Text style={styles.dailyRef}>Isaiah 61:1–3 · John 17:1–11</Text>
            <Text style={styles.dailyPreview} numberOfLines={2}>
              "The Spirit of the Lord is upon me, for He has anointed me to
              bring Good News to the poor..."
            </Text>
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            style={styles.dailyArrow}
          />
        </TouchableOpacity>

        {/* Quick Access */}
        <View style={styles.quickRow}>
          <TouchableOpacity
            style={styles.quickCard}
            onPress={() => navigation.navigate(Routes.Bookmarks)}
          >
            <MaterialCommunityIcons
              name="bookmark-outline"
              style={styles.quickIcon}
            />
            <Text style={styles.quickLabel}>Bookmarks</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickCard}>
            <MaterialCommunityIcons name="magnify" style={styles.quickIcon} />
            <Text style={styles.quickLabel}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickCard}>
            <MaterialCommunityIcons
              name="book-open-page-variant-outline"
              style={styles.quickIcon}
            />
            <Text style={styles.quickLabel}>Continue</Text>
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchBar}>
          <MaterialCommunityIcons name="magnify" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
            placeholder="Search book..."
            placeholderTextColor={Colors.neutral.gray400}
          />
        </View>

        {/* OT / NT Toggle */}
        <View style={styles.tabRow}>
          {(["OT", "NT"] as const).map((t) => (
            <TouchableOpacity
              key={t}
              style={[styles.tab, tab === t && styles.tabActive]}
              onPress={() => setTab(t)}
            >
              <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>
                {t === "OT" ? "Old Testament" : "New Testament"}
              </Text>
              <Text
                style={[styles.tabCount, tab === t && styles.tabTextActive]}
              >
                {t === "OT" ? "46 books" : "27 books"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Book Grid */}
        <View style={styles.bookGrid}>
          {filtered.map((book, i) => (
            <TouchableOpacity
              key={i}
              style={styles.bookCard}
              onPress={() =>
                navigation.navigate(Routes.BibleReader, { book, chapter: 1 })
              }
            >
              {/* <Text style={styles.bookNum}>{i + 1}</Text> */}
              <Text style={styles.bookName} numberOfLines={2}>
                {book}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.neutral.warmWhite },
  header: {
    backgroundColor: Colors.primary.navy,
    paddingHorizontal: Spacing.screen,
    paddingTop: 8,
    paddingBottom: 20,
  },
  headerTitle: { fontSize: 26, fontWeight: "700", color: Colors.neutral.white },
  headerSub: { fontSize: 13, color: Colors.sky.blueLight, marginTop: 2 },

  dailyBanner: {
    backgroundColor: Colors.primary.navyLight,
    margin: Spacing.screen,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    ...Shadow.md,
  },
  dailyLeft: { flex: 1 },
  dailyLabel: {
    color: Colors.accent.gold,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  dailyRef: {
    color: Colors.neutral.white,
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 6,
  },
  dailyPreview: {
    color: Colors.sky.blueLight,
    fontSize: 13,
    fontStyle: "italic",
    lineHeight: 20,
  },
  dailyArrow: {
    color: Colors.accent.gold,
    fontSize: 28,
    fontWeight: "300",
    marginLeft: Spacing.sm,
  },

  quickRow: {
    flexDirection: "row",
    paddingHorizontal: Spacing.screen,
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  quickCard: {
    flex: 1,
    backgroundColor: Colors.neutral.white,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    alignItems: "center",
    ...Shadow.sm,
  },
  quickIcon: { fontSize: 24, marginBottom: 6, color: Colors.primary.navy },
  quickLabel: {
    fontSize: 12,
    color: Colors.neutral.gray600,
    fontWeight: "500",
  },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.neutral.white,
    marginHorizontal: Spacing.screen,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadow.sm,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: Spacing.xs,
    color: Colors.neutral.gray400,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
    color: Colors.neutral.gray800,
  },

  tabRow: {
    flexDirection: "row",
    paddingHorizontal: Spacing.screen,
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: Radius.lg,
    backgroundColor: Colors.neutral.white,
    borderWidth: 1.5,
    borderColor: Colors.neutral.gray200,
  },
  tabActive: {
    backgroundColor: Colors.accent.gold,
    borderColor: Colors.accent.gold,
  },
  tabText: { fontSize: 14, fontWeight: "600", color: Colors.neutral.gray500 },
  tabTextActive: { color: Colors.neutral.white },
  tabCount: { fontSize: 11, color: Colors.neutral.gray400, marginTop: 2 },

  bookGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: Spacing.screen,
    gap: Spacing.xs,
  },
  bookCard: {
    width: CARD_WIDTH,
    backgroundColor: Colors.neutral.white,
    borderRadius: Radius.md,
    padding: Spacing.sm,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 64,
    ...Shadow.sm,
  },
  bookNum: { fontSize: 10, color: Colors.neutral.gray400, marginBottom: 4 },
  bookName: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.primary.navy,
    textAlign: "center",
  },
});
