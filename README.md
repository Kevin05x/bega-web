> **Esta carpeta (`app/`) es la versión lista para producción.** Contiene únicamente
> los archivos que el sitio necesita para funcionar — sin las capturas, scripts de
> revisión ni fotos crudas que sí viven en `05_Fase_5_Prototipo_Integral/`, la carpeta
> de trabajo. Es la que se sube a GitHub y la que GitHub Pages publica. Cuando haya una
> nueva revisión del sitio, esta carpeta se reemplaza por la versión actualizada — no se
> edita a mano.


# BEGA — Glass industrial · revisión 21 (dominio propio bega.com.pe)

Landing local en español. Diseño y animación en HTML, CSS y JavaScript nativo, con recursos incluidos. No requiere npm, compilación, CDN ni conexión a Internet. Los prototipos previos permanecen en sus carpetas originales.

## Abrir

Desde esta carpeta:

```powershell
node preview.mjs
```

Abrir **http://127.0.0.1:4185/**. El servidor escucha solo en el equipo local. Si el puerto está ocupado:

```powershell
$env:PORT=4186
node preview.mjs
```

También se puede abrir `index.html` directamente. El servidor local ofrece la experiencia más consistente para el portapapeles y la revisión. Detener con Ctrl+C. No se ha desplegado el sitio ni creado un repositorio remoto.

Vista móvil interactiva desde el ordenador: **http://127.0.0.1:4185/preview-movil.html**. Incluye marcos de 390 × 844, 360 × 800 y 430 × 932; desplazar dentro del marco. Es la misma web responsive, no una copia. Esta URL local no abre la web desde otro teléfono; la prueba en dispositivo físico requiere un despliegue o acceso de red autorizado.

## Archivos

- `index.html`: contenido completo, navegación, equipos, galería, seguridad y consulta.
- `style.css`: dirección visual, retícula, componentes, adaptación responsive y estilos de impresión.
- `design-v2.css`: revisión del hero con marca, composición fotográfica en profundidad y muro en perspectiva.
- `glass-industrial.css`: capa visual de vidrio industrial, fondos fotográficos y superficies translúcidas.
- `refinements-v6.css`: última capa visual: acciones verdes, fotos completas, hero ampliado y zona propia para la máquina fija del formulario.
- `mobile-v8.css`: adaptación táctil y animada que se carga después de la capa visual anterior.
- `polish-v9.css`: capa aditiva de la revisión 09 — transiciones, coherencia de identidad entre escritorio y móvil, y contraste fotográfico de servicios. Se carga al final, no reemplaza ninguna capa anterior.
- `clients-v10.css`: capa aditiva de la revisión 10 — únicamente reglas para `.clients` / `.client-logo` (nueva sección de clientes), ajustada en la revisión 12 para que cada logo llene su tarjeta según su propia proporción.
- `ajustes-v12.css`: capa aditiva de la revisión 12 — fondo de servicios más oscuro y texto técnico (eyebrow/micro) más grande en escritorio.
- `equipos-v13.css`: capa aditiva de la revisión 13 — muestra/oculta el lienzo animado de cada tarjeta de equipos sobre su fotografía.
- `contacto-v14.css`: capa aditiva de la revisión 14 — estilo del correo/WhatsApp/redes en el pie de página, de los dos enlaces directos en la sección de contacto, y ajuste de los botones de envío del resumen de consulta.
- `mobile-fixes-v15.css`: capa aditiva de la revisión 15 — legibilidad y usabilidad en móvil (ver esa sección). Se carga al final de todas.
- `preview-movil.html`: marco interactivo de teléfono, solo para presentar la vista responsive.
- `animation.js`: montaje por articulaciones, poses, entrada/salida y trazos de título (grúa azul del hero/servicios/contacto; no se tocó en esta revisión).
- `equipment-motion.js`: revisión 13 — anima el elevador articulado y la plataforma de tijera dentro de sus tarjetas en `#equipos`, con los motores de pose que Kevin generó con ChatGPT/Astra portados literalmente. Independiente de `animation.js`. Desde la revisión 15, responde también a arrastrar el dedo en pantallas táctiles (antes solo mouse/trackpad).
- `visuals.js`: muro fotográfico reversible, respuesta al cursor, alternativa en cuadrícula y entradas de contenido por scroll.
- `app.js`: menú, filtros, modal accesible, resumen local de consulta y recorrido suave entre capítulos (revisión 09); desde la revisión 14 arma también los enlaces de envío por WhatsApp y correo con ese mismo resumen. Desde la revisión 15, también cierra el menú móvil al tocar fuera del panel.
- `contact-focus.js`: brazo con cinemática inversa de dos articulaciones y base fija, dirigido por foco o mouse en el formulario; no lee valores de los campos.
- `polish.js`: inclinación suave de tarjetas al cursor y conteo de las cifras de altura al entrar en vista (revisión 09); no toca el rig ni las coreografías de scroll.
- `preview.mjs`: servidor local, sin dependencias.
- `assets/machine/`: seis PNG originales copiados desde `prototipo-scroll/assets/`, más su registro de pivotes (grúa azul de hero/servicios/contacto).
- `assets/equipos/`: revisión 13 — piezas del elevador articulado anaranjado (12 PNG) y de la plataforma de tijera roja (10 PNG), recomprimidas sin perder transparencia, más `equipos-rig-data.js` con sus pivotes. Piezas generadas por Kevin con ChatGPT/Astra; ver notas de la revisión 13.
- `assets/machine-static.png`: fotograma estático renderizado con esas mismas piezas, para la alternativa sin JavaScript o con fallo de carga.
- `assets/photos/`: selección inicial reutilizada en fondos y bloques; `archive/` contiene las 50 fotos documentales publicadas en la galería (46 del lote original más 4 enviadas por Kevin en la revisión 11), copiadas sin retocar salvo el cambio de formato a JPEG en las 4 nuevas.
- `assets/photo-inventory.json`: catálogo completo de originales, categorías, SHA-256 y once exclusiones.
- `assets/brand/`: símbolo, favicons e imagen de vista previa (Open Graph). Desde la revisión 14, `simbolo-bega-alpha.png` y los favicons se regeneraron a partir de "Logo BEGA.svg" (ver notas de la revisión 14 sobre ese archivo); `og-image.png` es nuevo.
- `assets/brand/social/`: revisión 15 — logotipos reales de WhatsApp, Facebook, Instagram, TikTok y Gmail (SVG, tal como los descargó Kevin de zonalogo.com), usados en el pie de página, la sección de contacto y el menú móvil.
- `assets/clients/`: 8 logotipos de empresas cliente (revisión 10), enviados por Kevin y recortados a su contenido real; ver notas de la revisión 10 sobre el ajuste de contraste en el de CAM.
- `FUENTES_Y_DECISIONES.md`: mapa de referencias, fotografías y contenido.
- `qa/`: herramientas de revisión, muestras de referencias, capturas y `verification.json`. Esta carpeta no se sirve desde la vista previa.

## Dirección visual

Glass industrial sobre una composición editorial: blanco frío `#f2f6f6`, azul profundo `#102f43`, azul `#087dbb` y verde oscuro de interacción `#167348`, con etiquetas blancas. El amarillo se conserva en las franjas físicas de seguridad de los equipos. Fotografía real, vidrio ligeramente azulado, bordes luminosos y superficies más opacas detrás del texto. Se usa Arial y Consolas del sistema para funcionar sin descargas; no se distribuyen fuentes del sistema. Las alternativas tipográficas están propuestas, no aplicadas.

La revisión 03 conserva el símbolo suministrado junto al nombre en la navegación y retira el logo repetido dentro del hero. La fotografía documental `assets/photos/montaje.jpeg` ocupa el fondo del hero, con tratamiento azul y degradados CSS que protegen la lectura. El original no se modifica ni se genera una imagen nueva. Se mantiene el escenario luminoso de la plataforma. El recuadro amarillo «hasta 16 m» sigue eliminado del hero; la capacidad documentada permanece en equipos. No se presentan marcas físicas visibles en las fotos como avales de clientes ni se agregan testimonios, cifras de proyectos o años de experiencia.

