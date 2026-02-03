import { useColorScheme as useReactColorScheme } from 'react-native';

export function useColorScheme(): 'light' | 'dark' {
  const systemColorScheme = useReactColorScheme();
  return systemColorScheme === 'dark' ? 'dark' : 'light';
}
