# 💡 Ejemplos de Optimización

Este documento contiene ejemplos concretos de cómo optimizar el código actual del proyecto.

---

## 1. 🔐 Optimización de Autenticación

### ❌ Antes: Múltiples verificaciones

```typescript
// lib/data-access-layer/instruments.ts
import { createClient } from "@/lib/auth/server";
import { checkAuth } from "../auth/check-session";
import { redirectToLogin } from "../utils";

export async function getInstruments() {
  const supabase = await createClient();        // Cliente #1
  const isLoggedIn = await checkAuth();          // Cliente #2
  !isLoggedIn && redirectToLogin();
  const { data, error } = await supabase.from("instrument").select();
  return { data, error };
}
```

### ✅ Después: Una sola verificación

```typescript
// lib/database/queries/instruments.ts
"use server";
import { createClient } from "@/lib/auth/server";
import { redirectToLogin } from "@/lib/utils/navigation";
import type { ApiResponse } from "@/lib/types/api";
import type { Instrument } from "@/lib/types/database";

export async function getInstruments(): Promise<ApiResponse<Instrument[]>> {
  const supabase = await createClient();
  
  // Verificar autenticación con el mismo cliente
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (!user || authError) {
    redirectToLogin();
  }
  
  // Query optimizado con campos específicos
  const { data, error } = await supabase
    .from("instrument")
    .select("id, name, description, created_at")
    .order("created_at", { ascending: false });
  
  return { data, error };
}
```

---

## 2. 🎯 Sistema de Types con TypeScript

### Generar types desde Supabase

```bash
# En la terminal
npx supabase gen types typescript --project-id "your-project-ref" > lib/types/database.types.ts
```

### Archivo de types personalizado

```typescript
// lib/types/database.ts
export interface Profile {
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
  status: 'available' | 'in_use' | 'maintenance';
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: string;
  patient_name: string;
  doctor_id: string;
  instrument_id: string | null;
  scheduled_at: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
}

// Types de relaciones
export interface AppointmentWithDetails extends Appointment {
  doctor: Pick<Profile, 'id' | 'first_name' | 'last_name'>;
  instrument: Pick<Instrument, 'id' | 'name'> | null;
}

// lib/types/api.ts
export interface ApiResponse<T> {
  data: T | null;
  error: Error | null;
}

export interface ApiError {
  message: string;
  code: string;
  details?: Record<string, unknown>;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

// lib/types/auth.ts
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  first_name: string;
  last_name: string;
  role: Profile['role'];
}

export interface AuthResponse {
  user: Profile | null;
  error: ApiError | null;
}
```

---

## 3. 🛡️ Validaciones con Zod

### Instalación

```bash
npm install zod
```

### Schemas de validación