En la revisión 04, el arco opaco del hero se reemplaza por un plano de vidrio de esquinas suaves. La navegación tiene acabado esmerilado; servicios incorpora una fotografía suavizada y un panel claro; equipos añade dos encuadres documentales; filtros y leyendas del muro reciben bordes y reflejos discretos. El cierre usa una fotografía industrial y un formulario claro. Se reducen espacios entre bloques estáticos sin acortar los capítulos animados.

La revisión 04 conservó `animation.js` y `visuals.js` byte por byte. La revisión 05 añade a `animation.js` únicamente la conexión del equipo de contacto con la guía de foco. Las coreografías existentes de hero y servicios no se alteran; `visuals.js` sigue idéntico y se verifica con SHA-256. Se comprueba también la reversibilidad del hero y del muro.

Solo la navegación, el fondo del equipo del hero y el formulario usan desenfoque real (10–14 px); nunca las columnas animadas del muro. En móvil y con movimiento reducido se elimina ese desenfoque. Hay colores alternativos para navegadores sin `backdrop-filter`. Los reflejos son estáticos, no hay efectos luminosos adicionales en movimiento.

## Preparación de producción

De la lista de "Próxima fase":

- **Ícono del sitio (favicon):** antes era un ícono vacío (`href="data:,"` — la pestaña del navegador se veía en blanco). Se generó en 32, 48, 180 (para agregar a inicio en iPhone/Android) y 512 px, guardados en `assets/brand/favicon-*.png` y enlazados en `index.html`. Desde la revisión 14, la fuente es la versión más nítida del símbolo (ver abajo).
- **Vista previa al compartir el enlace (Open Graph):** se agregaron `og:title`, `og:description`, `og:image` y `twitter:card`, para que si Kevin comparte el enlace del prototipo con alguien de BEGA por WhatsApp o correo, se vea una tarjeta con título, descripción e imagen en vez de un enlace pelado. Desde la revisión 14, esa imagen (`assets/brand/og-image.png`, 1200×630) usa el logo completo en vez del ícono solo.
- **`robots.txt`:** se agregó, bloqueando todo por ahora (`Disallow: /`), coherente con el `noindex, nofollow` que ya tenía `index.html` porque el sitio sigue sin publicarse. Deja comentada la versión que habilita la indexación, para activarla junto con el dominio final.
- **Contacto comercial real (revisión 14):** Kevin envió el correo (`serviciosgeneralesbega@gmail.com`), el celular (`957 320 345`) y los enlaces a TikTok, Instagram y Facebook. Ver notas de la revisión 14 sobre dónde y cómo se usaron.

**El sitio ya está publicado:** repositorio `Kevin05x/bega-web` en GitHub (público, requisito del plan gratuito de GitHub Pages) y en línea en `https://kevin05x.github.io/bega-web/`. La carpeta `app/` de este proyecto es la que se sube a ese repositorio — ver "Recorrido y despliegue" más abajo para el paso a paso de cómo actualizar el sitio publicado después de un cambio.

Quedan pendientes de la lista, y todos necesitan una decisión o un dato de Kevin/BEGA que no se puede resolver desde el código:

1. Confirmar si el sitio ya se puede indexar (quitar `noindex`/`robots.txt`) o si sigue siendo privado hasta el lanzamiento oficial.
2. Comprar y conectar el dominio propio (BEGA dijo que lo comprará aparte) — GitHub Pages admite un dominio propio además de `kevin05x.github.io`.
3. Revisión en navegadores y dispositivos físicos reales — ya se probó en el teléfono real de Kevin (de ahí la revisión 15); falta Safari/iOS y otros modelos.
4. Si más adelante Kevin consigue una versión vectorial real del logo (ver revisión 14: los dos archivos SVG que mandó no lo son), reemplazar el símbolo y los favicons de nuevo con esa fuente.

## Novedades de la revisión 16

Kevin reenvió el feedback del cliente por WhatsApp (audios) antes de cerrar el proyecto y pagar el dominio: dos pedidos concretos.

- **Logo del encabezado, más “imponente”:** el cliente pidió que el nombre “BEGA” de la barra de navegación se vea más grande y con más espesor (“el espesor, el tamaño”), como en la imagen de referencia que envió (el lock-up en 3D con “BEGA / SOLUCIONES GENERALES / TRABAJOS EN ALTURA Y EQUIPOS DE ELEVACIÓN”). El texto ya usaba `font-weight:900` (el máximo que reconoce CSS) sobre Arial del sistema — sin descargar una fuente nueva, sintetizar más peso ahí no es posible, así que se sumó `-webkit-text-stroke` (un trazo fino sobre el propio relleno, funciona en Chrome/Edge/Safari; en Firefox no hace nada y el texto se ve igual que antes, sin romperse) y se subió el tamaño de 31 a 35px en escritorio (23 a 26px en móvil), aflojando levemente el `letter-spacing` para que las letras no se junten al ser más anchas. Sigue siendo el mismo HTML/CSS de siempre (`.brand-mark`), no una imagen ni una fuente nueva.
- **Logo de Grupo Proycon corregido:** el cliente señaló que el logo de Proycon en la sección de clientes no era el correcto y envió el logo real (fondo azul en degradé con la forma de flecha/arco y “GRUPO PROYCON” en negro). Se recortó al contenido real y se le quitó el fondo blanco/viñeta (igual criterio que el resto de los 8 logos de clientes desde la revisión 10), reemplazando `assets/clients/grupo-proycon.png`. No cambió nada más de la sección.
- **Pendiente de esta ronda:** el cliente también pidió sumar una “frase motivacional” que le había dado a Kevin en otra conversación; Kevin no ubicó el texto exacto todavía (“se me fue”). Queda para una revisión 16b en cuanto lo recupere — no se inventó ningún texto de reemplazo.

## Novedades de la revisión 21

Kevin compró el dominio `bega.com.pe` en Punto.pe (NIC.PE). Se agregó el archivo `CNAME` en la raíz de `app/` con el contenido `bega.com.pe` — es lo que GitHub Pages necesita para servir el sitio en el dominio propio en vez de (o además de) `kevin05x.github.io/bega-web`. Falta el lado del dominio: apuntar sus DNS hacia GitHub Pages (ver instrucciones que se le dieron a Kevin por chat) y, cuando GitHub confirme el DNS, activar "Enforce HTTPS" en Settings → Pages del repositorio.

## Novedades de la revisión 20

Kevin señaló que, al abrir el menú móvil, la franja blanca del encabezado (donde está el logo) quedaba visible y sin oscurecer arriba del panel — se veía como si el menú no tapara bien. Esto ya pasaba desde que existe el panel lateral (revisión 15), pero se notaba poco porque el encabezado era bajo; al crecer a 114-140px para las tres líneas del logo (revisiones 17-19) quedó una franja mucho más grande y evidente sin cubrir.

- **Causa:** tanto el panel lateral (`nav#main-nav`) como el fondo oscurecido detrás (`nav-backdrop`) empezaban en `top:var(--nav)`, es decir, justo debajo del encabezado — dejándolo siempre visible y sin oscurecer al abrir el menú.
- **Solución:** ambos ahora empiezan en `top:0` y cubren toda la pantalla (`height:100svh` / `inset:0`), así que al abrir el menú se oscurece todo, logo incluido. El botón "Menú" sigue por encima de ambos (mismo `z-index` que ya tenía) para poder cerrarlo tocándolo de nuevo.

## Novedades de la revisión 19

Kevin mandó capturas desde su celular: aparecían líneas oscuras cortando las letras de "BEGA" (visible en varios dispositivos, no solo el de él), y pidió quitar el texto "01 — ALCANZAR" que aparecía sobre la foto del hero en móvil.

