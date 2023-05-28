import { StatusBar } from 'expo-status-bar';
import {ImageBackground, Text, View } from 'react-native';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import {
  BaiJamjuree_700Bold
} from '@expo-google-fonts/bai-jamjuree'

import blurBg from './src/assets/bg-blur.png'
import Stripes from './src/assets/stripes.svg'
import NLWlogo from './src/assets/nlw-spacetime-logo.svg'
import { styled } from 'nativewind';

const StyledStripes = styled(Stripes)

export default function App() {
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold
  })

  if(!hasLoadedFonts){
    return null
  }

  return (
    <ImageBackground
    source={blurBg}
    className="relative flex-1 items-center bg-gray-900"
    imageStyle={{ position: 'absolute', left: '-150%' }}
  >
     <StyledStripes className="absolute left-2" />

    <View className="flex-1 items-center justify-center gap-6">
      <NLWlogo className="flex"/>
      <Text className="text-gray-50">Sua capsula do tempo</Text>
    </View>

      <StatusBar style="light" />
    </ImageBackground>
  );
}
