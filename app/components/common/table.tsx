import React, { ReactNode, useMemo, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    View,
    type StyleProp,
    type TextStyle,
    type ViewStyle,
} from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";
import { ThemedText } from "../themed-text";

export type TableColumn = {
  key: string;
  title: string;
  width?: number | string;
  flex?: number;
  align?: "left" | "center" | "right";
  sortable?: boolean;
  render?: (value: any, item?: any) => ReactNode;
};

export type TableProps = {
  columns: TableColumn[];
  data: any[];
  loading?: boolean;
  onRowPress?: (item: any) => void;
  rowKey?: string | ((item: any) => string);
  style?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  rowStyle?: StyleProp<ViewStyle>;
  noDataText?: string;
};

export default function Table({
  columns,
  data,
  loading = false,
  onRowPress,
  rowKey,
  style,
  headerStyle,
  rowStyle,
  noDataText = "No data",
}: TableProps) {
  const background = useThemeColor({}, "background");
  const muted = useThemeColor({}, "icon");
  const border = useThemeColor({}, "icon");

  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const sortedData = useMemo(() => {
    if (!sortKey) return data;
    const col = columns.find((c) => c.key === sortKey);
    if (!col) return data;
    return [...data].sort((a, b) => {
      const va = a[sortKey];
      const vb = b[sortKey];
      if (va == null && vb == null) return 0;
      if (va == null) return -1;
      if (vb == null) return 1;
      if (typeof va === "number" && typeof vb === "number")
        return sortDir === "asc" ? va - vb : vb - va;
      const sa = String(va).toLowerCase();
      const sb = String(vb).toLowerCase();
      if (sa < sb) return sortDir === "asc" ? -1 : 1;
      if (sa > sb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortKey, sortDir, columns]);

  const handleHeaderPress = (col: TableColumn) => {
    if (!col.sortable) return;
    if (sortKey !== col.key) {
      setSortKey(col.key);
      setSortDir("asc");
    } else {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    }
  };

  const keyExtractor = (item: any, index: number) => {
    if (typeof rowKey === "function") return rowKey(item);
    if (typeof rowKey === "string" && item && item[rowKey])
      return String(item[rowKey]);
    return String(index);
  };

  const renderHeader = () => (
    <View
      style={[styles.headerRow, { borderBottomColor: border }, headerStyle]}
    >
      {columns.map((col) => (
        <TouchableOpacity
          key={col.key}
          activeOpacity={col.sortable ? 0.7 : 1}
          onPress={() => handleHeaderPress(col)}
          style={[
            styles.cell, 
            col.flex ? { flex: col.flex } : {},
            typeof col.width === "number" ? { width: col.width } : {}
          ]}
        >
          <View style={styles.headerCellInner}>
            <ThemedText
              type="defaultSemiBold"
              style={[styles.headerText, { textAlign: col.align ?? "left" }]}
            >
              {col.title}
            </ThemedText>
            {col.sortable && sortKey === col.key ? (
              <ThemedText type="default" style={styles.sortIndicator}>
                {sortDir === "asc" ? "↑" : "↓"}
              </ThemedText>
            ) : null}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderRow = ({ item }: { item: any }) => {
    const RowWrapper: any = onRowPress ? TouchableOpacity : View;
    return (
      <RowWrapper
        onPress={() => onRowPress && onRowPress(item)}
        activeOpacity={0.8}
        style={[styles.row, { borderBottomColor: border }, rowStyle]}
      >
        {columns.map((col) => (
          <View
            key={col.key}
            style={[
              styles.cell, 
              col.flex ? { flex: col.flex } : {},
              typeof col.width === "number" ? { width: col.width } : {}
            ]}
          >
            {col.render ? (
              col.render(item[col.key], item)
            ) : (
              <ThemedText
                style={[
                  styles.cellText,
                  { textAlign: col.align ?? "left", color: muted },
                ]}
              >
                {item[col.key] != null ? String(item[col.key]) : ""}
              </ThemedText>
            )}
          </View>
        ))}
      </RowWrapper>
    );
  };

  if (loading) {
    return (
      <View
        style={[
          styles.loadingContainer,
          style,
          { backgroundColor: background },
        ]}
      >
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={[styles.wrapper, { backgroundColor: background }, style]}>
      {renderHeader()}

      {sortedData && sortedData.length ? (
        <FlatList
          data={sortedData}
          keyExtractor={keyExtractor}
          renderItem={renderRow}
          bounces={false}
        />
      ) : (
        <View style={styles.empty}>
          <ThemedText type="default" style={{ color: muted }}>
            {noDataText}
          </ThemedText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 8,
    borderWidth: 1,
    overflow: "hidden",
    marginVertical: 8,
  },
  headerRow: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  headerCellInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flex: 1,
  },
  headerText: {
    fontSize: 14,
  } as TextStyle,
  sortIndicator: {
    marginLeft: 6,
    fontSize: 12,
    color: "#888",
  } as TextStyle,
  row: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  cell: {
    flex: 1,
    paddingRight: 8,
  } as ViewStyle,
  cellText: {
    fontSize: 14,
  } as TextStyle,
  empty: {
    padding: 16,
    alignItems: "center",
  },
  loadingContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