- **Líneas encima de las letras, causa real:** la revisión 18 ya había simplificado el relieve, pero todavía apilaba 4 capas de `text-shadow` con desplazamientos en fracciones de píxel (.6px, 1.2px, 1.8px, 2.4px) para simular el bisel. Ese apilado de sombras duras es justamente el que puede dejar líneas o costuras visibles entre una capa y la siguiente en algunos motores de render (no todos los navegadores anti-alían igual la unión de varias sombras superpuestas) — lo que Kevin vio no era un capricho del dispositivo, es un problema conocido de esa técnica.
- **Solución:** se bajó de 4 capas a 2 en escritorio y en móvil: una sombra dura de un solo desplazamiento (le da el "escalón" del relieve) más una sombra difuminada (le da la sombra suave debajo). Con una sola capa dura ya no hay dos bordes rectos superpuestos que puedan dejar una costura — es la misma idea de antes pero con muchas menos piezas moviéndose, más robusta entre navegadores y dispositivos.
- **"01 — ALCANZAR" eliminado:** se quitó ese `<span>` del `hero-kicker` en `index.html`. Ya existía una regla que lo ocultaba en pantallas angostas (`display:none` bajo los 900px), pero evidentemente no estaba surtiendo efecto en todos los casos; en vez de perseguir por qué, se sacó directamente el elemento del HTML — así no puede volver a aparecer en ningún ancho de pantalla ni navegador.

## Novedades de la revisión 18

Kevin encontró un problema real en su celular (Android, Chrome): "BEGA" se veía deformado, como letras superpuestas y borrosas, ilegible. Además pidió que el logo sea todavía más grande, que "BEGA" se vea de un azul más claro (como la imagen de referencia), y que la segunda línea sea gris y la tercera negra.

- **La causa del texto deformado en el celular:** la revisión 17 usaba un degradado recortado al texto (`background-clip:text`) más varias capas de `text-shadow`, con el mismo tamaño de sombra en escritorio y en móvil aunque el texto era más chico en móvil (30px) y con `letter-spacing` negativo. En la computadora (fuente Arial real) se veía bien, pero en Android Chrome sustituye Arial por una fuente distinta con letras más anchas en negrita — con el texto más chico, la sombra desproporcionadamente grande y el espaciado negativo, las sombras de una letra se montaban sobre la siguiente y todo se veía como una mancha azul.
- **Solución:** se abandonó el degradado recortado (frágil entre navegadores) por un azul sólido más claro (`#2ba0e6`, el mismo tono de la imagen de referencia) con el efecto de relieve hecho solo con `text-shadow` escalonado — más simple y confiable. En móvil, ese `text-shadow` ahora tiene su propio juego de valores, mucho más chico (una fracción del de escritorio, no el mismo tamaño), y el `letter-spacing` en móvil pasa de -1.1px a 0 para darle aire a las letras. Se probó de nuevo antes de subirlo, esta vez prestando atención a que la sombra fuera proporcional al tamaño de letra en cada ancho de pantalla.
- **Tamaño, otra vez más grande:** "BEGA" pasó de 46 a 60px en escritorio (30 a 36px en móvil), el símbolo de 72×80 a 92×102px (62×69px en móvil), y el encabezado (`--nav`) de 120 a 140px en escritorio (96 a 114px en móvil) para que siga entrando completo.
- **Colores de las tres líneas:** "BEGA" en azul claro (`#2ba0e6`), "SOLUCIONES GENERALES" en gris (`#6c7680`), "TRABAJOS EN ALTURA Y EQUIPOS DE ELEVACIÓN" en negro (`#161616`) — antes las dos líneas de abajo usaban el mismo azul oscuro del resto del sitio.

## Novedades de la revisión 17

Kevin volvió a revisar el logo del encabezado y pidió ir más lejos: que sea notablemente más grande, con un acabado realmente 3D (como la imagen de referencia que reenvió, el lock-up en azul con relieve), y que aparezcan las tres líneas completas ("BEGA" / "SOLUCIONES GENERALES" / "TRABAJOS EN ALTURA Y EQUIPOS DE ELEVACIÓN") — la revisión 16 solo había engrosado el trazo y agregado un poco de tamaño, sin la tercera línea ni relieve real.

- **Tercera línea agregada:** `index.html` ahora tiene `<b class="brand-word">BEGA</b>` seguido de dos `<small>`, una para "SOLUCIONES GENERALES" y otra (`small.brand-sub`) para "TRABAJOS EN ALTURA Y EQUIPOS DE ELEVACIÓN" — el mismo texto que ya vivía en el `eyebrow` del hero, ahora también en el encabezado.
- **Relieve 3D con solo CSS:** en vez de agrandar el peso (ya estaba al máximo desde la revisión 16), "BEGA" ahora usa un degradado azul de arriba hacia abajo recortado al texto (`background-clip:text`) más varias capas de `text-shadow` escalonadas hacia abajo-derecha, que simulan el bisel/relieve de la imagen de referencia. Sigue siendo Arial del sistema — no se descargó ninguna fuente ni se generó una imagen; es el mismo truco de CSS que usan muchos logotipos "3D" hechos solo con texto.
- **Tamaño real, no solo percibido:** el texto "BEGA" pasó de 35 a 46px en escritorio (26 a 30px en móvil) y el símbolo de 54×60 a 72×80px (36×42 a 48×54px en móvil) — ahora sí notoriamente más grande, no un ajuste menor.
- **Encabezado más alto para que quepan las tres líneas:** `--nav` (la variable que define el alto del header y con la que ya se calculaban el offset del header pegajoso y el padding del hero) subió de 92 a 120px en escritorio y de 80 a 96px en móvil. Todo lo que dependía de esa variable se reacomodó solo, sin tocar esas otras reglas.
- **Verificado antes de tocar el sitio real:** se armó una página de prueba aparte, cargando los mismos `style.css`/`design-v2.css`/`glass-industrial.css` de producción, y se renderizó con Chromium en 1440px y 390px de ancho para confirmar que las tres líneas entran bien, que no se corta ni se monta el texto sobre el símbolo, y que el relieve se ve limpio antes de aplicar el cambio al sitio.

## Novedades de la revisión 16b

Kevin encontró el texto que el cliente le había enviado hace tiempo (un documento largo de marca, con misión, visión, valores y una sección titulada "UNA FRASE QUE NOS INSPIRA"). Kevin decidió, con criterio propio, que de todo ese documento el cliente solo pidió puntualmente la frase — el resto (misión, visión extendida, lista completa de servicios, etc.) ya está cubierto de otra forma en el sitio y el cliente no pidió agregarlo.

- **Frase agregada en "Nosotros":** se sumó `frase-v16.css` (capa aditiva, se carga al final de todas) y un `<blockquote class="inspiring-quote">` en `index.html`, entre el texto de "La forma BEGA" y la franja "Seguridad · Eficiencia · Compromiso". Cita textual del documento del cliente, con una sola corrección ortográfica (le faltaba la tilde en "sí"): “El primer paso no te lleva a dónde quieres, pero sí te saca de dónde estás.” — Bryan Trecy.
- **Estilo:** una cursiva grande sobre un borde azul a la izquierda y fondo muy sutil, con la atribución debajo en la tipografía técnica (Consolas) que ya usa el resto del sitio para ese tipo de detalle — no se introdujo ninguna fuente nueva.
- **Qué no se hizo:** no se agregó el resto del documento (misión, visión, lista extendida de servicios y aplicaciones) porque el cliente, según Kevin, solo pidió la frase; si más adelante pide incorporar algo más de ese documento, queda como charla aparte.



## Novedades de la revisión 15

El sitio ya está publicado en GitHub Pages (ver "Preparación de producción" abajo). Kevin lo revisó desde su teléfono real y encontró 9 problemas concretos de legibilidad y uso en móvil. Todo lo siguiente vive en `mobile-fixes-v15.css` (capa aditiva, se carga al final) más cambios puntuales en `index.html`, `app.js`, `equipment-motion.js` y una corrección de una regla en `ajustes-v12.css`. No se tocó el diseño de escritorio salvo donde se indica.