```typescript
// lib/validations/auth.ts
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string()
    .email('Email inválido')
    .min(1, 'Email es requerido'),
  password: z.string()
    .min(1, 'Contraseña es requerida'),
});

export const registerSchema = z.object({
  email: z.string()
    .email('Email inválido')
    .min(1, 'Email es requerido'),
  first_name: z.string()
    .min(2, 'Nombre debe tener al menos 2 caracteres')
    .max(50, 'Nombre no puede exceder 50 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Nombre solo puede contener letras'),
  last_name: z.string()
    .min(2, 'Apellido debe tener al menos 2 caracteres')
    .max(50, 'Apellido no puede exceder 50 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Apellido solo puede contener letras'),
  role: z.enum(['admin', 'doctor', 'receptionist'], {
    errorMap: () => ({ message: 'Rol debe ser admin, doctor o receptionist' })
  }),
  password: z.string()
    .min(8, 'Contraseña debe tener al menos 8 caracteres')
    .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
    .regex(/[a-z]/, 'Debe contener al menos una minúscula')
    .regex(/[0-9]/, 'Debe contener al menos un número')
    .regex(/[^A-Za-z0-9]/, 'Debe contener al menos un carácter especial'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;

// lib/validations/user.ts
import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string().email('Email inválido'),
  first_name: z.string()
    .min(2, 'Nombre debe tener al menos 2 caracteres')
    .max(50, 'Nombre muy largo'),
  last_name: z.string()
    .min(2, 'Apellido debe tener al menos 2 caracteres')
    .max(50, 'Apellido muy largo'),
  role: z.enum(['admin', 'doctor', 'receptionist']),
  password: z.string().min(8, 'Contraseña debe tener al menos 8 caracteres'),
});

export const updateUserSchema = createUserSchema.partial().omit({ password: true });

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;

// lib/validations/instrument.ts
import { z } from 'zod';

export const createInstrumentSchema = z.object({
  name: z.string()
    .min(3, 'Nombre debe tener al menos 3 caracteres')
    .max(100, 'Nombre muy largo'),
  description: z.string()
    .max(500, 'Descripción muy larga')
    .nullable()
    .optional(),
  status: z.enum(['available', 'in_use', 'maintenance'])
    .default('available'),
});

export const updateInstrumentSchema = createInstrumentSchema.partial();

export type CreateInstrumentInput = z.infer<typeof createInstrumentSchema>;
export type UpdateInstrumentInput = z.infer<typeof updateInstrumentSchema>;
```

### Uso en Server Actions

```typescript
// lib/database/mutations/users/create.ts
"use server";

import { createClient } from "@/lib/auth/server";
import { revalidatePath } from "next/cache";
import { createUserSchema, type CreateUserInput } from "@/lib/validations/user";
import { AuthError, ValidationError, DatabaseError } from "@/lib/utils/errors";

export async function createUser(previousState: unknown, formData: FormData) {
  try {
    // 1. Extraer datos del FormData
    const rawData = {
      email: formData.get("email") as string,
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
      role: formData.get("role") as string,
      password: formData.get("password") as string,
    };

    // 2. Validar con Zod
    const validatedData = createUserSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        errors: validatedData.error.flatten().fieldErrors,
        fieldData: rawData,
      };
    }

    // 3. Verificar autenticación
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new AuthError("No autenticado");
    }

    // 4. Crear usuario
    const { data, error } = await supabase.auth.signUp({
      email: validatedData.data.email,
      password: validatedData.data.password,
      options: {
        data: {
          first_name: validatedData.data.first_name,
          last_name: validatedData.data.last_name,
          role: validatedData.data.role,
        },
      },
    });

    if (error) {
      throw new DatabaseError("Error al crear usuario", { supabaseError: error });
    }

    // 5. Revalidar y retornar
    revalidatePath("/admin");
    
    return {
      success: true,
      message: "Usuario creado exitosamente",
      data: data.user,
    };

  } catch (error) {
    console.error("Error en createUser:", error);

    if (error instanceof ValidationError) {
      return {
        success: false,
        message: error.message,
        errors: error.metadata,
      };
    }

    if (error instanceof AuthError) {
      return {
        success: false,
        message: "No tienes permisos para realizar esta acción",
      };
    }

    return {
      success: false,
      message: "Ocurrió un error inesperado. Intenta nuevamente.",
    };
  }
}
```

---

## 4. 📊 Caching con unstable_cache

