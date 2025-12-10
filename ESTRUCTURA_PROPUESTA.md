# 📂 Estructura de Carpetas Propuesta

## 🎯 Objetivo

Mejorar la organización del código para mayor escalabilidad, mantenibilidad y claridad.

---

## 📁 Estructura Actual vs Propuesta

### Actual

```
/workspace
├── app/
│   ├── admin/
│   │   └── page.tsx
│   ├── instruments/
│   │   └── page.tsx
│   ├── sign-in/
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── admin/
│   │   ├── user-plate.tsx
│   │   └── UserForm/
│   ├── auth/
│   │   ├── LoginForm/
│   │   ├── LogOutButton/
│   │   ├── ForgotForm/
│   │   └── SignInContainer/
├── lib/
│   ├── auth/
│   │   ├── actions/
│   │   ├── check-session.ts
│   │   ├── middleware.ts
│   │   └── server.ts
│   ├── data-access-layer/
│   │   ├── admin/
│   │   ├── instruments.ts
│   │   └── user.ts
│   └── utils.ts
├── providers/
│   ├── UIProvider/
│   └── index.tsx
├── middleware.ts
├── package.json
└── tsconfig.json
```

### Propuesta Mejorada

```
/workspace
├── app/
│   ├── (auth)/                    # Grupo de rutas de autenticación
│   │   ├── sign-in/
│   │   │   └── page.tsx
│   │   ├── sign-up/
│   │   │   └── page.tsx
│   │   └── forgot-password/
│   │       └── page.tsx
│   ├── (dashboard)/               # Grupo de rutas protegidas
│   │   ├── admin/
│   │   │   ├── users/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── instruments/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   └── layout.tsx
│   ├── api/                       # API routes si es necesario
│   │   └── webhook/
│   │       └── route.ts
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── loading.tsx                # Loading state global
│   └── error.tsx                  # Error boundary global
├── components/
│   ├── admin/
│   │   ├── user-form.tsx          # Lowercase con guiones
│   │   ├── user-list.tsx
│   │   ├── user-card.tsx
│   │   └── index.ts               # Barrel export
│   ├── auth/
│   │   ├── login-form.tsx
│   │   ├── logout-button.tsx
│   │   ├── forgot-password-form.tsx
│   │   ├── sign-in-container.tsx
│   │   └── index.ts
│   ├── instruments/
│   │   ├── instrument-list.tsx
│   │   ├── instrument-card.tsx
│   │   ├── instrument-form.tsx
│   │   └── index.ts
│   ├── ui/                        # Componentes UI compartidos
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── spinner.tsx
│   │   └── index.ts
│   └── layout/
│       ├── header.tsx
│       ├── footer.tsx
│       ├── sidebar.tsx
│       └── index.ts
├── lib/
│   ├── auth/
│   │   ├── actions/
│   │   │   ├── login.ts
│   │   │   ├── logout.ts
│   │   │   ├── register.ts
│   │   │   └── reset-password.ts
│   │   ├── client.ts              # Cliente para componentes cliente
│   │   ├── server.ts              # Cliente para server components
│   │   ├── middleware.ts          # Lógica de middleware
│   │   └── session.ts             # Helpers de sesión
│   ├── database/                  # Antes: data-access-layer
│   │   ├── queries/               # Solo lecturas
│   │   │   ├── users.ts
│   │   │   ├── instruments.ts
│   │   │   ├── profiles.ts
│   │   │   └── index.ts
│   │   ├── mutations/             # Escrituras
│   │   │   ├── users/
│   │   │   │   ├── create.ts
│   │   │   │   ├── update.ts
│   │   │   │   └── delete.ts
│   │   │   ├── instruments/
│   │   │   │   ├── create.ts
│   │   │   │   ├── update.ts
│   │   │   │   └── delete.ts
│   │   │   └── index.ts
│   │   └── client.ts              # Cliente compartido
│   ├── hooks/                     # Custom hooks
│   │   ├── use-auth.ts
│   │   ├── use-user.ts
│   │   └── use-instruments.ts
│   ├── types/                     # TypeScript types
│   │   ├── database.ts
│   │   ├── auth.ts
│   │   ├── api.ts
│   │   └── index.ts
│   ├── validations/               # Schemas de validación
│   │   ├── user.ts
│   │   ├── auth.ts
│   │   ├── instrument.ts
│   │   └── index.ts
│   ├── utils/
│   │   ├── navigation.ts          # Helpers de navegación
│   │   ├── formatters.ts          # Formateo de datos
│   │   ├── errors.ts              # Manejo de errores
│   │   └── index.ts
│   └── constants/
│       ├── config.ts
│       ├── routes.ts
│       └── index.ts
├── providers/
│   ├── auth-provider.tsx          # Provider de autenticación
│   ├── ui-provider.tsx            # Provider de UI
│   ├── theme-provider.tsx         # Provider de tema
│   └── index.tsx
├── styles/                        # Estilos adicionales
│   ├── fonts/
│   └── themes/
├── public/                        # Archivos estáticos
│   ├── images/
│   ├── icons/
│   └── favicon.ico
├── middleware.ts
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🔍 Explicación de Cambios

### 1. **Grupos de Rutas en `/app`**

```typescript
// app/(auth)/layout.tsx
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      {children}
    </div>
  );
}

