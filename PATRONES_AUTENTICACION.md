# 🔐 Patrones de Autenticación Optimizados

## 🎯 Problema Original

Estabas repitiendo este código en cada función:

```typescript
const supabase = await createClient();
const { data: { user } } = await supabase.auth.getUser();
if (!user) {
  redirectToLogin();
}
```

**Problemas:**
1. ❌ Repetición de código (violación del principio DRY)
2. ❌ Uso de `getUser()` en lugar de `getClaims()` (menos eficiente)
3. ❌ Difícil de mantener (cambios en muchos archivos)

---

## ✅ Solución Implementada: Helper Functions

He creado `lib/auth/helpers.ts` con dos funciones:

### 1. `getAuthenticatedClient()`

Para cuando necesitas el cliente Y la información del usuario:

```typescript
export async function getAuthenticatedClient() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  
  if (error || !data?.claims) {
    redirectToLogin();
  }
  
  return {
    supabase,
    user: data.claims,
  };
}
```

**Uso:**
```typescript
export async function createUser(formData: FormData) {
  const { supabase, user } = await getAuthenticatedClient();
  
  // Tienes acceso al supabase client y los datos del usuario
  console.log("Usuario autenticado:", user.sub);
  
  const { data, error } = await supabase.auth.signUp({...});
  // ...
}
```

### 2. `withAuth()` - Higher Order Function

Para queries simples donde solo necesitas hacer una consulta:

```typescript
export async function withAuth<T>(
  callback: (supabase: Awaited<ReturnType<typeof createClient>>) => Promise<T>
): Promise<T> {
  const { supabase } = await getAuthenticatedClient();
  return callback(supabase);
}
```

**Uso:**
```typescript
export async function getInstruments() {
  return withAuth(async (supabase) => {
    const { data, error } = await supabase
      .from("instrument")
      .select("*");
    
    return { data, error };
  });
}
```

---

## 📊 Comparación: Antes vs Después

### ❌ Antes (Código Repetido)

```typescript
// instruments.ts
export async function getInstruments() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser(); // 🐌 Menos eficiente
  if (!user) redirectToLogin();
  
  const { data, error } = await supabase.from("instrument").select();
  return { data, error };
}

// user.ts
export async function getUserProfile() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser(); // 🐌 Repetido
  if (!user) redirectToLogin();
  
  const { data: users } = await supabase.from("profiles").select("*");
  return { users };
}
```

### ✅ Después (DRY + Eficiente)

```typescript
// instruments.ts
export async function getInstruments() {
  return withAuth(async (supabase) => {
    const { data, error } = await supabase.from("instrument").select();
    return { data, error };
  });
}

// user.ts
export async function getUserProfile() {
  return withAuth(async (supabase) => {
    const { data: users } = await supabase.from("profiles").select("*");
    return { users };
  });
}
```

**Beneficios:**
- ✅ Sin repetición de código
- ✅ Usa `getClaims()` (más eficiente)
- ✅ Un solo lugar para cambiar la lógica de auth
- ✅ Más limpio y fácil de leer

---

## 🔍 getClaims() vs getUser()

### Por qué `getClaims()` es mejor:

```typescript
// ❌ getUser() - Hace una llamada a la base de datos
const { data: { user } } = await supabase.auth.getUser();
// 1. Valida el JWT
// 2. Hace una llamada a la DB para obtener el usuario completo
// 🐌 Más lento

// ✅ getClaims() - Solo valida el JWT
const { data } = await supabase.auth.getClaims();
// 1. Solo valida el JWT y extrae los claims
// ⚡ Más rápido (no toca la DB)
```

**Según la documentación de Supabase:**

> `getClaims()` is more performant than `getUser()` because it doesn't make a database call. It only validates the JWT and extracts the claims.

### Cuándo usar cada uno:

| Método | Cuándo usar | Performance |
|--------|-------------|-------------|
| `getClaims()` | Solo necesitas verificar autenticación | ⚡⚡⚡ Rápido |
| `getUser()` | Necesitas datos completos del usuario desde la DB | 🐌 Más lento |

---

## 💡 Patrones Adicionales

### Patrón 1: Con validación de roles

```typescript
// lib/auth/helpers.ts
export async function requireRole(role: string) {
  const { supabase, user } = await getAuthenticatedClient();
  
  const userRole = user.user_metadata?.role;
  
  if (userRole !== role) {
    throw new Error("No tienes permisos para esta acción");
  }
  
  return { supabase, user };
}

// Uso
export async function deleteUser(userId: string) {
  const { supabase } = await requireRole("admin");
  
  // Solo admins pueden ejecutar esto
  const { error } = await supabase
    .from("profiles")
    .delete()
    .eq("id", userId);
  
  return { error };
}
```

### Patrón 2: Con manejo de errores centralizado

```typescript
// lib/auth/helpers.ts
export async function withAuthAndErrorHandling<T>(
  callback: (supabase: SupabaseClient) => Promise<T>
): Promise<{ data: T | null; error: string | null }> {
  try {
    const { supabase } = await getAuthenticatedClient();
    const result = await callback(supabase);
    return { data: result, error: null };
  } catch (error) {
    console.error("Error en operación autenticada:", error);
    return { 
      data: null, 
      error: error instanceof Error ? error.message : "Error desconocido" 
    };
  }
}

// Uso
export async function getInstruments() {
  return withAuthAndErrorHandling(async (supabase) => {
    const { data, error } = await supabase.from("instrument").select();
    if (error) throw error;
    return data;
  });
}
```