- **Títulos y textos técnicos de sección más grandes:** `eyebrow`, `micro` y la micro-copia bajo cada encabezado ("VERSATILIDAD PARA LLEGAR MÁS LEJOS.", etc.) subieron de tamaño en pantallas de 900 px o menos — algunos estaban en 6.5–9 px, ilegibles en un teléfono real aunque se vieran bien en la emulación de escritorio.
- **Pie de página sin "PROTOTIPO" y con redes más visibles:** se quitó el texto "PROTOTIPO / 01" (el sitio ya no lo es). El correo, WhatsApp, Facebook, Instagram y TikTok ahora llevan una insignia de color con las iniciales de cada red (WA, @, FB, IG, TT) en vez de solo texto plano — reconocibles de un vistazo sin recrear el logotipo real de cada marca. La misma insignia se reutiliza en la sección de contacto y en el menú móvil.
- **WhatsApp/correo de la sección de contacto, ya no se ven mal:** en pantallas angostas se apilan uno debajo del otro (antes competían por el mismo renglón y el correo largo se recortaba visualmente).
- **"Seguridad · Eficiencia · Compromiso" ya no se desborda:** ese renglón (`.values-line`, en "La forma BEGA") no tenía forma de pasar a una segunda línea en pantallas angostas; ahora se envuelve y se centra.
- **Galería sin contador ni "Serie X de Y":** se quitaron "50 FOTOGRAFÍAS" y "Serie 5 de 5 · 49–50 de 50"; quedan solo las flechas para recorrer las series, en escritorio y en móvil.
- **"A cada desafío, una solución." ya se ve en móvil:** esto sí era un error real, no solo de gusto. `ajustes-v12.css` traía una regla de fondo para `.services-stage` sin restricción de ancho de pantalla que, por cargarse después, reemplazaba sin querer el fondo propio que `polish-v9.css` ya tenía pensado para móvil (más oscuro arriba, donde vive el título) — el resultado era un título en tinta oscura sobre un fondo también oscuro en esa zona, prácticamente invisible. Se restringió esa regla de `ajustes-v12.css` a escritorio (901 px o más) y, además, el título de esta sección ahora usa un color claro fijo en móvil, para no depender de en qué punto exacto del degradado de scroll esté el visitante.
- **El equipo animado responde al arrastrar el dedo en el teléfono:** en escritorio, el articulado y la tijera ya seguían al mouse dentro de su tarjeta (revisión 13); en móvil no pasaba nada porque esa interacción se activaba solo con `hover:hover` (mouse/trackpad). Se agregó la misma interacción para pantallas táctiles, activada solo mientras el dedo está presionado sobre el lienzo — fuera de él, el scroll normal de la página no se ve afectado.
- **Menú móvil rediseñado como panel lateral:** antes se desplegaba como una lista simple debajo del encabezado. Ahora es un panel que entra desde la derecha, con fondo propio y borde, cada enlace es un bloque independiente (fondo y borde propios) que entra escalonado uno tras otro al abrir el menú (no todos de golpe), y arriba de los enlaces aparecen el WhatsApp, el correo y las redes — tal como pidió Kevin, no en el hero sino al desplegar el menú. Tocar fuera del panel (la zona oscurecida) lo cierra, igual que antes lo cerraban un enlace o la tecla Escape.
- **Textos pequeños del hero, más grandes:** la frase superior ("SEGURIDAD EN CADA PASO..."), la franja inferior y el botón de "Reducir movimiento" subieron de tamaño en móvil.
- **Hallazgo aparte, sin pedirlo Kevin:** en "La forma BEGA", el título en realidad decía "La seguridad empieza antesde subir." — pegado, sin espacio ni salto de línea — porque el `<br>` entre "antes" y "de subir." resultaba ser, sin buscarlo, el único hijo-elemento de ese `<span>`, y una regla ya existente para ocultar el *último* salto de línea del título en móvil (`.about h2 br:last-child`) también lo alcanzaba a él. Se agregó un espacio de texto real antes de ese `<br>`, así que ahora se lee bien con o sin el salto de línea.
- **Verificado:** Playwright en 390×844 — sin errores de consola, sin 404 tras recorrer los 4 filtros de la galería y todas sus páginas de paginación (con las 50 fotos reales, traídas de la computadora de Kevin para esta prueba), el menú abre y cierra por botón, por enlace y por toque fuera del panel sin quedar inalcanzable, el arrastre táctil simulado sobre el equipo articulado repinta el lienzo, y en 1440×900 (escritorio) el menú, el pie de página y la sección de contacto se comportan exactamente igual que antes de esta revisión.

**Corrección sobre la marcha, pedida por Kevin antes de publicar:** las insignias de color con iniciales (WA, FB, IG, TT, @) se reemplazaron por los logotipos reales de cada red — Kevin descargó los cinco de zonalogo.com (WhatsApp, Facebook, Instagram, TikTok y Gmail para el correo) y los guardó en la carpeta del proyecto; quedaron en `assets/brand/social/` como SVG, con su propio color y forma, sin recortar ni recolorear. Es el uso habitual de estos íconos para enlazar a las cuentas propias del negocio, no una recreación con otro fin. Además, el panel del menú móvil tenía un fondo plano de un solo color que Kevin señaló como "vacío"; ahora usa de fondo la misma fotografía industrial nocturna que ya aparece en la sección de contacto (`assets/photos/nave-nocturna.jpeg`), oscurecida con un degradado para que los bloques del menú se sigan leyendo bien encima.

**Segunda corrección, tras revisar el sitio ya publicado desde el teléfono:** Kevin encontró dos problemas más una vez el sitio quedó en línea.

- **WhatsApp/correo poco visibles en la sección de contacto:** ese bloque vive sobre la fotografía nocturna, pero sus enlaces y el número de WhatsApp en negrita seguían en los tonos oscuros pensados para un fondo claro — casi ilegibles ahí. Se pasaron a un celeste claro (enlaces) y blanco (el número y el correo en negrita), consistente con el resto del texto de esa sección oscura.
- **"Seguridad · Eficiencia · Compromiso" invadía la tarjeta de arriba:** esto no era el mismo problema ya corregido antes (el ajuste anterior evitaba que el renglón se recortara hacia los costados; este es distinto — la tarjeta blanca de "La forma BEGA" terminaba invadiendo el espacio de ese renglón). La causa real: `glass-industrial.css` traía una regla de espaciado (`gap`) para esa cuadrícula sin restricción de ancho de pantalla que, por cargarse después, ganaba por encima de la regla que el propio diseño ya tenía pensada para móvil — sin importar que esa segunda regla fuera justamente la pensada para pantallas angostas (el mismo patrón de error ya encontrado y corregido una vez antes en esta revisión, con el fondo de "A cada desafío"). En una tarjeta tan alta como esa, la diferencia entre ambos valores se traducía en un espacio real casi el doble de grande, lo suficiente para que la tarjeta empujara hacia abajo más de lo previsto e invadiera el renglón de valores. Se acotó esa regla a escritorio y se reforzó el valor correcto en móvil desde `mobile-fixes-v15.css` (que se carga al final de todas). Verificado con medición exacta del espacio entre ambos bloques: antes se superponían 41px, ahora quedan 32px de separación limpia, sin superposición, en escritorio no cambió nada (se comprobó que ahí sigue el espaciado original).

## Novedades de la revisión 14

Kevin envió los datos comerciales reales de BEGA (correo, celular, redes sociales) y la carpeta con el logo vectorizado, para seguir avanzando hacia producción.

