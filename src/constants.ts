export interface Lesson {
  id: string;
  title: string;
  energyCost: number;
  xpReward: number;
}

export interface MacroTopic {
  id: string;
  title: string;
  topic: string;
  description: string;
  status: 'locked' | 'unlocked' | 'completed' | 'in-progress';
  lessons: Lesson[];
}

export const MACRO_TOPICS: MacroTopic[] = [
  {
    id: 'tech-base',
    title: 'Tecnologia di base',
    topic: 'I primi passi nel mondo digitale',
    description: 'Impara le basi fondamentali per usare smartphone e computer.',
    status: 'unlocked',
    lessons: [
      { id: 'tasti-base', title: 'Tasti base', energyCost: 5, xpReward: 50 },
      { id: 'accensione', title: 'Accensione e spegnimento', energyCost: 5, xpReward: 50 },
      { id: 'touch-screen', title: 'Usare il touch screen', energyCost: 5, xpReward: 50 },
      { id: 'wifi', title: 'Configurazione Wi-Fi', energyCost: 5, xpReward: 50 },
      { id: 'suoni', title: 'Volume e Suoni', energyCost: 5, xpReward: 50 },
      { id: 'batteria', title: 'Batteria e Risparmio', energyCost: 5, xpReward: 50 },
      { id: 'appstore', title: 'Installare App', energyCost: 5, xpReward: 50 },
    ],
  },
  {
    id: 'social-media',
    title: 'Social media',
    topic: 'Connettersi con gli altri',
    description: 'Scopri come usare Facebook, WhatsApp e altri social in sicurezza.',
    status: 'locked',
    lessons: [
      { id: 'whatsapp-basi', title: 'Basi di WhatsApp', energyCost: 5, xpReward: 50 },
      { id: 'facebook-privacy', title: 'Privacy su Facebook', energyCost: 5, xpReward: 50 },
      { id: 'condivisione-foto', title: 'Condividere foto', energyCost: 5, xpReward: 50 },
      { id: 'videochiamate', title: 'Videochiamate', energyCost: 5, xpReward: 50 },
      { id: 'gruppi', title: 'Gestione Gruppi', energyCost: 5, xpReward: 50 },
      { id: 'storie', title: 'Stato e Storie', energyCost: 5, xpReward: 50 },
      { id: 'vocali', title: 'Messaggi Vocali', energyCost: 5, xpReward: 50 },
    ],
  },
  {
    id: 'phishing',
    title: 'Phishing',
    topic: 'Difendersi dalle truffe',
    description: 'Impara a riconoscere email e messaggi sospetti.',
    status: 'locked',
    lessons: [
      { id: 'email-sospette', title: 'Riconoscere email false', energyCost: 5, xpReward: 50 },
      { id: 'link-pericolosi', title: 'Pericoli dei link', energyCost: 5, xpReward: 50 },
      { id: 'protezione-dati', title: 'Proteggere i dati', energyCost: 5, xpReward: 50 },
      { id: 'smishing', title: 'Truffre via SMS', energyCost: 5, xpReward: 50 },
      { id: 'vishing', title: 'Chiamate sospette', energyCost: 5, xpReward: 50 },
      { id: 'fonti', title: 'Verificare le fonti', energyCost: 5, xpReward: 50 },
      { id: 'segnalazione', title: 'Segnalare truffe', energyCost: 5, xpReward: 50 },
    ],
  },
  {
    id: 'cyber-safety',
    title: 'Sicurezza Online',
    topic: 'Proteggi la tua identità',
    description: 'Approfondisci la sicurezza dei tuoi account e della navigazione.',
    status: 'locked',
    lessons: [
      { id: 'passwords', title: 'Password forti', energyCost: 5, xpReward: 50 },
      { id: '2fa', title: 'Doppia autenticazione', energyCost: 5, xpReward: 50 },
      { id: 'incognito', title: 'Navigazione anonima', energyCost: 5, xpReward: 50 },
      { id: 'cookies', title: 'Cookie e Privacy', energyCost: 5, xpReward: 50 },
      { id: 'vpn', title: 'Cosa sono le VPN', energyCost: 5, xpReward: 50 },
      { id: 'updates', title: 'Aggiornamenti App', energyCost: 5, xpReward: 50 },
      { id: 'backup', title: 'Backup del telefono', energyCost: 5, xpReward: 50 },
    ],
  },
  {
    id: 'e-government',
    title: 'Servizi Digitali',
    topic: 'La PA a portata di clic',
    description: 'Impara a usare SPID, App IO e i servizi del cittadino.',
    status: 'locked',
    lessons: [
      { id: 'spid', title: 'Cos\'è lo SPID', energyCost: 5, xpReward: 50 },
      { id: 'cieid', title: 'App CIE ID', energyCost: 5, xpReward: 50 },
      { id: 'sanita', title: 'Fascicolo Sanitario', energyCost: 5, xpReward: 50 },
      { id: 'pagopa', title: 'Pagare con PagoPA', energyCost: 5, xpReward: 50 },
      { id: 'appio', title: 'Usare l\'App IO', energyCost: 5, xpReward: 50 },
      { id: 'prenotazioni', title: 'Prenotazioni CUP', energyCost: 5, xpReward: 50 },
      { id: 'anagrafe', title: 'Certificati Online', energyCost: 5, xpReward: 50 },
    ],
  },
  {
    id: 'online-shopping',
    title: 'Acquisti Online',
    topic: 'Shopping senza rischi',
    description: 'Tutto quello che devi sapere per comprare online in sicurezza.',
    status: 'locked',
    lessons: [
      { id: 'siti-affidabili', title: 'Siti sicuri', energyCost: 5, xpReward: 50 },
      { id: 'pagamenti', title: 'Pagamenti sicuri', energyCost: 5, xpReward: 50 },
      { id: 'diritti', title: 'I tuoi diritti', energyCost: 5, xpReward: 50 },
      { id: 'tracking', title: 'Tracciare pacchi', energyCost: 5, xpReward: 50 },
      { id: 'recensioni', title: 'Leggere recensioni', energyCost: 5, xpReward: 50 },
      { id: 'prepagate', title: 'Usare prepagate', energyCost: 5, xpReward: 50 },
      { id: 'resi', title: 'Resi e rimborsi', energyCost: 5, xpReward: 50 },
    ],
  },
];

