import { useCallback, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getCategories, getDailyQuestion, getProgress } from '../database/db';
import { C, s } from '../components/theme';

export default function HomeScreen({ navigation }) {
  const [cats, setCats] = useState([]);
  const [daily, setDaily] = useState(null);
  const [sel, setSel] = useState(null);
  const [prog, setProg] = useState({ learned: 0, total: 1 });

  useFocusEffect(useCallback(() => {
    getCategories().then(setCats);
    getDailyQuestion().then(setDaily);
    getProgress().then(setProg);
  }, []));

  const pct = Math.round((prog.learned / prog.total) * 100);

  return (
    <ScrollView style={s.screen}>
      <Text style={s.title}>Think clearly. Question deeply. Decide wisely.</Text>

      <View style={s.card}>
        <Text style={s.h2}>Your progress</Text>
        <View style={{ height: 10, backgroundColor: C.bg, borderRadius: 5 }}>
          <View style={{ height: 10, width: `${pct}%`, backgroundColor: C.primary, borderRadius: 5 }} />
        </View>
        <Text style={[s.sub, { marginTop: 6 }]}>{prog.learned} of {prog.total} topics learned ({pct}%)</Text>
      </View>

      <Text style={s.h2}>Learning categories</Text>
      {cats.map((c) => (
        <TouchableOpacity key={c} style={s.card} onPress={() => navigation.navigate('Explore', { category: c })}>
          <Text style={s.text}>{c}</Text>
        </TouchableOpacity>
      ))}

      {daily && (
        <View style={s.card}>
          <Text style={s.h2}>Daily challenge</Text>
          <Text style={s.text}>{daily.question}</Text>
          {daily.options.map((o, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => sel === null && setSel(i)}
              style={[s.chip, { marginTop: 8, borderRadius: 10 },
                sel !== null && i === daily.answer && { backgroundColor: C.good },
                sel === i && i !== daily.answer && { backgroundColor: C.bad }]}
            >
              <Text style={{ color: C.text }}>{o}</Text>
            </TouchableOpacity>
          ))}
          {sel !== null && <Text style={[s.sub, { marginTop: 8 }]}>{daily.explanation}</Text>}
        </View>
      )}
    </ScrollView>
  );
}
