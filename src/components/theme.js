import { StyleSheet } from 'react-native';

export const C = {
  bg: '#0F172A', card: '#1E293B', primary: '#38BDF8',
  text: '#F1F5F9', sub: '#94A3B8', good: '#22C55E', bad: '#EF4444',
};

export const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.bg, padding: 16 },
  title: { color: C.text, fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  h2: { color: C.text, fontSize: 18, fontWeight: '600', marginVertical: 8 },
  text: { color: C.text, fontSize: 15, lineHeight: 22 },
  sub: { color: C.sub, fontSize: 13 },
  card: { backgroundColor: C.card, borderRadius: 12, padding: 14, marginBottom: 10 },
  btn: { backgroundColor: C.primary, padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  btnText: { color: '#0F172A', fontWeight: 'bold', fontSize: 16 },
  input: { backgroundColor: C.card, color: C.text, borderRadius: 10, padding: 12, marginBottom: 10 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: C.card, marginRight: 8 },
  chipOn: { backgroundColor: C.primary },
});