export const TROPHIES = [
  { id: 'mago', title: 'Mago della tecnologia', description: 'Hai completato tutte le lezioni di Tecnologia di Base!', icon: '🧙‍♂️' },
  { id: 'influencer', title: 'Influencer', description: 'Hai completato il modulo sui Social Media.', icon: '📱' },
  { id: 'truffe', title: 'Scovra truffe', description: 'Hai completato il modulo sul Phishing.', icon: '🕵️‍♂️' },
  { id: 'sicurezza', title: 'Guardiano Digitale', description: 'Hai completato il modulo sulla Sicurezza Online.', icon: '🛡️' },
  { id: 'cittadino', title: 'Cittadino Digitale', description: 'Hai imparato a usare i servizi della Pubblica Amministrazione.', icon: '🏛️' },
  { id: 'shopper', title: 'Shopper Esperto', description: 'Navighi e acquisti online senza alcun rischio.', icon: '🛒' },
  { id: 'suono', title: 'Esperto del suono', description: 'Hai imparato a gestire perfettamente i volumi e le notifiche.', icon: '🔊' },
  { id: 'creativo', title: 'Creativo', description: 'Hai personalizzato il tuo profilo con stile.', icon: '🎨' },
  { id: 'fretta', title: 'Impari in fretta', description: 'Hai completato 3 lezioni in un solo giorno.', icon: '⚡' },
  { id: 'computer', title: 'Fenomeno dei computer', description: 'Sei diventato un vero esperto del mondo digitale!', icon: '💻' },
];

export const INITIAL_STATS = {
  energy: 25,
  maxEnergy: 25,
  xp: 0,
  streak: 0,
  level: 'Principiante' as const,
  trophies: 0,
  lastEnergyUpdate: Date.now(),
  lastCompletionDate: undefined,
};

export const INITIAL_SETTINGS = {
  fontSize: 'M' as const,
  theme: 'light' as const,
  soundVolume: 80,
  notifications: true,
  language: 'IT' as const,
  allowSkipping: false,
};
