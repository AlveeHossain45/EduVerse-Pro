import React, { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

const themes = {
  blue: {
    name: 'Blue',
    primary: 'from-blue-500 to-blue-600',
    secondary: 'from-blue-100 to-blue-200',
    accent: 'bg-blue-500',
    text: 'text-blue-600',
    border: 'border-blue-200',
    light: {
      bg: 'bg-gradient-to-br from-blue-50 via-white to-blue-50',
      card: 'bg-white/80 backdrop-blur-lg border border-blue-100',
      input: 'bg-white/60 border-blue-200'
    },
    dark: {
      bg: 'bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900',
      card: 'bg-gray-800/80 backdrop-blur-lg border border-blue-800/30',
      input: 'bg-gray-700/60 border-blue-700/30'
    }
  },
  purple: {
    name: 'Purple',
    primary: 'from-purple-500 to-purple-600',
    secondary: 'from-purple-100 to-purple-200',
    accent: 'bg-purple-500',
    text: 'text-purple-600',
    border: 'border-purple-200',
    light: {
      bg: 'bg-gradient-to-br from-purple-50 via-white to-purple-50',
      card: 'bg-white/80 backdrop-blur-lg border border-purple-100',
      input: 'bg-white/60 border-purple-200'
    },
    dark: {
      bg: 'bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900',
      card: 'bg-gray-800/80 backdrop-blur-lg border border-purple-800/30',
      input: 'bg-gray-700/60 border-purple-700/30'
    }
  },
  gold: {
    name: 'Gold',
    primary: 'from-amber-500 to-amber-600',
    secondary: 'from-amber-100 to-amber-200',
    accent: 'bg-amber-500',
    text: 'text-amber-600',
    border: 'border-amber-200',
    light: {
      bg: 'bg-gradient-to-br from-amber-50 via-white to-amber-50',
      card: 'bg-white/80 backdrop-blur-lg border border-amber-100',
      input: 'bg-white/60 border-amber-200'
    },
    dark: {
      bg: 'bg-gradient-to-br from-gray-900 via-amber-900/20 to-gray-900',
      card: 'bg-gray-800/80 backdrop-blur-lg border border-amber-800/30',
      input: 'bg-gray-700/60 border-amber-700/30'
    }
  },
  emerald: {
    name: 'Emerald',
    primary: 'from-emerald-500 to-emerald-600',
    secondary: 'from-emerald-100 to-emerald-200',
    accent: 'bg-emerald-500',
    text: 'text-emerald-600',
    border: 'border-emerald-200',
    light: {
      bg: 'bg-gradient-to-br from-emerald-50 via-white to-emerald-50',
      card: 'bg-white/80 backdrop-blur-lg border border-emerald-100',
      input: 'bg-white/60 border-emerald-200'
    },
    dark: {
      bg: 'bg-gradient-to-br from-gray-900 via-emerald-900/20 to-gray-900',
      card: 'bg-gray-800/80 backdrop-blur-lg border border-emerald-800/30',
      input: 'bg-gray-700/60 border-emerald-700/30'
    }
  },
  rose: {
    name: 'Rose',
    primary: 'from-rose-500 to-rose-600',
    secondary: 'from-rose-100 to-rose-200',
    accent: 'bg-rose-500',
    text: 'text-rose-600',
    border: 'border-rose-200',
    light: {
      bg: 'bg-gradient-to-br from-rose-50 via-white to-rose-50',
      card: 'bg-white/80 backdrop-blur-lg border border-rose-100',
      input: 'bg-white/60 border-rose-200'
    },
    dark: {
      bg: 'bg-gradient-to-br from-gray-900 via-rose-900/20 to-gray-900',
      card: 'bg-gray-800/80 backdrop-blur-lg border border-rose-800/30',
      input: 'bg-gray-700/60 border-rose-700/30'
    }
  }
}

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved !== null ? JSON.parse(saved) : false
  })
  
  const [colorTheme, setColorTheme] = useState(() => {
    const saved = localStorage.getItem('colorTheme')
    return saved && themes[saved] ? saved : 'blue'
  })

  const currentTheme = themes[colorTheme]

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDark))
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  useEffect(() => {
    localStorage.setItem('colorTheme', colorTheme)
  }, [colorTheme])

  const toggleDarkMode = () => {
    setIsDark(!isDark)
  }

  const setTheme = (theme) => {
    if (themes[theme]) {
      setColorTheme(theme)
    }
  }

  const value = {
    isDark,
    toggleDarkMode,
    colorTheme,
    setTheme,
    themes,
    currentTheme
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}