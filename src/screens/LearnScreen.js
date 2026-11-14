import { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { getTopic, isBookmarked, isLearned, markLearned, toggleBookmark } from '../database/db';
import { C, s } from '../components/theme';

export default function LearnScreen({ route }) {
  const { id } = route.params;
  const [topic, setTopic] = useState(null);
  const [saved, setSaved] = useState(false);
  const [learned, setLearned] = useState(false);

  useEffect(() => {
    getTopic(id).then(setTopic);
    isBookmarked(id).then(setSaved);
    isLearned(id).then(setLearned);
  }, [id]);

  if (!topic) return null;

  return (
    <ScrollView style={s.screen}>
      <Text style={{ color: C.primary }}>{topic.category}</Text>
      <Text style={s.title}>{topic.title}</Text>
      <Text style={s.text}>{topic.description}</Text>

      <Text style={s.h2}>Examples</Text>
      {topic.examples.map((e, i) => (
        <Text key={i} style={[s.card, s.text]}>• {e}</Text>
      ))}

      <Text style={s.h2}>Real-life situation</Text>
      <Text style={[s.card, s.text]}>{topic.reallife}</Text>

      <TouchableOpacity style={s.btn} onPress={async () => { await toggleBookmark(id); setSaved(!saved); }}>
        <Text style={s.btnText}>{saved ? 'Remove bookmark' : 'Save to bookmarks'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[s.btn, learned && { backgroundColor: C.good }]}
        onPress={async () => { await markLearned(id); setLearned(true); }}
      >
        <Text style={s.btnText}>{learned ? 'Learned ✓' : 'Mark as learned'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
