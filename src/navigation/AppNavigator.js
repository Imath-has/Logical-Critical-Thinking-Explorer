import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import LearnScreen from '../screens/LearnScreen';
import ChallengeScreen from '../screens/ChallengeScreen';
import ResultsScreen from '../screens/ResultsScreen';
import BookmarkScreen from '../screens/BookmarkScreen';
import { C } from '../components/theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const icons = { Home: 'home', Explore: 'compass', Challenge: 'help-circle', Results: 'stats-chart', Bookmarks: 'bookmark' };

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => <Ionicons name={icons[route.name]} size={size} color={color} />,
        tabBarActiveTintColor: C.primary,
        tabBarStyle: { backgroundColor: C.card, borderTopWidth: 0 },
        headerStyle: { backgroundColor: C.card },
        headerTintColor: C.text,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Challenge" component={ChallengeScreen} />
      <Tab.Screen name="Results" component={ResultsScreen} />
      <Tab.Screen name="Bookmarks" component={BookmarkScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: C.card }, headerTintColor: C.text }}>
      <Stack.Screen name="Main" component={Tabs} options={{ headerShown: false }} />
      <Stack.Screen name="Learn" component={LearnScreen} options={{ title: 'Topic Details' }} />
    </Stack.Navigator>
  );
}
