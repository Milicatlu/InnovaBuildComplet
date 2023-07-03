import 'react-native-url-polyfill/auto'
import * as SecureStore from 'expo-secure-store'
import { createClient } from '@supabase/supabase-js'
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage'

const ExpoSecureStoreAdapter = {
   getItem: (key: string) => {
      return SecureStore.getItemAsync(key)
   },
   setItem: (key: string, value: string) => {
      SecureStore.setItemAsync(key, value)
   },
   removeItem: (key: string) => {
      SecureStore.deleteItemAsync(key)
   },
}


export const supabase = createClient('https://jdpgnxspeukqezawkrkm.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkcGdueHNwZXVrcWV6YXdrcmttIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ0MzUyOTUsImV4cCI6MjAwMDAxMTI5NX0.q4s7VrF-q5MXp4INAr8R9MFMjKhnGuOrBbOC2FjPLG8', {
   auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
   },
})