- **Correo, WhatsApp y redes en el pie de página:** el pie de página ahora incluye `serviciosgeneralesbega@gmail.com`, el WhatsApp (957 320 345) y enlaces a Facebook, Instagram y TikTok con las URL que envió Kevin. También se agregaron el WhatsApp y el correo, en un formato breve, junto al texto de la sección de contacto (antes solo estaba el formulario).
- **Envío real de la consulta preparada:** hasta la revisión 13, "Preparar mi consulta" solo generaba un resumen que podía copiarse; no había ningún destino. Ahora, junto al resumen, hay dos botones nuevos — "Enviar por WhatsApp" y "Enviar por correo" — que abren WhatsApp o el cliente de correo del usuario con ese mismo texto ya escrito (`wa.me/51957320345?text=…` y `mailto:serviciosgeneralesbega@gmail.com?...`). Sigue sin haber servidor ni almacenamiento: el texto se arma en el dispositivo del visitante y nada se envía hasta que la persona misma presiona uno de esos botones desde su WhatsApp o su correo. Se movió "Copiar texto" a un enlace secundario, porque ahora hay una forma más directa de enviar la consulta.
- **Símbolo más nítido, a partir del archivo que Kevin identificó como "logo vectorizado":** se revisó `Logo BEGA.svg` y `Logo BEGA letras.svg` (carpeta "Logo BEGA" del proyecto). Ninguno de los dos es en realidad un vector escalable: cada uno es una fotografía (dos capas PNG — una a color, una en escala de grises usada como máscara de transparencia — envueltas en una etiqueta SVG con un filtro), la misma técnica de exportación que ya traía `simbolo-bega-alpha.png`. La diferencia es que estas capas están mejor recortadas (sin el borde irregular que tenía la versión anterior) y a mayor resolución. Se reconstruyó la imagen combinando esas dos capas, se recortó a su contenido real y se usó para reemplazar `assets/brand/simbolo-bega-alpha.png` y regenerar los cuatro favicons — mismo símbolo, bordes más limpios. Si más adelante Kevin consigue una versión realmente vectorial (con trazos editables, no una foto incrustada), conviene reemplazar esta fuente de nuevo.
- **Imagen para compartir el enlace (Open Graph):** `Logo BEGA letras.svg` sí incluye el nombre completo ("BEGA / SOLUCIONES GENERALES / TRABAJOS EN ALTURA Y EQUIPOS DE ELEVACIÓN") en la misma composición. Se usó para armar `assets/brand/og-image.png` (1200×630, fondo oscuro de la misma paleta del sitio), y se actualizó `og:image` para usarla en vez del ícono solo.
- **Qué no se hizo:** no se cambió el logo del encabezado del sitio (`.brand-mark`), porque ese ya combina el símbolo con el nombre escrito en HTML/CSS (no una imagen); solo se refinó la imagen del símbolo que ya usaba. Tampoco se conectó ningún envío automático a un servidor: seguir sin backend fue una decisión deliberada del prototipo, no una limitación de esta revisión.

## Novedades de la revisión 13

Kevin generó, con ChatGPT/Astra, los dos kits que se habían quedado pendientes desde la revisión 11 (etapa 4): un elevador articulado anaranjado y una plataforma de tijera roja, cada uno con sus piezas recortadas con transparencia real, pivotes medidos y un motor de pose en JavaScript (`rig-engine.js`) ya probado en un visor propio. Encajan de forma natural en las dos tarjetas de `#equipos` que antes solo mostraban una fotografía fija: "Elevadores articulados" (el anaranjado) y "Plataformas de tijera" (el rojo).

- **Qué se ve ahora:** cada tarjeta conserva su fotografía original como base y, encima, un lienzo (`<canvas>`) dibuja el equipo en piezas sueltas. No es video ni una imagen: se recalcula en el navegador a partir de las mismas funciones de pose que ya traía el visor de cada kit.
- **Los pivotes y ángulos no se reinterpretaron:** `equipment-motion.js` porta literalmente las funciones `pose()` de `rig-engine.js` de ambos kits (mismos orígenes, mismas fórmulas de mezcla entre elevación/extensión/ángulo). Solo se adaptó la carga de imágenes, el ajuste de escala al tamaño real de cada tarjeta y, tras la corrección de Kevin descrita abajo, la interacción.
- **Corrección sobre la marcha, pedida por Kevin tras ver la primera versión:** la primera entrega animaba cada equipo con un recorrido en bucle, en el tiempo, como el que ya traía el "Reproducir" del visor de cada kit — Kevin lo describió como "un video repetitivo" y pidió que, en cambio, el equipo responda a dónde se mueve el mouse: el articulado debía seguir el brazo hacia donde se mueve el mouse, y la tijera debía subir y bajar según el mouse suba o baje. Se quitó por completo el bucle en el tiempo. Ahora, con el puntero dentro de la tarjeta, la posición horizontal controla la extensión del brazo y el ángulo de la canastilla del articulado, y la posición vertical controla la elevación de ambos equipos (arriba = más alto, abajo = más bajo), con una transición suave hacia esa posición. Al salir el mouse de la tarjeta, cada equipo vuelve a una pose de reposo prolija y se detiene — nunca queda animando solo. En pantallas táctiles, sin mouse, el equipo se muestra fijo en esa misma pose de reposo (mismo criterio que ya usan los logos de clientes, cuyo efecto de hover también se reserva a mouse/trackpad).
- **Equipos más grandes:** también a pedido de Kevin, la tarjeta de fotografía crece de `clamp(320px,29vw,430px)` a `clamp(420px,36vw,560px)` en escritorio (460px en móvil, antes 340px), y el equipo ilustrado ocupa el 99% de ese espacio disponible dentro del lienzo (antes 94%).
- **Nunca se rompe si algo falla:** la fotografía sigue en el DOM debajo del lienzo y solo se atenúa cuando el lienzo confirma que ya dibujó un cuadro completo (clase `equipos-ready`, añadida por JavaScript). Si una imagen de pieza no carga, la tarjeta se ve exactamente igual que en la revisión 12.
- **Movimiento reducido:** con `prefers-reduced-motion: reduce` la posición del mouse se sigue aplicando (es una interacción, no una animación automática), pero sin la transición suave: la pose salta directo a la posición del puntero.
- **Piezas comprimidas para la web:** los 22 PNG (12 del articulado, 10 de la tijera) se recomprimieron con pngquant sin perder el canal alfa, de 2.2 MB a 676 KB en total.
- **Qué no se hizo:** no se tocaron `animation.js` ni la grúa azul de hero/servicios/contacto; esa coreografía scroll-a-scroll es un sistema aparte y sigue igual. Tampoco se agregó el despiece/exploded view de cada kit ni su selector de piezas — eso queda en las carpetas originales de Kevin como herramienta de revisión, no como parte del sitio público.

## Repaso general tras la revisión 13

Kevin pidió revisar todo el sitio de nuevo antes de seguir. Se probaron en Playwright, en escritorio y móvil: los 6 enlaces del menú, las 7 secciones, los 6 filtros de la galería, el modal de fotografías, los dos equipos animados de `#equipos`, las tres grúas de canvas (hero/servicios/contacto), el formulario de consulta (llenado, resumen generado, 203 caracteres), el menú móvil y que ninguna imagen quede sin atributo `alt`. Los 32 chequeos pasaron.

De paso apareció un hallazgo real, sin relación con lo pedido: cinco fotografías del lote original (`06_07_manlift_azul_en_interior_01.jpeg`, `06_08_manlift_azul_en_interior_02.jpeg`, `07_04_instalacion_de_cubierta_01.jpeg`, `07_05_instalacion_de_cubierta_02.jpeg`, `07_07_instalacion_de_cubierta_03.jpeg`) nunca se habían redimensionado desde la resolución original de cámara (3024–4160 px de lado, 0.9–1.6 MB cada una) — todas las demás sí bajan a 1200–1600 px de lado, entre 90 y 270 KB. Se redimensionaron al mismo criterio que el resto (1200×1600 las dos verticales, 1600×1200 las tres horizontales) y se recomprimieron a calidad 86, quedando entre 280 y 490 KB. En total, esas cinco pasan de 6.1 MB a 1.9 MB sin cambiar cómo se ven en la galería. De paso se corrigieron sus atributos `width`/`height` en `index.html`: las tres horizontales (07_04, 07_05, 07_07) declaraban 1200×1600 (proporción vertical) cuando en realidad son fotos horizontales de 4:3 — un dato incorrecto heredado, sin efecto visible porque la cuadrícula ya fuerza su propio tamaño con `object-fit: cover`, pero incorrecto igual.

**Corrección sobre lo dicho antes de esas tres fotos horizontales:** se había afirmado que perdían contenido de los costados al entrar en la cuadrícula — es incorrecto. La casilla real (`.wall-active .project-photo img`, la regla que efectivamente se aplica) mide unos 407×260 px, una proporción ancha (~1.57:1), no vertical. Contra esa casilla ancha, las tres fotos horizontales (1600×1200, ~1.33:1) se recortan muy poco — casi toda la escena queda visible, solo se recorta una franja angosta arriba — mientras que las fotos verticales del resto de la galería (1200×1600, 0.75:1) son las que pierden bastante más, arriba y abajo, para llenar esa misma casilla ancha (comprobado renderizando el recorte real de una y otra: la vertical queda muy cerrada, casi un primer plano; la horizontal se ve casi completa). No hace falta recortar nada — quedan como están.

`assets/photo-inventory.json` no se tocó: su campo `sha256` registra el archivo original que Kevin subió, no la copia publicada, así que sigue siendo válido después de este recomprimido.

