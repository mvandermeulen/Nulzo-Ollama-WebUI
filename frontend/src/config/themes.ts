type CSSVars = { [key: string]: string };

interface ThemeConfig {
  light: CSSVars;
  dark: CSSVars;
}

export type Color = 'default' | 'red' | 'orange' | 'green' | 'blue' | 'yellow' | 'purple';


export const colorThemes: Record<Color, ThemeConfig> = {
  "default": {
    "light": {
      "primary": "240 5.9% 10%",
      "primary-foreground": "0 0% 98%",
      "secondary": "240 4.8% 95.9%",
      "secondary-foreground": "240 5.9% 10%",
      "tertiary": "240 4.8% 89.9%",
      "tertiary-foreground": "240 5.9% 8%",
      "accent": "240 4.8% 95.9%",
      "accent-foreground": "240 5.9% 10%",
      "border": "240 5.9% 90%",
      "input": "240 5.9% 90%",
      "ring": "240 5.9% 10%",
    },
    "dark": {
      "primary": "0 0% 98%",
      "primary-foreground": "240 5.9% 10%",
      "secondary": "240 3.7% 10.9%",
      "secondary-foreground": "0 0% 98%",
      "tertiary": "240 3.7% 15.9%",
      "tertiary-foreground": "0 0% 98%",
      "accent": "240 3.7% 15.9%",
      "accent-foreground": "0 0% 98%",
      "border": "240 3.7% 15.9%",
      "input": "240 3.7% 15.9%",
      "ring": "240 4.9% 83.9%"
    }
  },
  "red": {
    "light": {
      "primary": "0 72.2% 60.6%",
      "primary-foreground": "0 85.7% 97.3%",
      "secondary": "0 0% 96.1%",
      "secondary-foreground": "0 0% 9%",
      "tertiary": "240 4.8% 89.9%",
      "tertiary-foreground": "240 5.9% 8%",
      "accent": "0 0% 96.1%",
      "accent-foreground": "0 0% 9%",
      "border": "0 0% 89.8%",
      "input": "0 0% 89.8%",
      "ring": "0 72.2% 50.6%",
      "radius": "0.4rem"
    },
    "dark": {
      "primary": "0 72.2% 50.6%",
      "primary-foreground": "0 85.7% 97.3%",
      "secondary": "240 3.7% 10.9%",
      "secondary-foreground": "0 0% 98%",
      "tertiary": "240 3.7% 15.9%",
      "tertiary-foreground": "0 0% 98%",
      "accent": "0 0% 14.9%",
      "accent-foreground": "0 0% 98%",
      "border": "0 0% 14.9%",
      "input": "0 0% 14.9%",
      "ring": "0 72.2% 50.6%"
    }
  },
  "orange": {
    "light": {
      "primary": "24.6 95% 53.1%",
      "primary-foreground": "60 9.1% 97.8%",
      "accent": "60 4.8% 95.9%",
      "accent-foreground": "24 9.8% 10%",
      "border": "20 5.9% 90%",
      "input": "20 5.9% 90%",
      "ring": "24.6 95% 53.1%",
      "radius": "0.5rem"
    },
    "dark": {
      "primary": "20.5 90.2% 48.2%",
      "primary-foreground": "60 9.1% 97.8%",
      "accent": "12 6.5% 15.1%",
      "accent-foreground": "60 9.1% 97.8%",
      "border": "12 6.5% 15.1%",
      "input": "12 6.5% 15.1%",
      "ring": "20.5 90.2% 48.2%"
    }
  },
  "green": {
    "light": {
      "primary": "162.1 66.2% 36.3%",
      "primary-foreground": "355.7 100% 97.3%",
      "secondary": "240 4.8% 95.9%",
      "secondary-foreground": "240 5.9% 10%",
      "tertiary": "240 4.8% 90.9%",
      "tertiary-foreground": "240 5.9% 8%",
      "accent": "240 4.8% 95.9%",
      "accent-foreground": "240 5.9% 10%",
      "border": "240 5.9% 90%",
      "input": "240 5.9% 90%",
      "ring": "142.1 76.2% 36.3%"
    },
    "dark": {
      "primary": "152.1 70.6% 55.3%",
      "primary-foreground": "144.9 80.4% 10%",
      "secondary": "240 3.7% 10.9%",
      "secondary-foreground": "0 0% 98%",
      "tertiary": "240 3.7% 16.9%",
      "tertiary-foreground": "0 0% 98%",
      "border": "240 3.7% 15.9%",
      "input": "240 3.7% 15.9%",
      "ring": "142.4 71.8% 29.2%"
    }
  },
  "blue": {
    "light": {
      "background": "0 0% 100%",
      "foreground": "222.2 84% 4.9%",
      "card": "0 0% 100%",
      "card-foreground": "222.2 84% 4.9%",
      "popover": "0 0% 100%",
      "popover-foreground": "222.2 84% 4.9%",
      "primary": "221.2 83.2% 53.3%",
      "primary-foreground": "210 40% 98%",
      "secondary": "210 40% 96.1%",
      "secondary-foreground": "222.2 47.4% 11.2%",
      "tertiary": "210 40% 92.1%",
      "tertiary-foreground": "222.2 47.4% 8.2%",
      "muted": "210 40% 96.1%",
      "muted-foreground": "215.4 16.3% 46.9%",
      "accent": "210 40% 96.1%",
      "accent-foreground": "222.2 47.4% 11.2%",
      "destructive": "0 84.2% 60.2%",
      "destructive-foreground": "210 40% 98%",
      "border": "214.3 31.8% 91.4%",
      "input": "214.3 31.8% 91.4%",
      "ring": "221.2 83.2% 53.3%"
    },
    "dark": {
      "background": "222.2 84% 4.9%",
      "foreground": "210 40% 98%",
      "card": "222.2 84% 4.9%",
      "card-foreground": "210 40% 98%",
      "popover": "222.2 84% 4.9%",
      "popover-foreground": "210 40% 98%",
      "primary": "217.2 91.2% 59.8%",
      "primary-foreground": "222.2 47.4% 11.2%",
      "secondary": "217.2 32.6% 10.5%",
      "secondary-foreground": "210 40% 98%",
      "tertiary": "217.2 32.6% 15.5%",
      "tertiary-foreground": "210 40% 98%",
      "muted": "217.2 32.6% 17.5%",
      "muted-foreground": "215 20.2% 65.1%",
      "accent": "217.2 32.6% 17.5%",
      "accent-foreground": "210 40% 98%",
      "destructive": "0 62.8% 30.6%",
      "destructive-foreground": "210 40% 98%",
      "border": "217.2 32.6% 17.5%",
      "input": "217.2 32.6% 17.5%",
      "ring": "224.3 76.3% 48%"
    }
  },
  "yellow": {
    "light": {
      "border": "20 5.9% 90%",
      "input": "20 5.9% 90%",
      "ring": "20 14.3% 4.1%",
      "radius": "0.5rem",
      "primary": "47.9 95.8% 53.1%",
      "primary-foreground": "26 83.3% 14.1%",
      "secondary": "47.9 40% 96.1%",
      "secondary-foreground": "222.2 47.4% 11.2%",
      "tertiary": "47.9 40% 92.1%",
      "tertiary-foreground": "222.2 47.4% 8.2%",
      "accent": "47.9 40% 92.1%",
      "accent-foreground": "222.2 47.4% 8.2%",
    },
    "dark": {
      "background": "20 14.3% 4.1%",
      "foreground": "60 9.1% 97.8%",
      "card": "20 14.3% 4.1%",
      "card-foreground": "60 9.1% 97.8%",
      "popover": "20 14.3% 4.1%",
      "popover-foreground": "60 9.1% 97.8%",
      "primary": "47.9 95.8% 53.1%",
      "primary-foreground": "26 83.3% 14.1%",
      "secondary": "12 6.5% 10.1%",
      "secondary-foreground": "60 9.1% 97.8%",
      "tertiary": "12 6.5% 15.1%",
      "tertiary-foreground": "60 9.1% 97.8%",
      "muted": "12 6.5% 15.1%",
      "muted-foreground": "24 5.4% 63.9%",
      "accent": "12 6.5% 15.1%",
      "accent-foreground": "60 9.1% 97.8%",
      "destructive": "0 62.8% 30.6%",
      "destructive-foreground": "60 9.1% 97.8%",
      "border": "12 6.5% 15.1%",
      "input": "12 6.5% 15.1%",
      "ring": "35.5 91.7% 32.9%",
    },
  },
  "purple": {
    "light": {
      "primary": "263.4 100% 74.4%",
      "primary-foreground": "210 20% 98%",
      "secondary": "263.4 40% 96.1%",
      "secondary-foreground": "222.2 47.4% 11.2%",
      "tertiary": "263.4 40% 92.1%",
      "tertiary-foreground": "222.2 47.4% 8.2%",
      "accent": "263.4 40% 92.1%",
      "accent-foreground": "222.2 47.4% 8.2%",
      "border": "220 13% 91%",
      "input": "220 13% 91%",
      "ring": "262.1 83.3% 57.8%",
    },
    "dark": {
      "primary": "263.4 100% 78.4%",
      "primary-foreground": "210 20% 98%",
      "secondary": "240 3.7% 8.9%",
      "secondary-foreground": "0 0% 98%",
      "tertiary": "240 3.7% 15.9%",
      "tertiary-foreground": "0 0% 98%",
      "accent": "240 3.7% 15.9%",
      "accent-foreground": "0 0% 98%",
      "border": "240 3.7% 15.9%",
      "input": "240 3.7% 15.9%",
      "ring": "240 4.9% 83.9%"
    },
  },
} as const;

export type BaseColor = (typeof colorThemes)
