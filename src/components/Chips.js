import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { C, s } from './theme';

export default function Chips({ items, selected, onSelect }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexGrow: 0, marginBottom: 10 }}>
      {items.map((c) => (
        <TouchableOpacity key={c} style={[s.chip, selected === c && s.chipOn]} onPress={() => onSelect(c)}>
          <Text style={{ color: selected === c ? '#0F172A' : C.text }}>{c}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