## Novedades de la revisión 12

Pedido del usuario, tras revisar la revisión 10/11 en su propia pantalla: en la sección de clientes, seis de los ocho logos se veían pequeños y el de Arca Continental Lindley conservaba su fondo blanco; y en la sección de servicios, el fondo fotográfico no dejaba notar bien la animación de la grúa y el texto técnico ("01 / ...", "Encuentra tu equipo") se veía muy pequeño.

- **Logos a tamaño consistente según su propia forma:** antes, `.client-logo img` solo limitaba la altura a 56 px; un logo apaisado como Proycon o Booster llenaba casi toda la tarjeta, pero uno más cuadrado como Lindley, BRA o CAM terminaba mucho más chico al usar esa misma altura. Ahora la imagen ocupa el ancho completo de la tarjeta y el alto disponible tras el padding (`width:100%; height:96px` en escritorio, con sus equivalentes en las respuestas de 900 y 680 px), y `object-fit: contain` decide solo, según la proporción de cada logo, si el límite es el ancho o el alto. Resultado: los ocho se ven igual de grandes dentro de su tarjeta, sin deformarse.
- **Fondo blanco de Arca Continental Lindley, eliminado:** el archivo que envió Kevin traía un cuadro blanco opaco alrededor del logo (a diferencia de los otros siete, que ya venían con fondo transparente). Se separó el logotipo de ese fondo y se recortó de nuevo al contenido real; ahora se integra con la tarjeta de vidrio igual que el resto.
- **Fondo de servicios más oscuro:** el degradado sobre `estructura-metalica.jpeg` pasó de un máximo de opacidad .22 a .58 del lado donde aparece la grúa (`ajustes-v12.css`, que se carga al final y sustituye solo esta regla de `polish-v9.css`). La ilustración de la plataforma azul ahora se distingue con claridad sobre la fotografía en vez de competir visualmente con ella. Verificado en un fotograma intermedio de la animación (no solo en el primer instante, donde la grúa recién entra y aún no es el punto de comparación relevante).
- **Texto técnico más grande en escritorio:** `.eyebrow` (10→12.5px), `.micro` (9→11.5px), el enlace `.services-bottom` ("Encuentra tu equipo", 9→11.5px) y el pie del equipo de servicios (9→11px) suben de tamaño únicamente en pantallas de 901 px o más; los tamaños compactos ya afinados para tablet y móvil en las revisiones 08/09 quedan intactos (comprobado con el tamaño de fuente calculado en ambos anchos).
- **Corrección sobre la marcha: el "01 / NUESTRAS SOLUCIONES" quedó ilegible.** Al oscurecer el fondo de servicios, el eyebrow —pensado en tinta oscura para el fondo claro que tenía antes— quedó oscuro sobre oscuro. Kevin lo señaló y pidió además un poco más de neblina en esa zona. Se subió la opacidad del degradado (.58→.66 del lado de la grúa) y, solo dentro de `.services-stage`, el eyebrow y el micro del encabezado ahora viven sobre su propia franja oscura de ancho fijo (no la fotografía variable de fondo) con texto claro, igual que ya hace el eyebrow del hero — así se lee sin importar qué haya detrás en la foto. El resto de "eyebrow"/"micro" del sitio, sobre fondos claros, no cambia.

## Novedades de la revisión 11

Pedido del usuario: incorporar fotos nuevas al muro de proyectos — tres de personal en campo y una del equipo JLG. No se tocó ninguna capa CSS ni JS; solo se agregaron cuatro `<figure>` al final de `#gallery` en `index.html`, sus archivos en `assets/photos/archive/` y sus entradas en `assets/photo-inventory.json`. Los filtros, el contador y la paginación de la galería se recalculan solos en `app.js` a partir del número real de fotos en el DOM, así que no hizo falta tocar ese archivo.

- **Tres fotos de personal**, agregadas como 47–49: `03_06_operario_asegurando_conexion_de_estructura_metalica.jpeg` (operario con EPP asegurando una conexión de estructura metálica), `03_07_soldador_en_plataforma_azul.jpeg` (soldador trabajando desde una plataforma azul) y `03_08_operario_en_plataforma_dentro_de_nave_en_construccion.jpeg` (toma amplia de una nave en construcción con un operario en plataforma azul).
- **Una foto de equipo JLG**, agregada como 50: `04_09_plataforma_jlg_en_estructura_metalica.jpeg`, categoría "Equipos y logística" — muestra una plataforma articulada de marca JLG con el brazo extendido dentro de una estructura metálica en obra.
- **El muro pasa de 46 a 50 fotografías.** Verificado en vivo: "Todas" cuenta 50, el filtro "Personal y seguridad" cuenta 8 y "Equipos y logística" cuenta 7; las cuatro fotos nuevas aparecen correctamente en su categoría y se abren en el visor a tamaño completo igual que el resto.
- **Las fotos llegaron directamente de Kevin**, fuera del lote original de 60 fotos documentado desde la revisión 05 (`assets/photo-inventory.json`); se agregaron con una nota aclaratoria en cada entrada del inventario en vez de mezclarlas con el origen del lote original.
- **Sobre la foto del JLG:** es una fotografía documental para la galería, no un conjunto de piezas (sprites) separables. La animación por Canvas de equipos (hero, servicios, contacto) necesita el equipo descompuesto en piezas con pivotes medidos, como las que ya existen en `assets/machine/`; para animar el JLG (o un elevador) de la misma forma hace falta ese tipo de recurso, no una foto de campo — sigue pendiente como charla aparte (etapa 4).

## Novedades de la revisión 10

Pedido del usuario: agregar una sección de clientes con 8 empresas dadas por RUC y razón social, con sus logotipos a un mismo tamaño. Todo lo nuevo vive en `clients-v10.css`, más una nueva sección `#clientes` en `index.html` (entre "Nosotros" y "Contacto", que pasa de eyebrow 05 a 06), sus 8 imágenes en `assets/clients/`, y un enlace "Clientes" en el menú. No se tocó ninguna capa CSS ni JS anterior.

- **Investigación por RUC (primer intento):** se verificaron los ocho registros contra fuentes públicas (datosperu.org y sitios oficiales). Solo dos coincidían con marcas con sitio propio localizable (Arca Continental Lindley y Saint-Gobain); para las otras seis no se encontró un logotipo público, y el entorno de trabajo tampoco pudo descargar ninguna imagen externa por bloqueos de red propios del entorno en la nube. Ese intento se documentó y se entregó una versión intermedia con tarjetas de marcador de posición (nombre de la empresa en tipografía técnica) mientras se resolvía.
- **Logos definitivos, enviados directamente por Kevin:** Kevin envió los 8 archivos de logo oficiales. Se recortaron al contenido real (se quitó el margen blanco sobrante de cada imagen) y, en los casos con fondo blanco opaco en vez de transparente, se separó el logotipo del fondo para que combine con la tarjeta de vidrio. Los ocho quedan en `assets/clients/`: `grupo-proycon.png`, `ares-service.png`, `cam-soluciones.png`, `arca-continental-lindley.png`, `gyf-construcciones.png`, `booster-group.png`, `saint-gobain.png`, `fabricaciones-bra.png`.
- **Ajuste de contraste en el logo de CAM Soluciones Industriales:** el archivo original traía el texto "CAM SOLUCIONES INDUSTRIALES" en blanco/gris muy claro, pensado para un fondo oscuro; sobre la tarjeta clara del sitio resultaba invisible. Se recoloreó únicamente el texto (y el aro del ícono) a la tinta oscura del sitio, conservando intactos el amarillo, negro y azul del ícono de gancho — incluido el mismo tratamiento de escala de grises/color al pasar el cursor que reciben los demás logos. El resto de los 7 logos se usa tal como fue enviado.
- **Tamaño uniforme sin deformar ningún logo:** cada tarjeta `.client-logo` mide siempre lo mismo (132 px de alto en escritorio, menos en móvil); dentro, cada imagen se limita a una altura máxima de 56 px con `object-fit: contain`, así que los ocho logotipos —sin importar su proporción original— aparecen a la misma escala relativa, nunca uno más grande que otro.
- **Tratamiento visual tipo "muro de confianza":** los logos se muestran en escala de grises y recuperan su color al pasar el cursor (equipos con puntero fino; en móvil se mantienen en gris, coherente con el resto del sitio donde los efectos de hover están reservados a mouse/trackpad).

