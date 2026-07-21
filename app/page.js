"use client";

import { useEffect, useRef, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Carga Spline dinámicamente solo en el cliente
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center text-xs text-stone-400">
      Cargando minimundo...
    </div>
  ),
});

export default function Miniaturas() {
  const frase = '"La magia no se mide en centímetros, se siente en los detalles."';
  
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [isHoverable, setIsHoverable] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  
  const fraseRef = useRef(null);
  const scrollSectionRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsHoverable(window.matchMedia("(hover: hover)").matches);
    }
  }, []);

  const palabrasProcesadas = useMemo(() => {
    let globalIdx = 0;
    return frase.split(" ").map((palabra) => {
      const letras = palabra.split("").map((letra) => {
        const idx = globalIdx;
        globalIdx++;
        return { letra, idx };
      });
      return letras;
    });
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let mm = gsap.matchMedia();

    // Animación de revelado para las tarjetas de la Historia
    const tarjetas = gsap.utils.toArray(".reveal-card");
    tarjetas.forEach((tarjeta) => {
      gsap.fromTo(tarjeta, 
        { opacity: 0, y: 50 }, 
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: tarjeta,
            start: "top 90%",
            toggleActions: "play none none none",
          }
        }
      );
    });

    // CONFIGURACIÓN PARA ESCRITORIO (>= 768px)
    mm.add("(min-width: 768px)", () => {
      const scrollContainer = scrollContainerRef.current;
      const scrollSection = scrollSectionRef.current;

      if (scrollContainer && scrollSection) {
        gsap.to(scrollContainer, {
          x: () => -(scrollContainer.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: scrollSection,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => "+=" + (scrollContainer.scrollWidth - window.innerWidth),
            invalidateOnRefresh: true,
          }
        });
      }

      gsap.to(".dec-slow", {
        y: "-35vh",
        rotation: 180,
        scrollTrigger: {
          trigger: "main",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        }
      });

      gsap.to(".dec-fast", {
        y: "-75vh",
        rotation: -360,
        scrollTrigger: {
          trigger: "main",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
        }
      });

      gsap.to(".side-decorations", {
        opacity: 0,
        scale: 0.7,
        pointerEvents: "none",
        scrollTrigger: {
          trigger: scrollSectionRef.current,
          start: "top 85%",
          end: "top 15%",
          scrub: true,
        }
      });
    });

    // CONFIGURACIÓN PARA CELULARES (< 768px): Limpieza total de GSAP
    mm.add("(max-width: 767px)", () => {
      if (scrollContainerRef.current) {
        gsap.set(scrollContainerRef.current, { clearProps: "all" });
      }
    });

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(timer);
      mm.revert();
    };

  }, []);

  function handleSplineLoad() {
    gsap.to(fraseRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.8,
      ease: "power4.out",
      delay: 0.3,
      onComplete: () => {
        ScrollTrigger.refresh(); 
      }
    });
  }

  return (
    <main className="w-full min-h-screen bg-[#C1FFB2] text-stone-900 font-mono relative overflow-x-hidden">
      
      {/* ─── BARRA SUPERIOR (NAVBAR) ────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-md border-b border-stone-200/50 px-4 py-3 md:px-6 md:py-4 flex justify-between items-center z-50">
        <a href="#inicio" className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity duration-200">
          {!logoFailed ? (
            <img 
              src="/logominimundos.png" 
              alt="Logo Minimundos Dani" 
              className="h-8 w-auto md:h-12 object-contain"
              onError={() => setLogoFailed(true)}
            />
          ) : (
            <span className="font-bold text-xs md:text-sm tracking-wider text-stone-900">
              MINIMUNDOS DANI
            </span>
          )}
        </a>
        
        <div className="flex gap-4 md:gap-6 text-[10px] md:text-xs uppercase tracking-widest font-bold">
          <a href="#inicio" className="hover:text-lime-700 transition-colors duration-200">
            Inicio
          </a>
          <a href="#historia" className="hover:text-lime-700 transition-colors duration-200">
            Historia
          </a>
          <a href="#encargos" className="hover:text-lime-700 transition-colors duration-200">
            Encargos
          </a>
        </div>
      </nav>

      {/* ─── DECORACIONES LATERALES FLOTANTES (Solo PC) ─── */}
      <div className="side-decorations fixed left-0 top-0 h-screen w-12 md:w-24 pointer-events-none z-40 hidden md:flex flex-col justify-between py-28 pl-6 transition-opacity duration-300">
        <div className="dec-fast text-amber-400">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 drop-shadow">
            <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
          </svg>
        </div>
        <div className="dec-slow text-rose-400 opacity-80">
          <svg viewBox="0 0 20 60" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="w-8 h-20">
            <path d="M10 5 C 20 15, 0 25, 10 35 C 20 45, 0 55, 10 65" />
          </svg>
        </div>
        <div className="dec-fast text-sky-400">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 drop-shadow">
            <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
          </svg>
        </div>
      </div>

      <div className="side-decorations fixed right-0 top-0 h-screen w-12 md:w-24 pointer-events-none z-40 hidden md:flex flex-col justify-between py-28 pr-6 items-end transition-opacity duration-300">
        <div className="dec-slow">
          <div className="w-3 h-16 bg-amber-400 rounded-full transform rotate-35 shadow-sm"></div>
        </div>
        <div className="dec-fast text-rose-400">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 drop-shadow">
            <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
          </svg>
        </div>
        <div className="dec-slow text-emerald-400 opacity-80">
          <svg viewBox="0 0 20 60" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="w-8 h-20">
            <path d="M10 5 L 18 15 L 2 25 L 18 35 L 2 45 L 10 55" />
          </svg>
        </div>
      </div>

      {/* ─── FILA 1: Hero ────────────────── */}
      <section 
        id="inicio" 
        className="w-full min-h-screen bg-white flex items-center justify-center px-4 md:px-12 pt-20 pb-8 md:pt-24 md:pb-12 overflow-hidden"
      >
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-12 items-center">
          
          {/* LADO IZQUIERDO: La Frase */}
          <div className="col-span-1 md:col-span-2 flex flex-col justify-center pr-0 md:pr-8 pt-2 md:pt-0 text-left">
            <h1 
              ref={fraseRef} 
              className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-stone-900 leading-tight opacity-0 translate-y-8 select-none"
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {palabrasProcesadas.map((palabra, pIdx) => (
                <span key={pIdx} className="inline-block whitespace-nowrap align-middle">
                  {palabra.map(({ letra, idx }) => {
                    let scale = 1;
                    let color = "inherit"; 

                    if (isHoverable && hoveredIdx !== null) {
                      const distancia = Math.abs(hoveredIdx - idx);
                      if (distancia === 0) {
                        scale = 1.45;      
                        color = "#22c55e"; 
                      } else if (distancia === 1) {
                        scale = 1.25;      
                        color = "#4ade80"; 
                      } else if (distancia === 2) {
                        scale = 1.12;      
                        color = "#86efac"; 
                      } else if (distancia === 3) {
                        scale = 1.04;      
                        color = "#bbf7d0"; 
                      }
                    }

                    return (
                      <span
                        key={idx}
                        onMouseEnter={() => setHoveredIdx(idx)}
                        style={{
                          transform: `scale(${scale})`,
                          color: color,
                          display: "inline-block",
                          verticalAlign: "middle", 
                          transition: "transform 0.15s ease-out, color 0.15s ease-out",
                          transformOrigin: "center"
                        }}
                        className="cursor-default"
                      >
                        {letra}
                      </span>
                    );
                  })}
                  {pIdx < palabrasProcesadas.length - 1 && "\u00A0"}
                </span>
              ))}
            </h1>
          </div>

          {/* LADO DERECHO: Escena de Spline */}
          <div className="col-span-1 md:col-span-3 w-full h-[350px] sm:h-[450px] md:h-[70vh] rounded-[2.5rem] overflow-hidden border border-stone-200/60 shadow-xl bg-white relative flex items-center justify-center pointer-events-none md:pointer-events-auto">
            {/* Caja de resolución fija que fuerza a Spline a no cambiar la cámara */}
            <div className="w-[500px] h-[500px] md:w-full md:h-full shrink-0 transform scale-[0.65] sm:scale-[0.85] md:scale-100 flex items-center justify-center [&>div]:!w-full [&>div]:!h-full [&>canvas]:!w-full [&>canvas]:!h-full">
              <Spline 
                scene="https://prod.spline.design/L1gUDvcVuunENRBt/scene.splinecode" 
                onLoad={handleSplineLoad}
              />
            </div>
          </div>
      </div>
      </section>

      {/* ─── FILA 2: Información de la Historia ───────────────── */}
      <section 
        id="historia" 
        className="w-full min-h-screen bg-[#C1FFB2] px-4 md:px-6 py-20 md:py-32 flex flex-col items-center justify-center gap-8 max-w-6xl mx-auto"
      >
        <div className="flex flex-col gap-8 w-full max-w-3xl">
          
          <div className="w-full bg-white p-6 md:p-10 rounded-2xl border border-stone-200/80 shadow-sm flex flex-col reveal-card opacity-0"> 
            <h3 className="text-lg md:text-xl font-bold">El arte de lo pequeño</h3>
            <p className="text-xs md:text-sm text-stone-900 mt-3 md:mt-4 font-mono leading-relaxed">
              Minimundos Dani nace de la creatividad de una madre que, después de años ayudando a sus hijos con las tareas plásticas del colegio, encontró en las manualidades una forma de expresión única. Todo comenzó cuando quiso hacer un regalo original para las hijas de una amiga: así creó sus primeros cuadros en miniatura, piezas llenas de detalle, ternura y dedicación.
            </p>
          </div>
          
          <div className="w-full bg-white p-6 md:p-10 rounded-2xl border border-stone-200/80 shadow-sm flex flex-col reveal-card opacity-0">
            <h3 className="text-lg md:text-xl font-bold">Transformando materiales</h3>
            <p className="text-xs md:text-sm text-stone-900 mt-3 md:mt-4 font-mono leading-relaxed">
              Cada pequeña taza, libro o maceta de nuestros minimundos se fabrica a mano utilizando técnicas artesanales de transformación y pintura. El proceso es lento y sumamente detallista, seleccionando materiales reciclados que den vida a escenarios únicos, pensados para atesorar momentos y rincones entrañables.
            </p>
          </div>

        </div>
      </section>

      {/* ─── FILA 3: Sección de Encargos ────────── */}
      <section 
        ref={scrollSectionRef} 
        id="encargos" 
        className="w-full py-10 md:py-0 md:h-screen bg-[#F9F6F0] relative border-t border-stone-200 overflow-hidden"
      >
        {/* Indicador táctil en celular */}
        <div className="md:hidden text-center pb-4 text-[11px] font-bold text-stone-500 uppercase tracking-widest animate-pulse">
          ← Deslizá hacia los lados para explorar →
        </div>

        <div 
          ref={scrollContainerRef} 
          className="flex overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none w-full md:w-[500vw] gap-4 md:gap-0 px-4 md:px-0 md:h-full pb-4 md:pb-0" 
        >
          
          {/* SLIDE 0: Diapositiva de Introducción */}
          <div className="w-[85vw] sm:w-[80vw] md:w-screen h-auto md:h-full shrink-0 snap-center rounded-3xl md:rounded-none flex flex-col items-center justify-center p-6 md:px-8 text-center bg-stone-900 text-stone-100 my-auto">
            <span className="text-xs md:text-sm text-lime-500 font-bold uppercase tracking-widest">Portafolio</span>
            <h2 className="text-xl sm:text-2xl md:text-6xl font-bold mt-4 max-w-3xl leading-tight">
              Así nacen nuestros encargos: de una idea en chat al detalle físico.
            </h2>
            <p className="text-xs md:text-sm text-stone-400 mt-6 hidden md:block animate-pulse">↓ Seguí bajando para recorrerlos hacia el costado ↓</p>
          </div>

          {/* SLIDE 1: Santinivial S.A. */}
          <div className="w-[85vw] sm:w-[85vw] md:w-screen h-auto md:h-full shrink-0 snap-center flex items-center justify-center px-1 md:px-16 my-auto">
            <div className="w-full max-w-6xl flex flex-col md:flex-row gap-4 md:gap-16 items-center justify-center">
              
              <div className="w-full max-w-[250px] sm:max-w-md md:max-w-2xl aspect-4/3 md:aspect-square rounded-2xl md:rounded-3xl overflow-hidden border border-stone-200 bg-stone-100 shadow-md relative shrink-0">
                <img 
                  src="/cuadro_santinivial.jpg" 
                  alt="Cuadro Santinivial S.A." 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentNode.innerHTML = '<div class="absolute inset-0 flex items-center justify-center text-xs md:text-base text-stone-400 p-4 text-center">Aquí va la foto del cuadro de Santinivial</div>';
                  }}
                />
              </div>

              <div className="w-full max-w-md md:max-w-xl flex flex-col items-start font-sans">
                <div className="bg-[#d9fdd3] text-stone-900 p-4 md:p-8 rounded-2xl md:rounded-3xl rounded-tl-none shadow-md border border-emerald-100 relative w-full">
                  <div className="text-xs md:text-sm font-bold text-emerald-800 mb-2 flex items-center gap-1.5">
                    <span>💬 WhatsApp</span>
                    <span className="text-stone-400 font-normal">• Cliente</span>
                  </div>
                  <p className="text-xs sm:text-sm md:text-xl text-stone-800 leading-relaxed font-medium">
                    "¡Hola! ¿Seguís haciendo cuadros? Necesito armar uno para Santinivial S.A. Tendría que tener un pozo profundo con tubos, un tractor bajando uno, el techo y logo de YPF con sus colores, y al lado un hombre con jeans, camisa, casco blanco y papeles en mano."
                  </p>
                  <div className="text-[9px] md:text-xs text-stone-400 text-right mt-2 md:mt-3 flex items-center justify-end gap-1 select-none">
                    <span>20:22</span>
                    <span className="text-sky-500 font-sans font-bold">✓✓</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* SLIDE 2: Podología */}
          <div className="w-[85vw] sm:w-[85vw] md:w-screen h-auto md:h-full shrink-0 snap-center flex items-center justify-center px-1 md:px-16 my-auto">
            <div className="w-full max-w-6xl flex flex-col md:flex-row gap-4 md:gap-16 items-center justify-center">
              
              <div className="w-full max-w-[250px] sm:max-w-md md:max-w-2xl aspect-4/3 md:aspect-square rounded-2xl md:rounded-3xl overflow-hidden border border-stone-200 bg-stone-100 shadow-md relative shrink-0">
                <img 
                  src="/cuadro_podologia.jpg" 
                  alt="Cuadro Consultorio Podológico" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentNode.innerHTML = '<div class="absolute inset-0 flex items-center justify-center text-xs md:text-base text-stone-400 p-4 text-center">Aquí va la foto del consultorio podológico</div>';
                  }}
                />
              </div>

              <div className="w-full max-w-md md:max-w-xl flex flex-col items-start font-sans">
                <div className="bg-[#d9fdd3] text-stone-900 p-4 md:p-8 rounded-2xl md:rounded-3xl rounded-tl-none shadow-md border border-emerald-100 relative w-full">
                  <div className="text-xs md:text-sm font-bold text-emerald-800 mb-2 flex items-center gap-1.5">
                    <span>💬 WhatsApp</span>
                    <span className="text-stone-400 font-normal">• Cliente</span>
                  </div>
                  <p className="text-xs sm:text-sm md:text-xl text-stone-800 leading-relaxed font-medium">
                    "Hola Daniela, ¡mucho gusto! Me interesan esos cuadros que hacés. Hace poco me recibí de podóloga y me gustaría encargar uno sobre mi consultorio personal. ¿Te basás en una foto del lugar? ¿Cuáles son las medidas estándar?"
                  </p>
                  <div className="text-[9px] md:text-xs text-stone-400 text-right mt-2 md:mt-3 flex items-center justify-end gap-1 select-none">
                    <span>21:22</span>
                    <span className="text-sky-500 font-sans font-bold">✓✓</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* SLIDE 3: Local de Mates y Asado */}
          <div className="w-[85vw] sm:w-[85vw] md:w-screen h-auto md:h-full shrink-0 snap-center flex items-center justify-center px-1 md:px-16 my-auto">
            <div className="w-full max-w-6xl flex flex-col md:flex-row gap-4 md:gap-16 items-center justify-center">
              
              <div className="w-full max-w-[250px] sm:max-w-md md:max-w-2xl aspect-4/3 md:aspect-square rounded-2xl md:rounded-3xl overflow-hidden border border-stone-200 bg-stone-100 shadow-md relative shrink-0">
                <img 
                  src="/cuadro_mates.jpg" 
                  alt="Cuadro Local de Mates y Asado" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentNode.innerHTML = '<div class="absolute inset-0 flex items-center justify-center text-xs md:text-base text-stone-400 p-4 text-center">Aquí va la foto del local de mates</div>';
                  }}
                />
              </div>

              <div className="w-full max-w-md md:max-w-xl flex flex-col items-start font-sans">
                <div className="bg-[#d9fdd3] text-stone-900 p-4 md:p-8 rounded-2xl md:rounded-3xl rounded-tl-none shadow-lg border border-emerald-100 relative w-full">
                  <div className="text-xs md:text-sm font-bold text-emerald-800 mb-2 flex items-center gap-1.5">
                    <span>💬 WhatsApp</span>
                    <span className="text-stone-400 font-normal">• Cliente</span>
                  </div>
                  <p className="text-xs sm:text-sm md:text-xl text-stone-800 leading-relaxed font-medium">
                    "¡Hola Dani! Es para alguien que tiene un negocio de mates y cosas para el asado. Entrás y tenés estantes con vasos y termos a la izquierda, una mesa con cuchillos al centro y atrás el escritorio con la compu. ¡Confío pleno en tus diseños!"
                  </p>
                  <div className="text-[9px] md:text-xs text-stone-400 text-right mt-2 md:mt-3 flex items-center justify-end gap-1 select-none">
                    <span>21:36</span>
                    <span className="text-sky-500 font-sans font-bold">✓✓</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* SLIDE 4: Regalo Día del Padre */}
          <div className="w-[85vw] sm:w-[85vw] md:w-screen h-auto md:h-full shrink-0 snap-center flex items-center justify-center px-1 md:px-16 my-auto">
            <div className="w-full max-w-6xl flex flex-col md:flex-row gap-4 md:gap-16 items-center justify-center">
              
              <div className="w-full max-w-[250px] sm:max-w-md md:max-w-2xl aspect-4/3 md:aspect-square rounded-2xl md:rounded-3xl overflow-hidden border border-stone-200 bg-stone-100 shadow-md relative shrink-0">
                <img 
                  src="/cuadro_viajero.jpg" 
                  alt="Cuadro Viajero Día del Padre" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentNode.innerHTML = '<div class="absolute inset-0 flex items-center justify-center text-xs md:text-base text-stone-400 p-4 text-center">Aquí va la foto del cuadro de viajes y motos</div>';
                  }}
                />
              </div>

              <div className="w-full max-w-md md:max-w-xl flex flex-col items-start font-sans">
                <div className="bg-[#d9fdd3] text-stone-900 p-4 md:p-8 rounded-2xl md:rounded-3xl rounded-tl-none shadow-lg border border-emerald-100 relative w-full">
                  <div className="text-xs md:text-sm font-bold text-emerald-800 mb-2 flex items-center gap-1.5">
                    <span>💬 WhatsApp</span>
                    <span className="text-stone-400 font-normal">• Cliente</span>
                  </div>
                  <p className="text-xs sm:text-sm md:text-xl text-stone-800 leading-relaxed font-medium">
                    "Hola, ¿podría hacerte un encargo para el Día del Padre? Ama viajar y además le gustan las motos. Como elementos se podría poner una mochila de mochilero que diga National Geographic, un mapa y una brújula."
                  </p>
                  <div className="text-[9px] md:text-xs text-stone-400 text-right mt-2 md:mt-3 flex items-center justify-end gap-1 select-none">
                    <span>21:06</span>
                    <span className="text-sky-500 font-sans font-bold">✓✓</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ─── FILA 4: Contacto y Redes ────────────────── */}
      <section className="w-full bg-white flex flex-col items-center justify-center px-4 md:px-6 py-12 md:py-20 border-t border-stone-200">
        <div className="w-full max-w-2xl text-center flex flex-col items-center gap-6">
          
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-xl md:text-3xl font-bold tracking-tight">¿Querés tu propio minimundo?</h3>
            <p className="text-xs md:text-base text-stone-500 max-w-md font-sans leading-relaxed">
              Escribinos para presupuestar tu rincón favorito, recrear un recuerdo o hacer un regalo inolvidable.
            </p>
            <a 
              href="https://wa.me/5493513109593?text=¡Hola%20Dani!%20Vi%20tu%20página%20y%20me%20encantaría%20consultarte%20para%20encargarte%20un%20minimundo%20personalizado."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-4 px-8 md:py-5 md:px-10 rounded-full shadow-md transition-all duration-200 hover:scale-105 text-sm md:text-xl font-sans"
            >
              <span>Encargar por WhatsApp</span>
            </a>
          </div>

          <div className="w-20 md:w-24 h-px bg-stone-200 my-2"></div>

          <div className="flex flex-col items-center gap-3">
            <span className="text-[10px] md:text-sm uppercase tracking-widest text-stone-500 font-bold">seguinos en instagram</span>
            <a 
              href="https://www.instagram.com/danielafernandez4354?igsh=MWNkOGZjazJrZ3l5eA==" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-stone-900 hover:bg-stone-900 hover:text-white text-stone-900 font-bold py-3 px-6 md:py-4 md:px-8 rounded-full transition-all duration-200 text-sm md:text-lg"
            >
              <span>@danielafernandez4354</span>
            </a>
          </div>

        </div>
      </section>

    </main>
  );
}