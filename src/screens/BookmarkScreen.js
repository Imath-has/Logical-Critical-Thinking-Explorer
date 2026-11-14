import { useCallback, useState } from 'react';
import { FlatList, Text, TextInput, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getBookmarks } from '../database/db';
import TopicCard from '../components/TopicCard';
import { C, s } from '../components/theme';

export default function BookmarkScreen({ navigation }) {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState('');

  useFocusEffect(useCallback(() => { getBookmarks(search).then(setList); }, [search]));

  return (
    <View style={s.screen}>
      <TextInput style={s.input} placeholder="Search saved topics..." placeholderTextColor={C.sub} value={search} onChangeText={setSearch} />
      <FlatList
        data={list}
        keyExtractor={(t) => String(t.id)}
        renderItem={({ item }) => <TopicCard topic={item} onPress={() => navigation.navigate('Learn', { id: item.id })} />}
        ListEmptyComponent={<Text style={s.sub}>No bookmarks yet. Save topics from the Learn screen.</Text>}
      />
    </View>
  );
}