### Patrón 3: Con cache integrado

```typescript
// lib/auth/helpers.ts
import { unstable_cache } from "next/cache";

export function withAuthAndCache<T>(
  callback: (supabase: SupabaseClient) => Promise<T>,
  cacheKey: string[],
  revalidate: number = 3600
) {
  return unstable_cache(
    async () => {
      const { supabase } = await getAuthenticatedClient();
      return callback(supabase);
    },
    cacheKey,
    { revalidate, tags: cacheKey }
  )();
}

// Uso
export async function getInstruments() {
  return withAuthAndCache(
    async (supabase) => {
      const { data, error } = await supabase.from("instrument").select();
      return { data, error };
    },
    ["instruments"],
    3600 // 1 hora
  );
}
```

---

## 🎯 Recomendaciones de Uso

### Para queries simples (lectura):
```typescript
// Usa withAuth()
export async function getInstruments() {
  return withAuth(async (supabase) => {
    const { data, error } = await supabase.from("instrument").select();
    return { data, error };
  });
}
```

### Para mutations (escritura):
```typescript
// Usa getAuthenticatedClient() si necesitas info del usuario
export async function createInstrument(formData: FormData) {
  const { supabase, user } = await getAuthenticatedClient();
  
  const { data, error } = await supabase
    .from("instrument")
    .insert({
      name: formData.get("name"),
      created_by: user.sub, // Usas el user ID
    });
  
  return { data, error };
}
```

### Para acciones que requieren roles:
```typescript
// Extiende con validación de roles
export async function requireAdmin() {
  const { supabase, user } = await getAuthenticatedClient();
  
  if (user.user_metadata?.role !== "admin") {
    throw new Error("Requiere rol de administrador");
  }
  
  return { supabase, user };
}
```

---

## 📈 Beneficios de esta Arquitectura

### 1. **DRY (Don't Repeat Yourself)**
- ✅ Código de autenticación en un solo lugar
- ✅ Fácil de mantener y actualizar

### 2. **Performance**
- ✅ Usa `getClaims()` en lugar de `getUser()`
- ✅ Sin llamadas innecesarias a la DB

### 3. **Seguridad**
- ✅ Imposible olvidar validar autenticación
- ✅ Patrón consistente en toda la app

### 4. **Flexibilidad**
- ✅ Fácil añadir logging
- ✅ Fácil añadir validación de roles
- ✅ Fácil integrar cache

### 5. **Developer Experience**
- ✅ Código más limpio
- ✅ Menos boilerplate
- ✅ TypeScript-friendly

---

## 🔄 Migración de Código Existente

Si tienes más funciones con el patrón antiguo:

### Buscar y reemplazar:

```bash
# Buscar funciones que usan el patrón antiguo
rg "createClient.*getUser" --type ts
```

### Template de migración:

```typescript
// ❌ Antes
export async function myFunction() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirectToLogin();
  
  // ... resto del código
}

// ✅ Después
export async function myFunction() {
  return withAuth(async (supabase) => {
    // ... resto del código (sin la parte de auth)
  });
}
```

---

## 📚 Ejemplo Completo

```typescript
// lib/auth/helpers.ts
"use server";

import { createClient } from "./server";
import { redirectToLogin } from "../utils";

export async function getAuthenticatedClient() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  
  if (error || !data?.claims) {
    redirectToLogin();
  }
  
  return { supabase, user: data.claims };
}

export async function withAuth<T>(
  callback: (supabase: Awaited<ReturnType<typeof createClient>>) => Promise<T>
): Promise<T> {
  const { supabase } = await getAuthenticatedClient();
  return callback(supabase);
}

export async function requireRole(allowedRoles: string[]) {
  const { supabase, user } = await getAuthenticatedClient();
  const userRole = user.user_metadata?.role;
  
  if (!allowedRoles.includes(userRole)) {
    throw new Error("No tienes permisos para esta acción");
  }
  
  return { supabase, user };
}

// lib/database/queries/instruments.ts
export async function getInstruments() {
  return withAuth(async (supabase) => {
    const { data, error } = await supabase
      .from("instrument")
      .select("*")
      .order("created_at", { ascending: false });
    return { data, error };
  });
}

// lib/database/mutations/users/delete.ts
export async function deleteUser(userId: string) {
  const { supabase } = await requireRole(["admin"]);
  
  const { error } = await supabase
    .from("profiles")
    .delete()
    .eq("id", userId);
  
  return { error };
}
```

---

## ✅ Checklist de Implementación

- [x] Crear `lib/auth/helpers.ts`
- [x] Implementar `getAuthenticatedClient()`
- [x] Implementar `withAuth()`
- [x] Refactorizar `getInstruments()`
- [x] Refactorizar `getUserProfile()`
- [x] Refactorizar `createUser()`
- [ ] Aplicar patrón a otras funciones existentes
- [ ] Implementar `requireRole()` si es necesario
- [ ] Añadir tests para helpers de auth

---

**Beneficio final:**
- 🎯 Código más limpio
- ⚡ Mejor performance (getClaims en vez de getUser)
- 🔒 Más seguro (patrón consistente)
- 🛠️ Más fácil de mantener (DRY)
