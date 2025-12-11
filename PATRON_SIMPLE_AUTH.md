# 🔐 Patrón Simple de Autenticación

## ✅ Solución Final (Simple y Directa)

### Un solo helper: `getAuthenticatedClient()`

```typescript
// lib/auth/helpers.ts
export async function getAuthenticatedClient() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  
  if (error || !data?.claims) {
    redirectToLogin();
  }
  
  return {
    supabase,   // El cliente de Supabase
    user: data.claims,  // Los datos del usuario (del JWT)
  };
}
```

---

## 🎯 Cómo Usar en Tus Funciones

### Patrón básico:

```typescript
export async function miFuncion() {
  // 1. Obtener cliente autenticado (valida automáticamente)
  const { supabase } = await getAuthenticatedClient();
  
  // 2. Usar el cliente normalmente
  const { data, error } = await supabase.from("tabla").select();
  
  // 3. Retornar
  return { data, error };
}
```

### Si necesitas info del usuario:

```typescript
export async function miFuncion() {
  // Obtener cliente Y usuario
  const { supabase, user } = await getAuthenticatedClient();
  
  // user.claims contiene: sub, email, user_metadata, etc.
  console.log("User ID:", user.sub);
  console.log("Role:", user.user_metadata?.role);
  
  const { data, error } = await supabase
    .from("tabla")
    .insert({ created_by: user.sub });
  
  return { data, error };
}
```

---

## 📋 Ejemplos Reales

### Ejemplo 1: Query simple (lectura)

```typescript
// lib/data-access-layer/instruments.ts
export async function getInstruments() {
  const { supabase } = await getAuthenticatedClient();
  
  const { data, error } = await supabase
    .from("instrument")
    .select("id, name, description, created_at")
    .order("created_at", { ascending: false });

  return { data, error };
}
```

### Ejemplo 2: Query con filtro por usuario

```typescript
// lib/data-access-layer/appointments.ts
export async function getMyAppointments() {
  const { supabase, user } = await getAuthenticatedClient();
  
  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .eq("user_id", user.sub);  // Filtrar por el usuario actual

  return { data, error };
}
```

### Ejemplo 3: Mutation (crear)

```typescript
// lib/data-access-layer/admin/create-user.ts
export async function createUser(formData: FormData) {
  const { supabase, user } = await getAuthenticatedClient();
  
  const email = formData.get("email") as string;
  const first_name = formData.get("first_name") as string;
  const last_name = formData.get("last_name") as string;
  const role = formData.get("role") as string;
  const password = formData.get("password") as string;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { first_name, last_name, role },
    },
  });

  return { data, error };
}
```

### Ejemplo 4: Mutation con validación de rol

```typescript
// lib/data-access-layer/admin/delete-user.ts
export async function deleteUser(userId: string) {
  const { supabase, user } = await getAuthenticatedClient();
  
  // Verificar que sea admin
  const userRole = user.user_metadata?.role;
  if (userRole !== "admin") {
    return { 
      error: "No tienes permisos para eliminar usuarios" 
    };
  }
  
  const { error } = await supabase
    .from("profiles")
    .delete()
    .eq("id", userId);

  return { error };
}
```

---

## 📊 Antes vs Después

### ❌ Antes (Código repetido):

```typescript
export async function getInstruments() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();  // ❌ Repetido
  if (!user) redirectToLogin();
  
  const { data, error } = await supabase.from("instrument").select();
  return { data, error };
}

export async function getUserProfile() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();  // ❌ Repetido
  if (!user) redirectToLogin();
  
  const { data: users } = await supabase.from("profiles").select("*");
  return { users };
}
```

### ✅ Después (Simple y DRY):

```typescript
export async function getInstruments() {
  const { supabase } = await getAuthenticatedClient();  // ✅ Una línea
  
  const { data, error } = await supabase.from("instrument").select();
  return { data, error };
}

export async function getUserProfile() {
  const { supabase } = await getAuthenticatedClient();  // ✅ Una línea
  
  const { data: users } = await supabase.from("profiles").select("*");
  return { users };
}
```

---

## 🎯 Beneficios

1. **✅ Simple**: Solo una función, fácil de entender
2. **✅ Sin repetición**: Código de auth en un solo lugar
3. **✅ getClaims()**: Más rápido que getUser()
4. **✅ Flexible**: Acceso al cliente y al usuario cuando lo necesites

---

## 📝 Template para Nuevas Funciones

Copia y pega este template:

```typescript
"use server";
import { getAuthenticatedClient } from "@/lib/auth/helpers";

export async function tuNombreFuncion() {
  const { supabase } = await getAuthenticatedClient();
  
  const { data, error } = await supabase
    .from("tu_tabla")
    .select("*");

  return { data, error };
}
```

Si necesitas el usuario:

```typescript
"use server";
import { getAuthenticatedClient } from "@/lib/auth/helpers";

export async function tuNombreFuncion() {
  const { supabase, user } = await getAuthenticatedClient();
  
  // Usa user.sub, user.email, user.user_metadata, etc.
  
  const { data, error } = await supabase
    .from("tu_tabla")
    .insert({ created_by: user.sub });

  return { data, error };
}
```

---

## 🔍 Por qué getClaims() en lugar de getUser()

```typescript
// ❌ getUser() - MÁS LENTO
const { data: { user } } = await supabase.auth.getUser();
// 1. Valida el JWT
// 2. Hace llamada a la base de datos para obtener el usuario completo

// ✅ getClaims() - MÁS RÁPIDO
const { data } = await supabase.auth.getClaims();
// 1. Solo valida el JWT (no toca la DB)
```

**El JWT ya contiene toda la info que necesitas:**
- `user.sub` → User ID
- `user.email` → Email
- `user.user_metadata` → Metadata personalizada (role, nombre, etc.)

Solo usa `getUser()` si realmente necesitas datos frescos de la DB.

---

## ✅ Archivos Actualizados

- ✅ `lib/auth/helpers.ts` - Solo con `getAuthenticatedClient()`
- ✅ `lib/data-access-layer/instruments.ts` - Refactorizado
- ✅ `lib/data-access-layer/user.ts` - Refactorizado
- ✅ `lib/data-access-layer/admin/create-user.ts` - Refactorizado

---

## 🚀 Listo para Usar

Ahora todas tus funciones siguen este patrón simple:

```typescript
const { supabase } = await getAuthenticatedClient();
// ... tu código aquí
```

**Simple, directo, sin complejidad innecesaria.**
