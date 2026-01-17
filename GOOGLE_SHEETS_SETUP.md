# Configuración de Google Sheets para tu Portfolio

Este documento te guiará paso a paso para conectar tu portfolio con Google Sheets.

## Paso 1: Crear tu Google Sheet

1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja de cálculo
3. Nómbrala "Portfolio Videos" (o como prefieras)

## Paso 2: Configurar las columnas

En la primera fila (fila 1), crea estos encabezados:

| A | B | C | D | E | F | G | H | I |
|---|---|---|---|---|---|---|---|---|
| **Video URL** | **Title** | **Description** | **Client** | **Tags** | **Aspect Ratio** | **Thumbnail URL** | **Timeline Image URL** | **Software** |

### Descripción de cada columna:

- **A - Video URL**: URL completa del video (YouTube, Instagram, TikTok, Vimeo)
  - Ejemplo: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`

- **B - Title**: Título del proyecto
  - Ejemplo: `Nike Air Max Campaign`

- **C - Description**: Descripción breve del proyecto
  - Ejemplo: `Dynamic product showcase with urban storytelling`

- **D - Client**: Nombre del cliente (opcional)
  - Ejemplo: `Nike`

- **E - Tags**: Tags separados por comas (usa: Gaming, Finance, Social Media, Podcast, Brand, Entertainment, Explainer, Ads)
  - Ejemplo: `Gaming, Entertainment`

- **F - Aspect Ratio**: `16:9` o `9:16`
  - YouTube horizontal: `16:9`
  - Instagram Reels/TikTok: `9:16`

- **G - Thumbnail URL**: URL de la imagen thumbnail
  - Puedes usar el thumbnail automático de YouTube
  - O subir tu propia imagen a Imgur, Google Drive (público), etc.
  - Ejemplo: `https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg`

- **H - Timeline Image URL**: URL de la imagen del timeline (opcional)
  - Sube la imagen del timeline a Imgur, Drive, etc.

- **I - Software**: Programas usados, separados por comas
  - Opciones: `Premiere Pro`, `After Effects`, `Final Cut Pro`, `DaVinci Resolve`, `Motion`, `Photoshop`, `Illustrator`
  - Ejemplo: `Premiere Pro, After Effects`

## Paso 3: Añadir tus videos

Empieza a llenar desde la fila 2 hacia abajo. Cada fila = 1 video.

**Ejemplo de fila completa:**
```
https://www.youtube.com/watch?v=abc123 | JoshDub Compilation #4 | High-energy gaming montage with custom effects | JoshDub | Gaming, Entertainment | 16:9 | https://img.youtube.com/vi/abc123/maxresdefault.jpg | https://i.imgur.com/timeline.png | Premiere Pro, After Effects
```

## Paso 4: Hacer el Sheet público

1. Click en el botón **"Compartir"** (arriba a la derecha)
2. Click en **"Cambiar a cualquier persona con el enlace"**
3. Asegúrate que diga **"Lector"** (no "Editor")
4. Copia el ID del Sheet desde la URL
   - URL: `https://docs.google.com/spreadsheets/d/1ABC123xyz/edit`
   - ID: `1ABC123xyz`

## Paso 5: Obtener Google API Key

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto (o usa uno existente)
3. Ve a **"APIs & Services"** → **"Credentials"**
4. Click en **"+ CREATE CREDENTIALS"** → **"API key"**
5. Copia la API key
6. Click en **"Restrict Key"**
7. En **"API restrictions"**, selecciona **"Restrict key"**
8. Marca solo **"Google Sheets API"**
9. Guarda

## Paso 6: Configurar variables de entorno

1. En la carpeta de tu proyecto, crea un archivo `.env.local`
2. Copia el contenido de `.env.local.example`
3. Reemplaza con tus valores:

```env
NEXT_PUBLIC_GOOGLE_SHEET_ID=1ABC123xyz
NEXT_PUBLIC_GOOGLE_API_KEY=AIzaSy...tu_api_key
```

## Paso 7: Reiniciar el servidor

```bash
# Detén el servidor (Ctrl+C)
# Luego reinicia:
npm run dev
```

## ¡Listo! 🎉

Ahora cada vez que añadas una nueva fila a tu Google Sheet, el video aparecerá automáticamente en tu portfolio (puede tomar hasta 60 segundos por el caché).

---

## Cómo obtener Thumbnail de YouTube automáticamente

Para videos de YouTube, puedes usar este formato para el thumbnail:

```
https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg
```

Donde `VIDEO_ID` es el código del video.

Ejemplo:
- Video: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- Thumbnail: `https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg`

## Troubleshooting

### Los videos no aparecen
- Verifica que el Sheet sea público
- Verifica que el SHEET_ID sea correcto
- Verifica que la API key esté activa
- Revisa la consola del navegador para errores

### "API key not valid"
- Asegúrate de haber habilitado Google Sheets API
- Verifica que la API key esté correctamente restringida

### Videos aparecen pero sin thumbnails
- Verifica que las URLs de thumbnails sean públicas
- Para YouTube, usa el formato: `https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg`
