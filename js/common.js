/**
 * Tecnico Online - Common JavaScript Functions
 * Shared functionality across all test pages
 */

// Global utilities object
window.TecnicoOnline = {
    // Device information
    device: {
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        isTablet: /iPad|Android/i.test(navigator.userAgent) && window.innerWidth > 768,
        isDesktop: !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        platform: navigator.platform,
        userAgent: navigator.userAgent,
        language: navigator.language,
        cookieEnabled: navigator.cookieEnabled,
        onLine: navigator.onLine
    },

    // Browser information
    browser: {
        name: getBrowserName(),
        version: getBrowserVersion(),
        engine: getEngine()
    },

    // Screen information
    screen: {
        width: screen.width,
        height: screen.height,
        availWidth: screen.availWidth,
        availHeight: screen.availHeight,
        colorDepth: screen.colorDepth,
        pixelDepth: screen.pixelDepth,
        orientation: screen.orientation ? screen.orientation.type : 'unknown'
    },

    // Common utilities
    utils: {
        // Format timestamp
        formatTime: function(date = new Date()) {
            return date.toLocaleTimeString('pt-BR');
        },

        // Format date
        formatDate: function(date = new Date()) {
            return date.toLocaleDateString('pt-BR');
        },

        // Generate unique ID
        generateId: function() {
            return Date.now().toString(36) + Math.random().toString(36).substr(2);
        },

        // Debounce function
        debounce: function(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        // Throttle function
        throttle: function(func, limit) {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        },

        // Copy text to clipboard
        copyToClipboard: async function(text) {
            try {
                await navigator.clipboard.writeText(text);
                return true;
            } catch (err) {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    return true;
                } catch (fallbackErr) {
                    document.body.removeChild(textArea);
                    return false;
                }
            }
        },

        // Show notification
        showNotification: function(message, type = 'info', duration = 3000) {
            const notification = document.createElement('div');
            notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transition-all duration-300 transform translate-x-full`;
            
            const colors = {
                success: 'bg-green-500 text-white',
                error: 'bg-red-500 text-white',
                warning: 'bg-yellow-500 text-black',
                info: 'bg-blue-500 text-white'
            };

            const icons = {
                success: 'fas fa-check-circle',
                error: 'fas fa-times-circle',
                warning: 'fas fa-exclamation-triangle',
                info: 'fas fa-info-circle'
            };

            notification.className += ` ${colors[type] || colors.info}`;
            notification.innerHTML = `
                <div class="flex items-center space-x-3">
                    <i class="${icons[type] || icons.info}"></i>
                    <span>${message}</span>
                </div>
            `;

            document.body.appendChild(notification);

            // Animate in
            setTimeout(() => {
                notification.classList.remove('translate-x-full');
            }, 100);

            // Animate out and remove
            setTimeout(() => {
                notification.classList.add('translate-x-full');
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }, duration);
        },

        // Download data as file
        downloadFile: function(data, filename, type = 'text/plain') {
            const blob = new Blob([data], { type });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        },

        // Get device battery info
        getBatteryInfo: async function() {
            if ('getBattery' in navigator) {
                try {
                    const battery = await navigator.getBattery();
                    return {
                        level: Math.round(battery.level * 100),
                        charging: battery.charging,
                        chargingTime: battery.chargingTime,
                        dischargingTime: battery.dischargingTime
                    };
                } catch (error) {
                    return null;
                }
            }
            return null;
        },

        // Get network information
        getNetworkInfo: function() {
            if ('connection' in navigator) {
                const connection = navigator.connection;
                return {
                    effectiveType: connection.effectiveType,
                    downlink: connection.downlink,
                    rtt: connection.rtt,
                    saveData: connection.saveData
                };
            }
            return null;
        },

        // Check if feature is supported
        isSupported: function(feature) {
            const features = {
                geolocation: 'geolocation' in navigator,
                camera: 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices,
                microphone: 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices,
                notifications: 'Notification' in window,
                serviceWorker: 'serviceWorker' in navigator,
                webGL: !!window.WebGLRenderingContext,
                webGL2: !!window.WebGL2RenderingContext,
                webRTC: !!(window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection),
                fullscreen: !!(document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled),
                vibration: 'vibrate' in navigator,
                battery: 'getBattery' in navigator,
                proximity: 'ProximitySensor' in window || 'ondeviceproximity' in window,
                accelerometer: 'Accelerometer' in window,
                gyroscope: 'Gyroscope' in window,
                magnetometer: 'Magnetometer' in window,
                ambientLight: 'AmbientLightSensor' in window,
                touch: 'ontouchstart' in window,
                pointerEvents: 'PointerEvent' in window,
                gamepad: 'getGamepads' in navigator,
                speechRecognition: 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window,
                speechSynthesis: 'speechSynthesis' in window,
                webAudio: !!(window.AudioContext || window.webkitAudioContext),
                midi: 'requestMIDIAccess' in navigator,
                bluetooth: 'bluetooth' in navigator,
                usb: 'usb' in navigator,
                nfc: 'nfc' in navigator
            };

            return features[feature] || false;
        }
    },

    // Test results storage
    storage: {
        // Save test result
        saveResult: function(testName, result) {
            const key = `tecnico_online_${testName}`;
            const data = {
                timestamp: new Date().toISOString(),
                result: result,
                device: TecnicoOnline.device,
                browser: TecnicoOnline.browser
            };
            
            try {
                localStorage.setItem(key, JSON.stringify(data));
                return true;
            } catch (error) {
                console.error('Failed to save test result:', error);
                return false;
            }
        },

        // Get test result
        getResult: function(testName) {
            const key = `tecnico_online_${testName}`;
            try {
                const data = localStorage.getItem(key);
                return data ? JSON.parse(data) : null;
            } catch (error) {
                console.error('Failed to get test result:', error);
                return null;
            }
        },

        // Get all test results
        getAllResults: function() {
            const results = {};
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key.startsWith('tecnico_online_')) {
                    const testName = key.replace('tecnico_online_', '');
                    results[testName] = this.getResult(testName);
                }
            }
            return results;
        },

        // Clear test results
        clearResults: function(testName = null) {
            if (testName) {
                const key = `tecnico_online_${testName}`;
                localStorage.removeItem(key);
            } else {
                // Clear all test results
                const keys = [];
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    if (key.startsWith('tecnico_online_')) {
                        keys.push(key);
                    }
                }
                keys.forEach(key => localStorage.removeItem(key));
            }
        }
    },

    // Animation helpers
    animations: {
        // Animate element
        animate: function(element, animation, duration = 300) {
            return new Promise((resolve) => {
                element.style.animationDuration = `${duration}ms`;
                element.classList.add(animation);
                
                const handleAnimationEnd = () => {
                    element.classList.remove(animation);
                    element.removeEventListener('animationend', handleAnimationEnd);
                    resolve();
                };
                
                element.addEventListener('animationend', handleAnimationEnd);
            });
        },

        // Fade in element
        fadeIn: function(element, duration = 300) {
            return this.animate(element, 'animate-fade-in-up', duration);
        },

        // Bounce in element
        bounceIn: function(element, duration = 600) {
            return this.animate(element, 'animate-bounce-in', duration);
        },

        // Slide in from right
        slideInRight: function(element, duration = 500) {
            return this.animate(element, 'animate-slide-in-right', duration);
        },

        // Slide in from left
        slideInLeft: function(element, duration = 500) {
            return this.animate(element, 'animate-slide-in-left', duration);
        }
    },

    // Initialize common functionality
    init: function() {
        // Add loading class to body
        document.body.classList.add('loading');

        // Remove loading class when page is fully loaded
        window.addEventListener('load', () => {
            document.body.classList.remove('loading');
        });

        // Handle online/offline status
        window.addEventListener('online', () => {
            this.utils.showNotification('Conexão restaurada', 'success');
        });

        window.addEventListener('offline', () => {
            this.utils.showNotification('Conexão perdida', 'warning');
        });

        // Add keyboard navigation support
        document.addEventListener('keydown', (e) => {
            // ESC key to close modals or go back
            if (e.key === 'Escape') {
                const modals = document.querySelectorAll('.modal, .overlay');
                if (modals.length > 0) {
                    modals[modals.length - 1].style.display = 'none';
                }
            }
        });

        // Add touch feedback for mobile
        if (this.device.isMobile) {
            document.addEventListener('touchstart', (e) => {
                if (e.target.matches('button, .btn, .card-hover')) {
                    e.target.style.transform = 'scale(0.95)';
                }
            });

            document.addEventListener('touchend', (e) => {
                if (e.target.matches('button, .btn, .card-hover')) {
                    setTimeout(() => {
                        e.target.style.transform = '';
                    }, 150);
                }
            });
        }

        console.log('Tecnico Online initialized');
    }
};

// Helper functions
function getBrowserName() {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    if (userAgent.includes('Opera')) return 'Opera';
    return 'Unknown';
}

function getBrowserVersion() {
    const userAgent = navigator.userAgent;
    const match = userAgent.match(/(Chrome|Firefox|Safari|Edge|Opera)\/(\d+)/);
    return match ? match[2] : 'Unknown';
}

function getEngine() {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('WebKit')) return 'WebKit';
    if (userAgent.includes('Gecko')) return 'Gecko';
    if (userAgent.includes('Trident')) return 'Trident';
    return 'Unknown';
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    TecnicoOnline.init();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TecnicoOnline;
}