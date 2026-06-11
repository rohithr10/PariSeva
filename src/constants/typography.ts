import { Platform } from 'react-native';

export const Fonts = {
  display: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  displayBold: Platform.OS === 'ios' ? 'Georgia-Bold' : 'serif',
  body: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  bodyMedium: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium',
  bodySemiBold: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium',
  bodyBold: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  bible: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  mono: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
};

export const Typography = {
  display1: { fontSize: 40, lineHeight: 48 },
  display2: { fontSize: 32, lineHeight: 40 },
  h1: { fontSize: 28, lineHeight: 36 },
  h2: { fontSize: 24, lineHeight: 32 },
  h3: { fontSize: 20, lineHeight: 28 },
  h4: { fontSize: 18, lineHeight: 26 },
  bodyLg: { fontSize: 17, lineHeight: 26 },
  body: { fontSize: 15, lineHeight: 24 },
  bodySm: { fontSize: 13, lineHeight: 20 },
  bibleText: { fontSize: 18, lineHeight: 32 },
  label: { fontSize: 12, lineHeight: 16, letterSpacing: 0.5 },
  caption: { fontSize: 11, lineHeight: 16 },
  tamilBody: { fontSize: 16, lineHeight: 28 },
  tamilBible: { fontSize: 19, lineHeight: 34 },
};
