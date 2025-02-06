import type { Config } from "tailwindcss";
import sharedConfig from "@repo/ui/tailwind.config.js";

const config: Config = {
  ...sharedConfig,
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            'pre': {
              backgroundColor: '#1e1e1e',
              padding: '1rem',
              borderRadius: '8px',
              border: '1px solid #323232',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              margin: '1.5rem 0',
              overflowX: 'auto',
              '&::-webkit-scrollbar': {
                height: '8px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: '#1e1e1e',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#424242',
                borderRadius: '4px',
                '&:hover': {
                  backgroundColor: '#505050',
                },
              },
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
              color: '#d4d4d4',
              fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
              fontSize: '0.875rem',
              lineHeight: '1.7142857',
              textShadow: '0 1px rgba(0, 0, 0, 0.3)',
              direction: 'ltr',
              textAlign: 'left',
              whiteSpace: 'pre',
              wordSpacing: 'normal',
              wordBreak: 'normal',
              tabSize: 2,
            },
            'pre code .keyword': { color: '#569cd6' },
            'pre code .string': { color: '#ce9178' },
            'pre code .function': { color: '#dcdcaa' },
            'pre code .number': { color: '#b5cea8' },
            'pre code .operator': { color: '#d4d4d4' },
            'pre code .punctuation': { color: '#d4d4d4' },
            'pre code .comment': { color: '#6a9955' },
            'pre code .class-name': { color: '#4ec9b0' },
            'pre code .constant': { color: '#4fc1ff' },
            code: {
              backgroundColor: '#323232',
              color: '#d4d4d4',
              padding: '0.2em 0.4em',
              borderRadius: '3px',
              fontSize: '0.875em',
              fontWeight: '400',
            },
            'blockquote p:first-of-type::before': {
              content: '""'
            },
            'blockquote p:last-of-type::after': {
              content: '""'
            },
            blockquote: {
              borderLeftColor: '#3b82f6',
              borderLeftWidth: '4px',
              backgroundColor: '#f8fafc',
              padding: '1rem',
              color: '#4b5563'
            }
          }
        }
      }
    }
  }
};

export default config; 