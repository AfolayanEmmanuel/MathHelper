import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { memo, useCallback, useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { ProblemCard } from '../../components/ScanResults';
import { Button, EmptyState, styles as ui } from '../../components/ui';
import { SavedProblem, useAppActions, useAppState } from '../../context/AppStore';
import { useTheme } from '../../hooks/useTheme';
import { confirmAction } from '../../lib/confirm';
import { radius, spacing } from '../../theme';

const formatDate = (ts: number) => new Date(ts).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });

const SavedItem = memo(function SavedItem({
  item,
  expanded,
  onToggle,
  onDelete,
}: {
  item: SavedProblem;
  expanded: boolean;
  onToggle: (id: string) => void;
  onDelete: (item: SavedProblem) => void;
}) {
  const { colors } = useTheme();
  return (
    <View style={{ gap: spacing.sm }}>
      <ProblemCard problem={item} collapsed={!expanded} />
      <View style={s.itemFooter}>
        <Text style={[s.date, { color: colors.textMuted }]}>Saved {formatDate(item.savedAt)}</Text>
        <View style={s.itemActions}>
          <Pressable onPress={() => onToggle(item.id)} hitSlop={8} accessibilityRole="button">
            <Text style={[s.link, { color: colors.primary }]}>{expanded ? 'Hide steps' : 'Show steps'}</Text>
          </Pressable>
          <Pressable onPress={() => onDelete(item)} hitSlop={8} accessibilityRole="button" accessibilityLabel="Delete saved problem">
            <Ionicons name="trash-outline" size={18} color={colors.danger} />
          </Pressable>
        </View>
      </View>
    </View>
  );
});

export default function SavedScreen() {
  const { colors } = useTheme();
  const { saved, hydrated } = useAppState();
  const { removeProblem, clearSaved } = useAppActions();
  const [query, setQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return saved;
    return saved.filter((p) => [p.question, p.answer, p.topic].some((field) => field?.toLowerCase().includes(q)));
  }, [saved, query]);

  const onToggle = useCallback((id: string) => setExpandedId((cur) => (cur === id ? null : id)), []);
  const onDelete = useCallback(
    (item: SavedProblem) => confirmAction('Delete this problem?', item.question, 'Delete', () => removeProblem(item.id)),
    [removeProblem],
  );

  const renderItem = useCallback(
    ({ item }: { item: SavedProblem }) => (
      <SavedItem item={item} expanded={item.id === expandedId} onToggle={onToggle} onDelete={onDelete} />
    ),
    [expandedId, onToggle, onDelete],
  );

  return (
    <FlatList
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={[ui.screenContent, filtered.length === 0 && { flexGrow: 1 }]}
      data={filtered}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      initialNumToRender={6}
      windowSize={7}
      ListHeaderComponent={
        saved.length > 0 ? (
          <View style={{ gap: spacing.md }}>
            <View style={[s.search, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Ionicons name="search" size={18} color={colors.textMuted} />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search questions, answers or topics"
                placeholderTextColor={colors.textMuted}
                style={{ flex: 1, color: colors.text, fontSize: 16 }}
                autoCapitalize="none"
                accessibilityLabel="Search saved problems"
              />
              {!!query && (
                <Pressable onPress={() => setQuery('')} hitSlop={8} accessibilityLabel="Clear search">
                  <Ionicons name="close-circle" size={18} color={colors.textMuted} />
                </Pressable>
              )}
            </View>
            <View style={s.row}>
              <Text style={[ui.muted, { color: colors.textMuted, flex: 1 }]}>
                {query ? `${filtered.length} of ${saved.length}` : saved.length} saved {saved.length === 1 ? 'problem' : 'problems'}
              </Text>
              <Pressable
                onPress={() => confirmAction('Clear all saved problems?', 'This cannot be undone.', 'Clear all', clearSaved)}
                hitSlop={8}
                accessibilityRole="button"
              >
                <Text style={[s.link, { color: colors.danger }]}>Clear all</Text>
              </Pressable>
            </View>
          </View>
        ) : null
      }
      ListEmptyComponent={
        !hydrated ? null : saved.length === 0 ? (
          <View style={{ gap: spacing.lg }}>
            <EmptyState
              icon="bookmark-outline"
              title="No saved problems yet"
              message="Snap or upload a homework photo on the Dashboard, then tap “Save problem” on any solution to keep it here for revision."
            />
            <Button label="Scan a problem" icon="camera-outline" onPress={() => router.navigate('/')} />
          </View>
        ) : (
          <EmptyState icon="search-outline" title="No matches" message={`Nothing matches “${query}”.`} />
        )
      }
    />
  );
}

const s = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  itemFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.xs },
  itemActions: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg },
  date: { fontSize: 12 },
  link: { fontWeight: '700' },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
  },
});
