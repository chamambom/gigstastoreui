// src/stores/themeStore.ts

import { defineStore } from 'pinia';

// 1. Define the possible themes and the State Interface
type Theme = 'light' | 'dark';

interface ThemeState {
    currentTheme: Theme;
}

// Helper function to set the theme in localStorage and on the document element
const applyTheme = (theme: Theme) => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
};


export const useThemeStore = defineStore('theme', {
    // 2. STATE (Typed as ThemeState)
    state: (): ThemeState => ({
        // Initialize from localStorage, defaulting to 'light'
        currentTheme: (localStorage.getItem('theme') as Theme) || 'light',
    }),

    // 3. GETTERS
    getters: {
        // currentTheme: (state): Theme => state.currentTheme,
    },

    // 4. ACTIONS (Directly replace Vuex mutations and actions)
    actions: {
        /**
         * Action to toggle between 'light' and 'dark' themes.
         */
        toggleTheme(): void {
            // Read the current state
            // This still works because `this` inside an action refers to the store instance
            // and accesses the state property directly.
            const newTheme: Theme = this.currentTheme === 'light' ? 'dark' : 'light';

            // Update state and apply theme
            this.currentTheme = newTheme;
            applyTheme(newTheme);
        },

        /**
         * Action to ensure the correct theme is applied on store initialization (e.g., on app load).
         * This replaces the logic that was often in the main app file.
         */
        initTheme(): void {
            const storedTheme = (localStorage.getItem('theme') as Theme);

            // Only apply if a valid theme is stored, otherwise 'light' from initial state is used.
            if (storedTheme === 'light' || storedTheme === 'dark') {
                this.currentTheme = storedTheme;
                applyTheme(storedTheme);
            }
        },

        /**
         * Direct setter for a specific theme (replaces Vuex SET_THEME mutation).
         * @param theme The theme to set ('light' or 'dark').
         */
        setTheme(theme: Theme): void {
            this.currentTheme = theme;
            applyTheme(theme);
        }
    },
});