// app/(dashboard)/layout.tsx
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}
```

**Beneficios**:
- Layouts específicos por sección
- URLs limpias (los grupos no aparecen en la URL)
- Mejor organización visual

### 2. **Separación de Queries y Mutations**

```typescript
// lib/database/queries/users.ts
export async function getUsers() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, first_name, last_name, role")
    .order("created_at", { ascending: false });
  
  return { data, error };
}

export async function getUserById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();
  
  return { data, error };
}

// lib/database/mutations/users/create.ts
export async function createUser(userData: CreateUserInput) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new AuthError("No autenticado");
  
  const { data, error } = await supabase.auth.signUp({
    email: userData.email,
    password: userData.password,
    options: {
      data: {
        first_name: userData.first_name,
        last_name: userData.last_name,
        role: userData.role,
      },
    },
  });
  
  return { data, error };
}
```

**Beneficios**:
- Separación clara de responsabilidades
- Fácil de encontrar y mantener
- Mejor para testing

### 3. **Componentes con Nomenclatura Consistente**

```typescript
// ❌ Antes
components/
  ├── UserForm/
  │   └── index.tsx
  └── user-plate.tsx

// ✅ Ahora
components/
  ├── user-form.tsx
  └── user-card.tsx

// O si necesitas múltiples archivos por componente:
components/
  ├── user-form/
  │   ├── index.tsx
  │   ├── user-form.tsx
  │   ├── user-form.test.tsx
  │   └── user-form.styles.ts
```

### 4. **Barrel Exports**

```typescript
// components/admin/index.ts
export { default as UserForm } from './user-form';
export { default as UserList } from './user-list';
export { default as UserCard } from './user-card';

// Uso
import { UserForm, UserList, UserCard } from '@/components/admin';
```

### 5. **Types Centralizados**

```typescript
// lib/types/database.ts
export interface User {
  id: string;
  first_name: string;
  last_name: string;
  role: 'admin' | 'doctor' | 'receptionist';
  email: string;
  created_at: string;
  updated_at: string;
}

export interface Instrument {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
}

// lib/types/api.ts
export interface ApiResponse<T> {
  data: T | null;
  error: Error | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
```

### 6. **Validaciones con Zod**

```typescript
// lib/validations/user.ts
import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string().email('Email inválido'),
  first_name: z.string().min(2, 'Nombre debe tener al menos 2 caracteres'),
  last_name: z.string().min(2, 'Apellido debe tener al menos 2 caracteres'),
  role: z.enum(['admin', 'doctor', 'receptionist'], {
    errorMap: () => ({ message: 'Rol inválido' })
  }),
  password: z.string()
    .min(8, 'Contraseña debe tener al menos 8 caracteres')
    .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
    .regex(/[0-9]/, 'Debe contener al menos un número')
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

// Uso en server action
export async function createUser(input: CreateUserInput) {
  const validated = createUserSchema.parse(input);
  // ...
}
```

### 7. **Custom Hooks**

```typescript
// lib/hooks/use-auth.ts
"use client";

import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/auth/client';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    
    // Get initial session
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return { user, loading };
}

// lib/hooks/use-users.ts
"use client";