```typescript
// lib/database/queries/instruments.ts
"use server";

import { unstable_cache } from "next/cache";
import { createClient } from "@/lib/auth/server";
import { redirectToLogin } from "@/lib/utils/navigation";
import type { Instrument } from "@/lib/types/database";
import type { ApiResponse } from "@/lib/types/api";

// Query sin cache (para datos que cambian frecuentemente)
export async function getInstrumentById(id: string): Promise<ApiResponse<Instrument>> {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirectToLogin();
  
  const { data, error } = await supabase
    .from("instrument")
    .select("*")
    .eq("id", id)
    .single();
  
  return { data, error };
}

// Query con cache (para datos que cambian poco)
export const getInstruments = unstable_cache(
  async (): Promise<ApiResponse<Instrument[]>> => {
    const supabase = await createClient();
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirectToLogin();
    
    const { data, error } = await supabase
      .from("instrument")
      .select("id, name, description, status, created_at")
      .order("created_at", { ascending: false });
    
    return { data, error };
  },
  ['instruments-list'],
  {
    revalidate: 3600, // 1 hora
    tags: ['instruments'],
  }
);

// Query con paginación
export async function getInstrumentsPaginated(
  page: number = 1, 
  pageSize: number = 10
): Promise<PaginatedResponse<Instrument>> {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirectToLogin();
  
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  
  const [
    { data, error },
    { count }
  ] = await Promise.all([
    supabase
      .from("instrument")
      .select("*")
      .range(from, to)
      .order("created_at", { ascending: false }),
    supabase
      .from("instrument")
      .select("*", { count: 'exact', head: true })
  ]);
  
  if (error) {
    throw new DatabaseError("Error al obtener instrumentos", { error });
  }
  
  return {
    data: data || [],
    pagination: {
      total: count || 0,
      page,
      pageSize,
      totalPages: Math.ceil((count || 0) / pageSize),
    },
  };
}

// Invalidar cache después de mutations
import { revalidateTag } from "next/cache";

export async function revalidateInstruments() {
  revalidateTag('instruments');
}
```

---

## 5. 🎨 Componente Optimizado con Loading States

```typescript
// components/instruments/instrument-list.tsx
"use client";

import { useState, useEffect } from "react";
import { Card, Spinner } from "@heroui/react";
import type { Instrument } from "@/lib/types/database";
import { InstrumentCard } from "./instrument-card";

interface InstrumentListProps {
  initialData?: Instrument[];
}

export function InstrumentList({ initialData = [] }: InstrumentListProps) {
  const [instruments, setInstruments] = useState<Instrument[]>(initialData);
  const [loading, setLoading] = useState(!initialData.length);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData.length) return;

    async function fetchInstruments() {
      try {
        const response = await fetch('/api/instruments');
        if (!response.ok) throw new Error('Error al cargar instrumentos');
        
        const { data } = await response.json();
        setInstruments(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    }

    fetchInstruments();
  }, [initialData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="p-4 bg-red-50">
        <p className="text-red-600">{error}</p>
      </Card>
    );
  }

  if (!instruments.length) {
    return (
      <Card className="p-8 text-center">
        <p className="text-gray-500">No hay instrumentos disponibles</p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {instruments.map((instrument) => (
        <InstrumentCard key={instrument.id} instrument={instrument} />
      ))}
    </div>
  );
}

// components/instruments/instrument-card.tsx
"use client";

import { Card, Chip } from "@heroui/react";
import type { Instrument } from "@/lib/types/database";

interface InstrumentCardProps {
  instrument: Instrument;
}

export function InstrumentCard({ instrument }: InstrumentCardProps) {
  const statusColors = {
    available: "success",
    in_use: "warning",
    maintenance: "danger",
  } as const;

  const statusLabels = {
    available: "Disponible",
    in_use: "En uso",
    maintenance: "Mantenimiento",
  } as const;

  return (
    <Card className="p-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold">{instrument.name}</h3>
        <Chip 
          color={statusColors[instrument.status]} 
          size="sm" 
          variant="flat"
        >
          {statusLabels[instrument.status]}
        </Chip>
      </div>
      {instrument.description && (
        <p className="text-sm text-gray-600 mb-2">{instrument.description}</p>
      )}
      <p className="text-xs text-gray-400">
        Creado: {new Date(instrument.created_at).toLocaleDateString()}
      </p>
    </Card>
  );
}
```

---

## 6. 🔄 Custom Hooks Optimizados

