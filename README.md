# 🎨 Minimundos Dani — Landing Page & Portafolio Web

Landing page interactiva y portafolio digital para **Minimundos Dani**, un emprendimiento artesanal dedicado a la creación de cuadros y escenarios en miniatura hechos a mano.

El sitio combina animación 3D, microinteracciones tipográficas y una experiencia adaptativa entre dispositivos para presentar la historia de la marca y exhibir los encargos personalizados.

---

## ✨ Características Destacadas

- **Experiencia 3D Interactiva (Hero):** Integración de modelo 3D dinámico cargado mediante `@splinetool/react-spline` con optimización de renderizado y escala responsiva.
- **Tipografía Interactiva (Hover Effect):** Frase principal interactiva con cálculo de distancia tipográfica que reacciona al cursor con escalado y cambio de color.
- **Animaciones al Scroll (GSAP & ScrollTrigger):** Revelado progresivo de componentes y tarjetas de historia a medida que el usuario navega.
- **Showcase de Encargos Adaptativo (Responsive UX):**
  - **Escritorio (`>= 768px`):** Scroll horizontal fijado (*pinned horizontal scroll*) gestionado por GSAP.
  - **Móviles (`< 768px`):** Transición automática a carrusel táctil nativo mediante *CSS Scroll Snap* a 60 FPS, evitando interrupciones en el scroll táctil del celular.
- **Integración Directa con Canales de Venta:** Botones dinámicos con mensajes preconfigurados hacia WhatsApp e Instagram.

---

## 🛠️ Tecnologías Utilizadas

- **Framework:** [Next.js](https://nextjs.org/) (App Router, React)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **Animaciones & Scroll:** [GSAP](https://greensock.com/gsap/) (ScrollTrigger, MatchMedia)
- **Renders 3D:** [Spline 3D](https://spline.design/) (`@splinetool/react-spline`)
- **Despliegue:** [Vercel](https://vercel.com/)

---
## 🚀 Instalación y Ejecución Local

Si querés clonar este repositorio y correrlo en tu máquina local:

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/TU_USUARIO/minimundos-dani.git](https://github.com/TU_USUARIO/minimundos-dani.git)
   cd minimundos-dani

2. **Instalar dependencias**
    ```bash
    npm install

3. **iniciar el servidor de desarrollo**
    ```bash
    npm run dev

4. **Abrir en el navegador**
    Ingresá a http://localhost:3000 para ver la aplicación funcionando.

## 🌐 Despliegue

- El proyecto está optimizado para desplegarse en Vercel de forma directa:

- Conectar el repositorio de GitHub a Vercel.

- Vercel detectará Next.js automáticamente.

- Hacer clic en Deploy.


## 📁 Estructura del Proyecto

```text
minimundos-dani/
├── public/
│   ├── logominimundos.png
│   ├── cuadro_santinivial.jpg
│   ├── cuadro_podologia.jpg
│   ├── cuadro_mates.jpg
│   └── cuadro_viajero.jpg
├── src/
│   └── app/
│       ├── layout.js
│       ├── page.js
│       └── globals.css
├── package.json
├── tailwind.config.js
└── README.md