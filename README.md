# KodiGo-website

**Esta web es la página del siguiente proyecto: [Kodigo](https://github.com/MaiteVazquez8/KodiGo).**

Kodigo es una plataforma educativa interactiva para aprender a programar desde cero: cursos, unidades, lecciones y actividades con corrección al instante, XP, rachas, logros y un camino de pensamiento lógico con **Kodigo Robot**.

Código de la aplicación (Vue + Vite + Capacitor): **<https://github.com/MaiteVazquez8/KodiGo>**
Este repositorio contiene su página web oficial (landing + tutorial de descarga del APK).

## Páginas

- `index.html` — landing principal (qué es Kodigo, cómo funciona, funcionalidades, galería, beneficios, CTA).
- `descarga.html` — tutorial para descargar e instalar el APK oficial de Kodigo (Android), con SHA-256 del archivo y explicación sobre el aviso de Play Protect.

## Archivos

- `css/styles.css` — hoja de estilos única (identidad Kodigo: negro #000000, violeta #700B97, púrpura #8E05C2).
- `js/main.js` — interacciones vanilla (navbar sticky, menú móvil, scroll-spy, galería con lightbox, botones «Copiar»).
- `js/lucide-lite.js` — iconos SVG inline reemplazados desde `<i data-lucide="...">`.
- `assets/` — logos de cursos (JS, HTML, Python, Java, C++, C#, CSS, React, Vue, Node.js, PHP, TypeScript, SQL), mascota Kodigo y mockups de la app.
- `descargas/app-debug.apk` — build de depuración (debug) más reciente del proyecto (compilado el 19/11/2026, `versionName 1.0.0`, `com.kodigo.app`, Android 7.0+), firmado con la clave estándar de depuración de Android (`CN=Android Debug`). El build release definitivo firmará con el certificado del proyecto (`CN=Kodigo`).

## Verificar el APK

```
certutil -hashfile descargas\app-debug.apk SHA256   # Windows
sha256sum descargas/app-debug.apk                   # macOS/Linux
```

SHA-256 esperado: `9e29b540bfc76362a4d7544dca09d5f70f6db9ce1d9cbecf929a558df3f2f6b1`

## Créditos de iconos

Los logotipos Node.js, PHP y TypeScript son iconos de [Simple Icons](https://simpleicons.org) (CC0). El resto de iconos son Lucide ([licencia ISC](https://lucide.dev)) u originales del proyecto Kodigo.
