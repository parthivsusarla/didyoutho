import { FlatList, ListRenderItem, StyleSheet, View } from "react-native";
import { GroupCard } from "./GroupCard";
import { SectionHeader } from "./SectionHeader";
import { theme } from "../../theme/designSystem";

type ActiveGroup = {
  id: string;
  name: string;
  completedCount: number;
  totalCount: number;
  pool: number;
  live?: boolean;
  actionLabel: string;
};

type ActiveGroupsCarouselProps = {
  title?: string;
  subtitle?: string;
  groups?: ActiveGroup[];
};

const DEFAULT_GROUPS: ActiveGroup[] = [
  { id: "grp-1", name: "Weekend Warriors", completedCount: 3, totalCount: 5, pool: 50, live: true, actionLabel: "Watch" },
  { id: "grp-2", name: "Iron Circle", completedCount: 2, totalCount: 5, pool: 75, actionLabel: "Join" },
  { id: "grp-3", name: "Study Syndicate", completedCount: 4, totalCount: 6, pool: 120, live: true, actionLabel: "Watch" },
];

export function ActiveGroupsCarousel({
  title = "Active Groups",
  subtitle = "Current challenges with money pool and live progress",
  groups = DEFAULT_GROUPS,
}: ActiveGroupsCarouselProps) {
  const renderItem: ListRenderItem<ActiveGroup> = ({ item }) => (
    <GroupCard
      groupName={item.name}
      completedCount={item.completedCount}
      totalCount={item.totalCount}
      poolAmount={item.pool}
      actionLabel={item.actionLabel}
      live={item.live}
    />
  );

  return (
    <View style={styles.wrap}>
      <SectionHeader title={title} subtitle={subtitle} />

      <FlatList
        horizontal
        data={groups}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: theme.spacing.sm,
  },
  listContent: {
    paddingRight: 6,
  },
  separator: {
    width: theme.spacing.sm,
  },
});
