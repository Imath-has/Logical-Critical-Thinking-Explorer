import { useCallback, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getProgress, getResults } from '../database/db';
import { C, s } from '../components/theme';

export default function ResultsScreen() {
  const [res, setRes] = useState([]);
  const [prog, setProg] = useState({ learned: 0, total: 0 });

  useFocusEffect(useCallback(() => {
    getResults().then(setRes);
    getProgress().then(setProg);
  }, []));

  const correct = res.reduce((a, r) => a + r.score, 0);
  const total = res.reduce((a, r) => a + r.total, 0);

  return (
    <View style={s.screen}>
      <View style={s.card}>
        <Text style={s.h2}>Summary</Text>
        <Text style={s.text}>Attempts: {res.length}</Text>
        <Text style={{ color: C.good }}>Correct answers: {correct}</Text>
        <Text style={{ color: C.bad }}>Incorrect answers: {total - correct}</Text>
        <Text style={s.text}>Accuracy: {total ? Math.round((correct / total) * 100) : 0}%</Text>
        <Text style={s.text}>Topics learned: {prog.learned}/{prog.total}</Text>
      </View>
      <Text style={s.h2}>Previous attempts</Text>
      <FlatList
        data={res}
        keyExtractor={(r) => String(r.id)}
        renderItem={({ item }) => (
          <View style={s.card}>
            <Text style={s.text}>{item.score} / {item.total} · {item.category}</Text>
            <Text style={s.sub}>{item.date}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={s.sub}>No quiz attempts yet. Try a challenge!</Text>}
      />
    </View>
  );
}
