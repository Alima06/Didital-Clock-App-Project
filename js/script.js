    // Variables globales
    let currentTheme = 'dark';

    // Éléments DOM
    const timeElement = document.getElementById('time');
    const dateElement = document.getElementById('date');
    const timezoneElement = document.getElementById('timezone');
    const appContainer = document.getElementById('app');
    const themeButtons = document.querySelectorAll('.theme-btn');

    // Fonction pour obtenir le fuseau horaire
    function getTimezone() {
        try {
            return Intl.DateTimeFormat().resolvedOptions().timeZone;
        } catch (e) {
            console.error("Erreur de détection du fuseau horaire:", e);
            return "Inconnu";
        }
    }

    // Fonction pour formater l'heure
    function formatTime(date) {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
    }

    // Fonction pour formater la date
    function formatDate(date) {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Fonction pour mettre à jour l'horloge
    function updateClock() {
        const now = new Date();
        
        // Mettre à jour l'heure
        timeElement.textContent = formatTime(now);
        
        // Mettre à jour la date
        dateElement.textContent = formatDate(now);
        
        // Mettre à jour le fuseau horaire (une seule fois)
        if (timezoneElement.textContent.includes("Loading")) {
            timezoneElement.textContent = `Time Zone: ${getTimezone()}`;
        }
    }

    // Fonction pour changer de thème
    function changeTheme(newTheme) {
        // Retirer l'ancien thème
        appContainer.classList.remove(`${currentTheme}-theme`);
        
        // Ajouter le nouveau thème
        appContainer.classList.add(`${newTheme}-theme`);
        
        // Mettre à jour la variable globale
        currentTheme = newTheme;
        
        // Mettre à jour les boutons actifs
        updateActiveButton(newTheme);
    }

    // Fonction pour mettre à jour le bouton actif
    function updateActiveButton(activeTheme) {
        themeButtons.forEach(button => {
            button.classList.remove('active');
            if (button.dataset.theme === activeTheme) {
                button.classList.add('active');
            }
        });
    }

    // Initialisation
    function init() {
        // Mettre à jour l'horloge immédiatement
        updateClock();
        
        // Mettre à jour l'horloge toutes les secondes
        setInterval(updateClock, 1000);
        
        // Ajouter les event listeners pour les boutons de thème
        themeButtons.forEach(button => {
            button.addEventListener('click', () => {
                changeTheme(button.dataset.theme);
            });
        });
        
        // Définir le thème initial
        changeTheme(currentTheme);
    }

    // Démarrer l'application quand le DOM est chargé
    document.addEventListener('DOMContentLoaded', init);