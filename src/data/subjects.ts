export interface SubjectGame {
  id: string;
  title: string;
  description: string;
  route?: string;
  status: 'ready' | 'coming-soon';
}

export interface SubjectDefinition {
  id: 'english' | 'maths' | 'science' | 'social-science' | "speech" | "sign-language";
  name: string;
  emoji: string;
  accent: string;
  shadow: string;
  textStroke: string;
  mascotPrompt: string;
  games: SubjectGame[];
}

export const subjects: SubjectDefinition[] = [
  {
    id: 'speech',
    name: 'Speech & Therapy',
    emoji: '🗣️', // ADDED: Required emoji
    accent: '#8b5cf6', // Violet
    shadow: 'rgba(139, 92, 246, 0.35)', // ADDED: Required shadow to match the violet accent
    textStroke: '#5b21b6',
    mascotPrompt: 'Let\'s make some magic sounds!', // ADDED: Required mascot prompt
    games: [
      {
        id: 'speech-playground',
        title: 'Speech Magic',
        description: 'Use your voice to cast magic spells and move obstacles!',
        status: 'ready',
        route: '/speech-therapy',
      }
    ]
  },
  {
    id: 'english',
    name: 'English',
    emoji: '📖',
    accent: '#ff7a45',
    shadow: 'rgba(255, 122, 69, 0.34)',
    textStroke: '#ef5a29',
    mascotPrompt: 'Story time!',
    games: [
      {
        id: 'match-letters',
        title: 'Match Letters',
        description: 'Drag uppercase and lowercase balloons together.',
        route: '/english-match-letters',
        status: 'ready',
      },
      {
        id: 'draw-letters',
        title: 'Draw Letters',
        description: 'Trace giant letters with your hand.',
        status: 'coming-soon',
      },
      {
        id: 'guess-word',
        title: 'Guess the Word',
        description: 'Look at the picture and drag letters to spell the word!',
        status: 'ready',
        route: '/english-guess-word', 
      }
    ],
  },
  {
    id: 'maths',
    name: 'Maths',
    emoji: '🔢',
    accent: '#8b5cf6',
    shadow: 'rgba(139, 92, 246, 0.35)',
    textStroke: '#6d28d9',
    mascotPrompt: 'Number power!',
    games: [
      {
        id: 'count-fingers',
        title: 'Count Fingers',
        description: 'Count and match with your hands.',
        status: 'coming-soon',
      },
      {
        id: 'build-equation',
        title: 'Build the Equation',
        description: 'Drag numbers and symbols to build a correct math problem!',
        status: 'ready',
        route: '/math-equations', 
      }
    ],
  },
  {
    id: 'science',
    name: 'Science',
    emoji: '🔬',
    accent: '#22c55e',
    shadow: 'rgba(34, 197, 94, 0.35)',
    textStroke: '#15803d',
    mascotPrompt: 'Blast into space!',
    games: [
      {
        id: 'color-match',
        title: 'Solar System Adventure',
        description: 'Jump straight into the live solar system game.',
        route: '/science-solar',
        status: 'ready',
      },
    ],
  },
  {
    id: 'social-science',
    name: 'Social Science',
    emoji: '🌍',
    accent: '#06b6d4',
    shadow: 'rgba(6, 182, 212, 0.35)',
    textStroke: '#0f766e',
    mascotPrompt: 'Let us explore the world!',
    games: [
      {
        id: 'basic-quiz',
        title: 'Basic Quiz',
        description: 'Travel the world with easy prompts.',
        status: 'coming-soon',
      },
    ],
  },
  {
  id: 'sign-language',
  name: 'Sign Language',
  emoji: '👐',
  accent: '#38bdf8', // Sky blue
  shadow: 'rgba(56, 189, 248, 0.35)',
  textStroke: '#0284c7',
  mascotPrompt: 'Watch my hands!',
  games: [
    {
      id: 'path-of-lumina',
      title: 'Path of Lumina',
      description: 'Use your hands to bring light back to the world!',
      status: 'ready',
      route: '/deaf-lumina',
    }
  ]
},
];