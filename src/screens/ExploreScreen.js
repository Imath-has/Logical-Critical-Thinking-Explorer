import { useCallback, useEffect, useState } from 'react';
import { FlatList, Text, TextInput, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getCategories, getTopics } from '../database/db';
import Chips from '../components/Chips';
import TopicCard from '../components/TopicCard';
import { C, s } from '../components/theme';

export default function ExploreScreen({ navigation, route }) {
  const [cats, setCats] = useState(['All']);
  const [cat, setCat] = useState('All');
  const [search, setSearch] = useState('');
  const [list, setList] = useState([]);

  useEffect(() => { getCategories().then((c) => setCats(['All', ...c])); }, []);
  useEffect(() => { if (route.params?.category) setCat(route.params.category); }, [route.params]);
  useFocusEffect(useCallback(() => { getTopics(search, cat).then(setList); }, [search, cat]));

  return (
    <View style={s.screen}>
      <TextInput style={s.input} placeholder="Search topics..." placeholderTextColor={C.sub} value={search} onChangeText={setSearch} />
      <Chips items={cats} selected={cat} onSelect={setCat} />
      <FlatList
        data={list}
        keyExtractor={(t) => String(t.id)}
        renderItem={({ item }) => <TopicCard topic={item} onPress={() => navigation.navigate('Learn', { id: item.id })} />}
        ListEmptyComponent={<Text style={s.sub}>No topics found.</Text>}
      />
    </View>
  );
}
