import { Text, TouchableOpacity } from 'react-native';
import { C, s } from './theme';

export default function TopicCard({ topic, onPress }) {
  return (
    <TouchableOpacity style={s.card} onPress={onPress}>
      <Text style={{ color: C.primary, fontSize: 12 }}>{topic.category}</Text>
      <Text style={[s.h2, { marginVertical: 2 }]}>{topic.title}</Text>
      <Text style={s.sub} numberOfLines={2}>{topic.description}</Text>
    </TouchableOpacity>
  );
}
