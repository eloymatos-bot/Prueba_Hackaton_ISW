// Chatbot Script
const chatbotData = {
    menuOptions: [
        { id: 1, label: "Servicios" },
        { id: 2, label: "Horarios" },
        { id: 3, label: "Contacto" },
        { id: 4, label: "Soporte Remoto" }
    ],
    responses: {
        greeting: "¡Hola! 👋 Bienvenido a nuestro servicio. ¿En qué puedo ayudarte?",
        servicios: "📋 Ofrecemos tres servicios principales:\n\n1. **Mantenimiento Preventivo** - Revisiones mensuales, actualizaciones de software y monitoreo 24/7\n\n2. **Limpieza Física** - Limpieza de equipos, organización de cables y control de temperatura\n\n3. **Optimización del Sistema** - Mejora de rendimiento, análisis de velocidad y actualizaciones de hardware\n\n¿Te gustaría conocer más de alguno?",
        horarios: "⏰ Nuestros horarios de atención:\n\n📅 Lunes a Viernes: 9:00 AM - 6:00 PM\n📅 Sábado: 10:00 AM - 2:00 PM\n📅 Domingo: Cerrado\n\n⚠️ Para soporte técnico remoto disponemos de atención 24/7",
        contacto: "📞 Ponte en contacto con nosotros:\n\n📱 Teléfono: +1 (555) 123-4567\n✉️ Email: contacto@empresa.com\n📍 Ubicación: Calle Principal 123, Ciudad\n\n¿Deseas enviar un mensaje? Puedes hacerlo desde nuestra página de contacto.",
        soporte: "🛠️ Soporte Técnico Remoto\n\nOfrecemos asistencia técnica remota en tiempo real para:\n\n✓ Diagnóstico de problemas\n✓ Reparación de sistemas\n✓ Instalación de software\n✓ Optimización de rendimiento\n\nDisponible 24/7. ¡Contáctanos ahora!",
        back: "¿En qué más puedo ayudarte?"
    }
};

class Chatbot {
    constructor() {
        this.isOpen = false;
        this.currentView = 'menu';
        this.init();
    }

    init() {
        this.createWidget();
        this.attachEventListeners();
    }

    createWidget() {
        // Contenedor principal del chatbot
        const chatbotContainer = document.createElement('div');
        chatbotContainer.id = 'chatbot-container';
        chatbotContainer.innerHTML = `
            <!-- Botón flotante -->
            <button id="chatbot-toggle" class="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center z-50 hover:scale-110">
                <span class="text-2xl">💬</span>
            </button>

            <!-- Ventana del chatbot -->
            <div id="chatbot-window" class="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-lg shadow-2xl flex flex-col hidden z-50">
                <!-- Header -->
                <div class="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
                    <h3 class="font-bold text-lg">Asistente Virtual</h3>
                    <button id="chatbot-close" class="text-white hover:bg-blue-700 rounded-full p-1 transition-all">
                        ✕
                    </button>
                </div>

                <!-- Mensajes -->
                <div id="chatbot-messages" class="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50"></div>

                <!-- Opciones/Input -->
                <div id="chatbot-options" class="p-4 border-t bg-white rounded-b-lg"></div>
            </div>
        `;

        document.body.appendChild(chatbotContainer);
    }

    attachEventListeners() {
        const toggleBtn = document.getElementById('chatbot-toggle');
        const closeBtn = document.getElementById('chatbot-close');

        toggleBtn.addEventListener('click', () => this.toggleChat());
        closeBtn.addEventListener('click', () => this.closeChat());
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        const window = document.getElementById('chatbot-window');
        
        if (this.isOpen) {
            window.classList.remove('hidden');
            this.showGreeting();
        } else {
            window.classList.add('hidden');
        }
    }

    closeChat() {
        this.isOpen = false;
        document.getElementById('chatbot-window').classList.add('hidden');
    }

    showGreeting() {
        const messagesDiv = document.getElementById('chatbot-messages');
        messagesDiv.innerHTML = '';
        
        // Mensaje de saludo
        this.addMessage(chatbotData.responses.greeting, 'bot');
        
        // Mostrar opciones del menú
        this.currentView = 'menu';
        this.showMenu();
    }

    showMenu() {
        const optionsDiv = document.getElementById('chatbot-options');
        optionsDiv.innerHTML = '';

        chatbotData.menuOptions.forEach(option => {
            const btn = document.createElement('button');
            btn.className = 'w-full text-left p-3 mb-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-all border-l-4 border-blue-600 font-semibold text-gray-800';
            btn.textContent = `${option.id}. ${option.label}`;
            btn.addEventListener('click', () => this.handleMenuClick(option.id));
            optionsDiv.appendChild(btn);
        });
    }

    handleMenuClick(optionId) {
        const labels = ['Servicios', 'Horarios', 'Contacto', 'Soporte Remoto'];
        this.addMessage(`${optionId}. ${labels[optionId - 1]}`, 'user');

        let response = '';
        switch(optionId) {
            case 1:
                response = chatbotData.responses.servicios;
                break;
            case 2:
                response = chatbotData.responses.horarios;
                break;
            case 3:
                response = chatbotData.responses.contacto;
                break;
            case 4:
                response = chatbotData.responses.soporte;
                break;
        }

        setTimeout(() => {
            this.addMessage(response, 'bot');
            this.showBackButton();
        }, 300);
    }

    showBackButton() {
        const optionsDiv = document.getElementById('chatbot-options');
        optionsDiv.innerHTML = '';

        const btn = document.createElement('button');
        btn.className = 'w-full text-left p-3 bg-gray-200 hover:bg-gray-300 rounded-lg transition-all border-l-4 border-gray-600 font-semibold text-gray-800';
        btn.textContent = '← Volver al menú';
        btn.addEventListener('click', () => {
            this.addMessage('Volver al menú', 'user');
            setTimeout(() => {
                this.addMessage(chatbotData.responses.back, 'bot');
                this.showMenu();
            }, 300);
        });
        optionsDiv.appendChild(btn);
    }

    addMessage(text, sender) {
        const messagesDiv = document.getElementById('chatbot-messages');
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `flex ${sender === 'bot' ? 'justify-start' : 'justify-end'}`;

        const bubble = document.createElement('div');
        bubble.className = `max-w-xs p-3 rounded-lg ${
            sender === 'bot' 
                ? 'bg-blue-100 text-gray-800 rounded-bl-none' 
                : 'bg-blue-600 text-white rounded-br-none'
        }`;
        
        bubble.innerHTML = text.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        messageDiv.appendChild(bubble);
        messagesDiv.appendChild(messageDiv);

        // Auto-scroll al último mensaje
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
}

// Inicializar chatbot cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new Chatbot();
});
