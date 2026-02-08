

# 📄 Sistema de Gestión espiritual – Cumpleaños

Aplicación web para la **gestión, creación, edición,  eliminación de cumpleaños** de los jovenes de la congreación (IPUC - Hatillo).

Este sistema reemplaza procesos manuales (fotos y cumpleaños) por un flujo digital controlado, auditable y eficiente.

---

## 🧠 Arquitectura General

Arquitectura **Frontend + Backend desacoplados**, donde el backend es la **única fuente de verdad** para:
- Gestión de la información de los jovenes
- Persistencia
- Integraciones externas

---

## 🖥️ Frontend

**Stack**
- React + TypeScript
- Tailwind CSS
- Canvas (fotos)
- Fetch API

### 📂 Estructura de Carpetas (Frontend)

```
src/
├─ components/
│  ├─ MemberCard.tsx        # Render de Jovenes
│  ├─ MemberDetail.tsx      # Detalles de jovenes
│  └─ MemberForm.tsx        # Formulario Jovenes
│
├─ services/
│  ├─ geminiService.ts                # Cliente HTTP hacia la API GEMINI
│  └─ api.ts                # Cliente HTTP hacia el backend
│ 
│
├─ App.tsx                  # Orquestador principal del flujo
├─ types.ts                 # Interfaces globales (ActaData, etc.)
├─ .env.example             # Ejemplo para arcihov de variables de entorno
├─ constants.tsx            # Configuración institucional (CEM)
├─ index.tsx                # Punto de entrada React
└─ index.html               # Template base
```

> ⚠️ **Nota importante**  
> `types.ts` vive al mismo nivel que `App.tsx` e `index.tsx`.  
> No está dentro de ninguna carpeta.

---

## 🔒 Backend

**Stack sugerido**
- Node.js + Express
- Google Drive API
- Gemini API (Google Generative AI)
- Base de datos (PostgreSQL / MySQL / MongoDB)

### Responsabilidades del Backend

- 🔢 CRUD Jovenes
- ☁️ Exportar
- 🧾 Guardar metadatos de los jovenes
- 🤖 Ejecutar Gemini (nunca en frontend)
- 🔐 Proteger credenciales y API Keys

---

## 🔢 Numeración de Actas (Crítico)

El backend es la **única fuente de verdad**.

### Flujo correcto:
1. Frontend → `POST /actas/reserve`
2. Backend:
   - Incrementa contador
   - Crea registro `draft`
   - Devuelve `{ actaId, actaNumber }`
3. Frontend:
   - Muestra el número
   - Nunca lo calcula


## 🤖 Gemini AI

- Ubicación: **Backend**
- Usos:
  - Redacción profesional de observaciones
  - Sugerencias técnicas

> ❌ Nunca exponer `API_KEY` en frontend

---

## 🔐 Variables de Entorno (Backend)

```env

```

---

## 🚀 Instalación

### Frontend
```bash
npm install
npm run dev
```

