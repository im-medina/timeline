import { StatusBar } from 'expo-status-bar';
import {ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import React, { useEffect } from 'react';
import { useRouter } from "expo-router";
import { styled } from 'nativewind';

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import {
  BaiJamjuree_700Bold
} from '@expo-google-fonts/bai-jamjuree'

import blurBg from '../src/assets/bg-blur.png'
import Stripes from '../src/assets/stripes.svg'
import NLWlogo from '../src/assets/nlw-spacetime-logo.svg'
import { api } from '../src/lib/api';

const StyledStripes = styled(Stripes)
// expo auth github
const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint: 'https://github.com/settings/connections/applications/e183552f105f0b61e532',
};

export default function App() {
  const router = useRouter()

  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold
  })

// expo auth github
const [, response, signInWithGithub] = useAuthRequest(
  {
    clientId: 'e183552f105f0b61e532',
    scopes: ['identity'],
    redirectUri: makeRedirectUri({
      scheme: 'nlwspacetime',
    }),
  },
  discovery,
)

async function handleGithubOauthCode(code:string){
  const response = await api
  .post('/register',{
    code,                                               //enviando o code no corpo da requisição
   })
   const { token } = response.data                   //dentro dessa resposta obtemos o token
   await SecureStore.setItemAsync('token',token)           //salva o token no storage do celular pelo secure storage

   router.push('/memories')
}

 useEffect(() => { 
  // console.log(makeRedirectUri({
  //   scheme: 'nlwspacetime'
  // }),)
  // console.log(response)
  
  if (response?.type === 'success') {
      const { code } = response.params;
      
     handleGithubOauthCode(code)
    }
  }, [response]);

  if(!hasLoadedFonts){
    return null
  }

  return (
    <ImageBackground
    source={blurBg}
    className="relative flex-1 items-center px-8 py-10 bg-gray-900"
    imageStyle={{ position: 'absolute', left: '-150%' }}
  >
     <StyledStripes className="absolute left-2" />

    <View className="flex-1 items-center justify-center gap-6">
      <NLWlogo/>
        <View className="space-y-2">
        <Text className="text-center font-title text-2xl leading-tight text-gray-50">Sua capsula do tempo</Text>
        <Text className="text-center font-body text-base leading-relaxed text-gray-100">Colecione momentos marcantes da sua jornada e compartilhe (se quiser) com o mundo!</Text>
        </View> 
        <TouchableOpacity 
        activeOpacity={0.7} 
        className=" rounded-full bg-green-500 px-5 py-2 o" 
        onPress={()=>signInWithGithub()}>
          <Text className="font-alt text-sm uppercase text-black">Cadastrar Lembrança</Text>
        </TouchableOpacity>     
    </View>
    <Text className="text-center font-body text-sm leading-relaxed text-gray-200">
    Feito com 💜 no NLW da Rocketseat
    </Text>

      <StatusBar style="light" />
    </ImageBackground>
  );
}