## Novedades de la revisión 09

Pedido del usuario: revisar el avance del proyecto, y mejorar animaciones e interacción sin rehacer el rig, además de unificar la identidad visual entre escritorio y móvil ("el diseño es muy diferente en pc que en el celular"). Todo lo siguiente vive en `polish-v9.css` y `polish.js`, capas aditivas que no modifican `style.css`, `design-v2.css`, `glass-industrial.css`, `refinements-v6.css`, `mobile-v8.css`, `animation.js` ni `visuals.js`.

- **Transiciones donde antes había saltos:** botones, enlaces, subrayado de navegación, filtros de galería, pestañas y campos de formulario cambiaban de color o posición de forma instantánea. Ahora usan una curva de easing consistente (`cubic-bezier(.4,0,.2,1)`), y los botones principales tienen una elevación sutil al pasar el cursor.
- **Recorrido suave entre capítulos:** los enlaces del menú y los accesos directos (`app.js`) ya no saltan de golpe entre secciones; usan scroll suave salvo que el usuario haya pedido reducir el movimiento, en cuyo caso se mantiene el salto instantáneo.
- **Señales de vida discretas:** la flecha de "desplázate", el punto del eyebrow y la mira del hero tienen una animación lenta y sutil (2.4–3.2 s), siempre desactivada con `prefers-reduced-motion: reduce`.
- **Cifras que cuentan al entrar en vista:** las alturas de equipos (16 m, 8/12 m) cuentan desde cero la primera vez que la tarjeta entra en pantalla (`polish.js`, con `IntersectionObserver`); se omite por completo con movimiento reducido.
- **Inclinación por cursor:** las tarjetas de equipos y de "La forma BEGA" responden con una leve inclinación 3D al mouse, solo en dispositivos con puntero fino (nunca táctil).
- **Identidad visual coherente en móvil:** el índice de capítulo ("01 — ALCANZAR"), la franja de valores (Seguridad · Eficiencia · Compromiso) y la etiqueta de la máquina del hero ya no desaparecen por debajo de 900–1100 px; se reacomodan en versión compacta en vez de ocultarse. La micro-copia bajo cada encabezado de sección hace lo mismo en móvil.
- **Fondo de servicios recuperado:** la fotografía `estructura-metalica.jpeg` estaba casi lavada por el degradado claro; se ajustó el degradado para que la fotografía se note sin perder legibilidad sobre la tarjeta de vidrio, en escritorio y en móvil.
- **Contacto en tablets (681–1099 px):** se probó extender la guía del brazo a ese rango intermedio (antes mostraba una caja estática entre el escritorio ancho y el teléfono). Kevin revisó la captura y pidió mantener el contacto de escritorio como estaba antes de la revisión 09; se revirtió por completo (`contact-focus.js` y `polish-v9.css` vuelven al comportamiento original en ese rango) hasta decidir junto con la sección de clientes y las fotos nuevas si vale la pena retomarlo.

Pendiente de revisión con Kevin antes de continuar: animación de dos equipos nuevos (JLG y un elevador; requiere sprites/piezas separadas por generar, distintos de una foto documental). La sección de clientes (revisión 10) y las primeras fotos nuevas (revisión 11: 3 de personal + 1 de equipo JLG) quedaron completas.

## Novedades de la revisión 08

- Móviles en vertical conservan montaje, entrada/salida, giro de ruedas y revelado por scroll. Se usan los mismos sprites, pivotes y curvas de movimiento de escritorio. Hero y servicios se apilan sin superponer títulos y maquinaria; el recorrido se adapta a 250/260 svh. En pantallas más bajas que la escena, el anclaje negativo permite recorrer también el comienzo de su contenido.
- Galería táctil con dos columnas animadas hasta 680 px, tres en tablet/escritorio, filtros desplazables horizontalmente, visor al tocar y alternativa «Ver cuadrícula». La serie actual de hasta doce fotos empieza a cargar al acercarse a la galería; no se cargan las 46 de golpe.
- Contacto móvil: el equipo ocupa una zona propia al comienzo del formulario, con base fija y pose del brazo dependiente del campo seleccionado. No se intenta extenderlo sobre las entradas ni seguir el mouse. En campos inferiores puede quedar fuera de pantalla al desplazarse; no flota sobre el teclado ni bloquea el texto. Campos de 16 px y botones de al menos 44 px para uso táctil.
- Movimiento reducido y elección manual conservan alternativas estáticas; pantallas con altura de 500 px o menos (por ejemplo horizontal) también. Sin JavaScript se mantiene el contenido completo.
- `visuals.js` cambia para permitir el muro móvil y precargar la serie próxima. Las fórmulas de movimiento de escritorio se conservan; las pruebas verifican reversibilidad en ambos formatos. El SHA-256 de QA registra esta nueva revisión, no la identidad con la versión 05.
- Verificado en emulación táctil a 320, 360, 390, 430 y 820 px, además de las pruebas de escritorio: montaje reversible, muro reversible, visor táctil, foco del formulario, base fija, reducción de movimiento y ausencia de desbordamiento horizontal. Informe en `qa/mobile-verification.json`. Falta validación en teléfonos físicos, Safari iOS y teclado real.

## Novedades de la revisión 07

- Ruedas independientes en Canvas: dos máscaras elípticas medidas sobre `base.png` separan neumáticos y chasis en memoria, sin modificar ni generar archivos de piezas. El dibujo original de llantas y neumáticos rota según distancia horizontal / radio. El espejo de servicios invierte automáticamente la dirección visible. Giro determinista y reversible, sin bucles automáticos.
- En contacto la base anclada tiene recorrido de rueda cero aunque se mueva el brazo. En alternativas estáticas tampoco giran. Las pruebas comparan la textura de la rueda en entradas de hero/servicios y al volver al mismo progreso.
- Verde oscuro `#167348` y hover `#105c39` en botones, con texto blanco. Los acentos de texto sobre azul oscuro mantienen un tono claro para legibilidad.
- Propuestas pendientes: Barlow Condensed + Manrope (industrial), Space Grotesk + Manrope (tecnológica), Manrope en distintos pesos (sobria). Fuentes primarias: https://github.com/jpt/barlow, https://github.com/floriankarsten/space-grotesk, https://github.com/google/fonts/tree/main/ofl/manrope. No se descargan ni se cambia la tipografía de la web hasta elegir; se alojarán localmente con sus licencias si se aprueba.

## Novedades de la revisión 06

- Botones principales, filtros seleccionados y controles de fotografía en verde, con texto oscuro; no se recolorean las fotos ni las piezas originales.
- Las dos fotos de equipos se muestran completas con `object-fit: contain` en zonas de 320–430 px de alto. Los márgenes laterales evitan cortar la base o la canastilla.
- Plataforma del hero un 12 % mayor dentro de un escenario ampliado, conservando la secuencia de montaje, salida y reversibilidad.
- Contacto en escritorio amplio: título sobre dos columnas, máquina grande a la izquierda y formulario a la derecha. Base anclada en coordenadas constantes; solo giran los brazos y se extiende el telescopio. El objetivo depende del campo enfocado o del mouse dentro del formulario, con alcance limitado a la zona reservada para la máquina. Una línea llega al borde del campo sin cubrir lo que se escribe. Es una representación ilustrativa, no un modelo mecánico certificado.
- Móvil, pantallas compactas y movimiento reducido conservan una pose estática y resaltado del campo. Las 46 fotos y la coreografía del muro no cambian.
- QA comprueba posición fija de base y contenedor entre cinco campos y dos posiciones de mouse, incluso durante la transición; también colores verdes y fotos completas.

## Novedades de la revisión 05