import { useEffect, useState } from 'react';
import { getUsers } from '@/lib/database/queries/users';
import type { User } from '@/lib/types/database';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const { data, error } = await getUsers();
        if (error) throw error;
        setUsers(data || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  return { users, loading, error };
}
```

### 8. **Constants y Configuración**

```typescript
// lib/constants/routes.ts
export const ROUTES = {
  HOME: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  FORGOT_PASSWORD: '/forgot-password',
  ADMIN: {
    HOME: '/admin',
    USERS: '/admin/users',
    USER_DETAIL: (id: string) => `/admin/users/${id}`,
  },
  INSTRUMENTS: {
    HOME: '/instruments',
    DETAIL: (id: string) => `/instruments/${id}`,
  },
} as const;

// lib/constants/config.ts
export const APP_CONFIG = {
  name: 'Sistema Integral de Turnos',
  shortName: 'SIT',
  description: 'Sistema de gestión de turnos médicos',
  version: '0.1.0',
  author: 'Tu Nombre',
} as const;

export const CACHE_CONFIG = {
  INSTRUMENTS: {
    revalidate: 3600, // 1 hora
    tags: ['instruments'],
  },
  USERS: {
    revalidate: 1800, // 30 minutos
    tags: ['users'],
  },
} as const;
```

### 9. **Manejo de Errores Estructurado**

```typescript
// lib/utils/errors.ts
export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public metadata?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class AuthError extends AppError {
  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message, 'AUTH_ERROR', 401, metadata);
    this.name = 'AuthError';
  }
}

export class DatabaseError extends AppError {
  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message, 'DB_ERROR', 500, metadata);
    this.name = 'DatabaseError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message, 'VALIDATION_ERROR', 400, metadata);
    this.name = 'ValidationError';
  }
}

// Uso
import { AuthError, DatabaseError } from '@/lib/utils/errors';

export async function getUsers() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new AuthError('Usuario no autenticado');
  }
  
  const { data, error } = await supabase
    .from("profiles")
    .select("*");
  
  if (error) {
    throw new DatabaseError('Error al obtener usuarios', { 
      supabaseError: error 
    });
  }
  
  return data;
}
```

---

## 🚀 Plan de Migración

### Fase 1: Preparación (Sin breaking changes)
1. Crear nuevas carpetas
2. Crear archivos de types
3. Crear validaciones
4. Crear constants

### Fase 2: Migración de lib/ (1-2 horas)
1. Crear `lib/database/queries/`
2. Crear `lib/database/mutations/`
3. Mover archivos de `data-access-layer`
4. Actualizar imports

### Fase 3: Migración de components/ (1-2 horas)
1. Renombrar componentes a lowercase-hyphen
2. Crear barrel exports
3. Actualizar imports

### Fase 4: Reorganización de app/ (30 min)
1. Crear grupos de rutas
2. Crear layouts específicos
3. Mover páginas

### Fase 5: Testing y Validación (1 hora)
1. Verificar que todo funciona
2. Ejecutar linter
3. Probar rutas

---

## 📊 Comparación de Imports

### Antes
```typescript
import { getUserProfile } from '@/lib/data-access-layer/user';
import { createUser } from '@/lib/data-access-layer/admin/create-user';
import { getInstruments } from '@/lib/data-access-layer/instruments';
```

### Después
```typescript
import { getUsers, getUserById } from '@/lib/database/queries/users';
import { createUser, updateUser, deleteUser } from '@/lib/database/mutations/users';
import { getInstruments, getInstrumentById } from '@/lib/database/queries/instruments';
```

**Más claro y predecible!**

---

## ✅ Checklist de Implementación

- [ ] Crear estructura de carpetas nueva
- [ ] Crear archivos de types
- [ ] Implementar validaciones con Zod
- [ ] Crear constants
- [ ] Migrar queries a `database/queries/`
- [ ] Migrar mutations a `database/mutations/`
- [ ] Renombrar componentes
- [ ] Crear barrel exports
- [ ] Reorganizar rutas con grupos
- [ ] Actualizar todos los imports
- [ ] Ejecutar linter
- [ ] Probar todas las rutas
- [ ] Actualizar documentación

---

*Este documento es una guía. Puedes adaptarlo según las necesidades específicas de tu proyecto.*
