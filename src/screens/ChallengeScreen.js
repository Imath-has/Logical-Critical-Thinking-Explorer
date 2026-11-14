import { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { getCategories, getQuestions, saveResult } from '../database/db';
import { C, s } from '../components/theme';

export default function ChallengeScreen({ navigation }) {
  const [cats, setCats] = useState(['All']);
  const [cat, setCat] = useState('All');
  const [qs, setQs] = useState([]);
  const [i, setI] = useState(0);
  const [sel, setSel] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => { getCategories().then((c) => setCats(['All', ...c])); }, []);

  const start = async (c) => {
    setCat(c); setQs(await getQuestions(c, 5)); setI(0); setScore(0); setSel(null);
  };

  const pick = (idx) => {
    if (sel !== null) return;
    setSel(idx);
    if (idx === qs[i].answer) setScore(score + 1);
  };

  const next = async () => {
    if (i + 1 < qs.length) { setI(i + 1); setSel(null); return; }
    await saveResult(score, qs.length, cat);
    setQs([]);
    navigation.navigate('Results');
  };

  // Category picker
  if (qs.length === 0)
    return (
      <ScrollView style={s.screen}>
        <Text style={s.title}>Choose a challenge</Text>
        {cats.map((c) => (
          <TouchableOpacity key={c} style={s.card} onPress={() => start(c)}>
            <Text style={s.text}>{c === 'All' ? 'Mixed (all categories)' : c}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );

  const q = qs[i];
  return (
    <ScrollView style={s.screen}>
      <Text style={s.sub}>Question {i + 1} of {qs.length} · Score {score}</Text>
      <Text style={[s.title, { marginTop: 8 }]}>{q.question}</Text>
      {q.options.map((o, idx) => (
        <TouchableOpacity
          key={idx}
          onPress={() => pick(idx)}
          style={[s.card,
            sel !== null && idx === q.answer && { backgroundColor: C.good },
            sel === idx && idx !== q.answer && { backgroundColor: C.bad }]}
        >
          <Text style={s.text}>{o}</Text>
        </TouchableOpacity>
      ))}
      {sel !== null && (
        <View>
          <Text style={[s.card, s.text]}>{sel === q.answer ? 'Correct! ' : 'Wrong. '}{q.explanation}</Text>
          <TouchableOpacity style={s.btn} onPress={next}>
            <Text style={s.btnText}>{i + 1 < qs.length ? 'Next' : 'Finish'}</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}