- **46 de 57 fotografías documentales:** el lote original tiene 60 JPEG, de los cuales tres son de identidad. Se publican las 46 fotos sin marcas digitales superpuestas. Once quedan excluidas por fechas, marcas de agua o rótulos digitales, no por la presencia de operarios. Los originales no se eliminan. El inventario indica cada exclusión; para incluirlas se requieren versiones limpias o una nueva decisión del cliente sobre las marcas.
- **Archivo en series:** cinco categorías (construcción, industria, fachadas/comercio, equipos/logística y personal/seguridad), además de «Todas». Máximo doce fotos por serie, cuatro series en total. Las flechas junto al contador recorren todas. La cuadrícula usa la misma paginación; sin JavaScript aparecen las 46 fotografías en flujo normal. Carga diferida y visor a tamaño completo. Algunas tomas son similares, pero no se encontraron duplicados binarios en las 46 publicadas.
- **Guía de foco original:** la revisión 05 desplazaba el conjunto verticalmente. Ese comportamiento queda sustituido en la revisión 06 por base fija y articulaciones dirigidas por clic, Tab o mouse. No accede a los valores escritos ni al cursor interno del texto.
- **Símbolo sin fondo:** `assets/brand/simbolo-bega-alpha.png`, editado con la herramienta integrada ImageGen, sustituye al JPEG en la navegación. RGBA verificado, alfa de 0 a 255 y 955689 píxeles completamente transparentes. Se conserva el original. Al ser un recorte mediante edición generativa, debe validarse con el archivo maestro de marca antes de publicar; no equivale a una vectorización exacta. Prompt y procedencia en `assets/brand/PROMPT_RECORTE.md`.

## Recorrido

En escritorio amplio, el hero ocupa 270 svh, servicios 235 svh y el muro de proyectos 270 svh. Las escenas se fijan durante su recorrido; el contenido restante fluye normalmente. Los accesos del menú y los CTA permiten saltar entre capítulos sin recorrer toda la animación. «Ver cuadrícula» desactiva el muro fijado y presenta las fotos en flujo normal.

| Escena | Progreso | Comportamiento |
|---|---|---|
| Hero | 0–17% | El equipo llega desde el borde derecho; parte del conjunto ya es visible al abrir para anticipar la experiencia. |
| Hero | 8–34% | Los componentes se acercan a sus anclajes y forman el conjunto. |
| Hero | 30–61% | La canastilla guía un trazo bajo el titular, que se completa en azul. |
| Hero | 75–100% | Retracción, repliegue y salida completa por la derecha. |
| Servicios | 0–22% | El equipo reaparece desde fuera del borde izquierdo, a menor tamaño. |
| Servicios | 23–55% | El trazo enlaza la canastilla con el título. |
| Servicios | 38–70% | Tres filas de servicios adquieren su énfasis final. |
| Introducción | Durante el paso | Abanico de tres fotos documentales con entrada en profundidad y apertura al acercar el cursor. |
| Equipos / seguridad | Durante el paso | Paneles y contenido adquieren posición y opacidad final progresivamente. |
| Proyectos | 0–100% | Muro con perspectiva cambiante, tres columnas en sentidos opuestos, respuesta al cursor y realce de la foto señalada. |
| Contacto | Foco / mouse | En escritorio amplio la base permanece fija; brazo y telescopio acompañan al campo activo o al mouse dentro del formulario. |

No hay un vídeo reproduciéndose detrás del scroll, temporizadores de animación, inercia ni reproducción automática. Las poses y desplazamientos dependen de la posición actual, por lo que el recorrido se invierte al subir. La perspectiva también responde al cursor; las transiciones breves de hover son interacciones, no una reproducción de fondo. Canvas y muro solicitan fotogramas solo ante cambios relevantes. El telescopio queda recortado en la entrada de su camisa. La canastilla mantiene su orientación horizontal.

El rig es una representación ilustrativa 2D, no una reconstrucción mecánica certificada. Conserva algunas simplificaciones de cables y recortes del recurso suministrado. Desde la revisión 07 las ruedas se separan mediante máscaras en memoria y giran independientemente del chasis. No se utilizó el cilindro auxiliar para evitar duplicarlo; ya aparece en los brazos.

## Accesibilidad y responsive

- Desde la revisión 08 el móvil vertical mantiene animación. Con altura de pantalla de 500 px o menos se utiliza flujo normal con máquina estática.
- El muro de proyectos mantiene movimiento en móvil y tablet; pasa a flujo normal con movimiento reducido, modo cuadrícula o altura de 500 px o menos. Los filtros y la ampliación siguen disponibles.
- Se puede elegir cuadrícula en escritorio. Al navegar por teclado hacia una fotografía se activa esa vista para evitar enlaces fuera de la zona visible.
- `prefers-reduced-motion: reduce` y “Reducir movimiento” muestran contenido completo y detienen el desplazamiento de la galería.
- Sin JavaScript se conservan titulares, servicios, equipos, fotografías, enlaces y detalles desplegables; aparece el fotograma estático. Los filtros y el generador local de consulta no aparecen.
- Sin carga de las piezas no se activa la secuencia sticky: el contenido sigue accesible.
- El menú móvil, los enlaces, el modal y los formularios admiten teclado. Escape cierra el menú o el modal; al cerrar una foto se devuelve el foco al enlace que la abrió.
- El texto nunca se dibuja dentro de Canvas. Los títulos conservan su semántica y las áreas de maquinaria y lectura están separadas.

## Contacto

La guía de foco usa una transición de 300 ms al seleccionar otro campo o mover el mouse y deja de solicitar fotogramas al terminar. Es independiente de las animaciones de scroll; no introduce reproducción automática. En móvil responde al campo seleccionado; con movimiento reducido no realiza esa transición.

Desde la revisión 14 se cuenta con el correo, el celular y las redes sociales reales de BEGA (ver esa sección). "Preparar mi consulta" sigue generando el resumen únicamente en memoria en el dispositivo — no hay servidor ni almacenamiento — pero ahora puede enviarse por WhatsApp o correo con un botón, además de copiarse. Si el navegador no permite el portapapeles, el texto se selecciona para copiarlo manualmente. La página informa de esta condición antes de preparar la consulta.

Antes de publicar se deben confirmar contacto comercial, canal de envío, identidad final y especificaciones de cada modelo. La página incluye `noindex, nofollow` porque es un prototipo.

## Verificación

`qa/verification.json` registra las pruebas ejecutadas y la fecha. Se revisan carga del logo y fotos, eliminación del recuadro del hero, enlaces locales, filtros, cambio a cuadrícula, modal, formulario, menú móvil, reversibilidad del hero y del muro, separación de texto/maquinaria, movimiento reducido y lectura sin JavaScript. Se incluyen capturas de escritorio y de anchos 820, 390 y 320 px, además de estados del muro al 20% y 80%. La revisión se hizo en Chrome; otros navegadores y teléfonos físicos quedan para la fase de validación previa al lanzamiento.

La revisión Glass añade comprobación de estilo, desenfoque desactivado en móvil y escritorio bajo (1366 × 768), verificando que el pie de servicios no quede recortado. La revisión 05 comprueba que las 46 fotos sean alcanzables entre las cuatro series y que cinco campos produzcan poses distintas, con la canastilla alineada verticalmente al foco.

Los scripts en `qa/` utilizan las herramientas disponibles en este equipo y contienen sus rutas locales; no son dependencias de la web. La carpeta de producción es autónoma sin esos scripts.

## Próxima fase

1. Revisar con BEGA el ritmo del hero y la selección fotográfica.
2. ~~Confirmar contacto~~ Resuelto en la revisión 14 (correo, WhatsApp y redes). Quedan pendientes los modelos específicos y fichas técnicas de cada equipo, y una versión realmente vectorial del logo (ver revisión 14) para producción; ninguno de los dos impide revisar este prototipo.
3. Ampliar y optimizar la galería con los originales aprobados; las fotografías actuales se conservan sin edición y cargan de forma diferida.
4. ~~Si se incorpora el elevador anaranjado, preparar primero su rig y revisar la coherencia de las piezas.~~ Resuelto en la revisión 13, junto con la plataforma de tijera roja.
5. ~~Conectar el canal comercial~~ Resuelto en la revisión 14. ~~Crear el repositorio de GitHub y desplegar una prueba~~ Resuelto: el sitio está en línea en `https://kevin05x.github.io/bega-web/`. ~~Revisar en un teléfono real~~ Resuelto en la revisión 15 (9 correcciones de legibilidad y uso en móvil). Queda: revisar SEO/privacidad, comprar y conectar el dominio propio, y revisar en más navegadores/dispositivos reales.