```typescript
// lib/hooks/use-auth.ts
"use client";

import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/auth/client';

interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
}

export function useAuth(): UseAuthReturn {
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
      (_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return { 
    user, 
    loading, 
    isAuthenticated: !!user 
  };
}

// lib/hooks/use-async.ts
"use client";

import { useEffect, useState, useCallback } from 'react';

interface UseAsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface UseAsyncReturn<T> extends UseAsyncState<T> {
  execute: () => Promise<void>;
  reset: () => void;
}

export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  immediate = true
): UseAsyncReturn<T> {
  const [state, setState] = useState<UseAsyncState<T>>({
    data: null,
    loading: immediate,
    error: null,
  });

  const execute = useCallback(async () => {
    setState({ data: null, loading: true, error: null });
    
    try {
      const response = await asyncFunction();
      setState({ data: response, loading: false, error: null });
    } catch (error) {
      setState({ 
        data: null, 
        loading: false, 
        error: error instanceof Error ? error : new Error('Unknown error') 
      });
    }
  }, [asyncFunction]);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { ...state, execute, reset };
}

// Uso
import { getInstruments } from '@/lib/database/queries/instruments';

function InstrumentListClient() {
  const { data, loading, error, execute } = useAsync(
    () => getInstruments(),
    true
  );

  if (loading) return <Spinner />;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {data?.data?.map(instrument => (
        <div key={instrument.id}>{instrument.name}</div>
      ))}
      <button onClick={execute}>Recargar</button>
    </div>
  );
}
```

---

## 7. 🎯 Error Boundaries

```typescript
// components/error-boundary.tsx
"use client";

import { Component, ReactNode } from 'react';
import { Card, Button } from '@heroui/react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error boundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Card className="p-8 m-4 bg-red-50">
          <h2 className="text-xl font-bold text-red-600 mb-4">
            Algo salió mal
          </h2>
          <p className="text-gray-700 mb-4">
            {this.state.error?.message || 'Error desconocido'}
          </p>
          <Button 
            color="primary"
            onPress={() => this.setState({ hasError: false, error: null })}
          >
            Intentar nuevamente
          </Button>
        </Card>
      );
    }

    return this.props.children;
  }
}

// Uso
<ErrorBoundary>
  <InstrumentList />
</ErrorBoundary>
```

---

## 8. 🌐 Variables de entorno

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# App Config
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="Sistema Integral de Turnos"

# .env.example (commit to repo)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=

NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_APP_NAME=
```

```typescript
// lib/constants/env.ts
function getEnvVar(key: string, defaultValue?: string): string {
  const value = process.env[key] || defaultValue;
  
  if (!value) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  
  return value;
}

export const ENV = {
  SUPABASE_URL: getEnvVar('NEXT_PUBLIC_SUPABASE_URL'),
  SUPABASE_ANON_KEY: getEnvVar('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY'),
  SUPABASE_SERVICE_ROLE_KEY: getEnvVar('SUPABASE_SERVICE_ROLE_KEY'),
  APP_URL: getEnvVar('NEXT_PUBLIC_APP_URL', 'http://localhost:3000'),
  APP_NAME: getEnvVar('NEXT_PUBLIC_APP_NAME', 'SIT'),
} as const;
```

---

## 9. 📝 Prettier y ESLint

```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "lf"
}

// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "next/typescript"
  ],
  "rules": {
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "prefer-const": "error",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { "argsIgnorePattern": "^_" }
    ]
  }
}
```

---

## ✅ Checklist de Implementación

- [ ] Instalar Zod: `npm install zod`
- [ ] Crear carpeta `lib/types/`
- [ ] Crear schemas de validación
- [ ] Actualizar server actions con validaciones
- [ ] Implementar caching con `unstable_cache`
- [ ] Crear custom hooks
- [ ] Añadir Error Boundaries
- [ ] Configurar variables de entorno
- [ ] Configurar Prettier y ESLint

---

*Estos son ejemplos reales que puedes copiar y adaptar a tu proyecto.*
