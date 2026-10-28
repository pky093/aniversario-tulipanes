# 🌷 Nuestro Jardín de Tulipanes — 1 Año y 6 Meses (18 Meses)

Proyecto web interactivo diseñado con estética editorial romántica (**Rosa Pastel, Rubor y Crema**), listo para desplegar en **Vercel**.

## ✨ Qué incluye

1. **Ramo de Tulipanes Interactivo & Pétalos Flotantes**:
   - Portada editorial con ramo de tulipanes ilustrados en SVG que se mecen suavemente y lluvia de pétalos en tiempo real (`PetalCanvas`).
2. **El Jardín de los 18 Tulipanes (`src/components/TulipGarden.jsx`)**:
   - **1 tulipán por cada uno de sus 18 meses juntos**.
   - Al tocar cada tulipán, el capullo **florece con una animación de pétalos** y abre una carta botánica con el recuerdo y la promesa de ese mes.
3. **Galería Polaroid 3D (`src/components/Gallery3D.jsx`)**:
   - **Modo Carrusel 3D Giratorio**: Anillo en perspectiva 3D con auto-giro y controles interactivos.
   - **Modo Mesa de Polaroids 3D**: Efecto de inclinación (`tilt`) en 3D y reflejo de luz dinámico al mover el cursor.
   - **Reverso Secreto 180°**: Al hacer clic en cualquier Polaroid, gira `180°` en 3D para revelar la nota escrita a mano detrás de la fotografía.
   - **Subir tus Fotos en Vivo**: Botón integrado para probar tus propias fotos al instante o colocándolas en la carpeta `public/fotos/`.

---

## 🛠️ Cómo personalizar tus fotos y mensajes

Todo el contenido editable está centralizado en un solo archivo:
- [`src/data/anniversaryData.js`](./src/data/anniversaryData.js)
  - **`coupleInfo`**: Cambia `"Mi Amor"` por su nombre y personaliza la frase principal.
  - **`tulips18`**: Edita cualquiera de los 18 mensajes o promesas de cada mes.
  - **`defaultMemories3D`**: Pon tus propias fotos (por ejemplo, guarda tus imágenes en `public/fotos/foto1.jpg` y pon `image: '/fotos/foto1.jpg'`).

---

## 🚀 Cómo desplegar en Vercel

### Opción A: Con la terminal (Más rápido)
```bash
cd aniversario-tulipanes
npx vercel
```

### Opción B: Desde GitHub / Web de Vercel
1. Sube la carpeta `aniversario-tulipanes` a un repositorio de GitHub.
2. Entra a [vercel.com/new](https://vercel.com/new) e importa el repositorio.
3. Vercel detectará **Vite** automáticamente (`npm run build` / directorio `dist`). Haz clic en **Deploy** y obtendrás tu link listo para enviárselo.
