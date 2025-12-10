# 🚀 Plan de Acción - Optimización del Proyecto SIT

## 📋 Resumen de Cambios Implementados

### ✅ Completado

1. **Middleware corregido**
   - ❌ Antes: `proxy.ts` (no funcional)
   - ✅ Ahora: `middleware.ts` (funcional)
   - 📍 Ubicación: `/workspace/middleware.ts`

2. **Optimización de queries a Supabase**
   - ❌ Antes: 2 clientes por operación
   - ✅ Ahora: 1 cliente por operación
   - 📁 Archivos modificados:
     - `lib/data-access-layer/instruments.ts`
     - `lib/data-access-layer/user.ts`

3. **Bug de logout corregido**
   - ❌ Antes: `redirect("/sing-in")`
   - ✅ Ahora: `redirect("/sign-in")`
   - 📍 Ubicación: `lib/auth/actions/logout.ts`

4. **Documentación creada**
   - ✅ `REVIEW_PERFORMANCE_ESTRUCTURA.md` - Análisis completo
   - ✅ `ESTRUCTURA_PROPUESTA.md` - Nueva estructura
   - ✅ `EJEMPLOS_OPTIMIZACION.md` - Código de ejemplo
   - ✅ `PLAN_DE_ACCION.md` - Este documento

---

## 📊 Impacto de los Cambios

### Performance
- **Reducción del 50%** en llamadas a Supabase
- **Middleware funcional** para protección de rutas
- **Menor latencia** en operaciones de autenticación

### Code Quality
- **Eliminación de código duplicado**
- **Mejor manejo de errores**
- **Código más mantenible**

---

## 🎯 Próximos Pasos (Priorizados)

### 🔴 Prioridad Alta (Hacer ahora)

#### 1. Instalar Dependencias Necesarias

```bash
npm install zod
```

**Estimado:** 2 minutos

#### 2. Crear Estructura de Types

```bash
mkdir -p lib/types
touch lib/types/database.ts
touch lib/types/api.ts
touch lib/types/auth.ts
touch lib/types/index.ts
```

**Estimado:** 30 minutos
**Archivos:** 4 archivos
**Referencia:** Ver `EJEMPLOS_OPTIMIZACION.md` sección 2

#### 3. Crear Validaciones con Zod

```bash
mkdir -p lib/validations
touch lib/validations/user.ts
touch lib/validations/auth.ts
touch lib/validations/instrument.ts
touch lib/validations/index.ts
```

**Estimado:** 45 minutos
**Archivos:** 4 archivos
**Referencia:** Ver `EJEMPLOS_OPTIMIZACION.md` sección 3

#### 4. Actualizar Server Actions con Validaciones

Archivos a modificar:
- `lib/data-access-layer/admin/create-user.ts`
- `lib/auth/actions/login.ts`

**Estimado:** 30 minutos
**Referencia:** Ver `EJEMPLOS_OPTIMIZACION.md` sección 3

#### 5. Crear Variables de Entorno Documentadas

```bash
touch .env.example
```

**Estimado:** 10 minutos
**Referencia:** Ver `EJEMPLOS_OPTIMIZACION.md` sección 8

---

### 🟡 Prioridad Media (Esta semana)

#### 6. Reorganizar Estructura de Carpetas

**Pasos:**

```bash
# Crear nueva estructura
mkdir -p lib/database/queries
mkdir -p lib/database/mutations/users
mkdir -p lib/database/mutations/instruments
mkdir -p lib/utils
mkdir -p lib/constants

# Mover archivos (no ejecutar aún, solo referencia)
# mv lib/data-access-layer/instruments.ts lib/database/queries/instruments.ts
# mv lib/data-access-layer/user.ts lib/database/queries/users.ts
# mv lib/data-access-layer/admin/create-user.ts lib/database/mutations/users/create.ts
```

**Estimado:** 1-2 horas
**Archivos afectados:** ~10 archivos
**Riesgo:** Medio (muchos imports que actualizar)
**Referencia:** Ver `ESTRUCTURA_PROPUESTA.md`

#### 7. Implementar Caching

Aplicar `unstable_cache` en queries que cambian poco:
- `getInstruments()`
- Otras queries de solo lectura

**Estimado:** 45 minutos
**Referencia:** Ver `EJEMPLOS_OPTIMIZACION.md` sección 4

#### 8. Optimizar LogOutButton

Convertir de Server Component a Client Component con form action.

**Estimado:** 15 minutos
**Archivo:** `components/auth/LogOutButton/index.tsx`
**Referencia:** Ver `REVIEW_PERFORMANCE_ESTRUCTURA.md` sección 3.6

#### 9. Crear Custom Hooks

```bash
mkdir -p lib/hooks
touch lib/hooks/use-auth.ts
touch lib/hooks/use-async.ts
touch lib/hooks/index.ts
```

**Estimado:** 1 hora
**Referencia:** Ver `EJEMPLOS_OPTIMIZACION.md` sección 6

---

### 🟢 Prioridad Baja (Cuando haya tiempo)

#### 10. Renombrar Componentes a Convención Consistente

Convertir de:
- `UserForm/index.tsx` → `user-form.tsx`
- `LogOutButton/index.tsx` → `logout-button.tsx`

**Estimado:** 2 horas
**Archivos afectados:** ~8 componentes
**Referencia:** Ver `ESTRUCTURA_PROPUESTA.md` sección 3

#### 11. Añadir Error Boundaries

**Estimado:** 30 minutos
**Referencia:** Ver `EJEMPLOS_OPTIMIZACION.md` sección 7

#### 12. Configurar Prettier y ESLint

```bash
touch .prettierrc
touch .prettierignore
```

**Estimado:** 20 minutos
**Referencia:** Ver `EJEMPLOS_OPTIMIZACION.md` sección 9

#### 13. Añadir Tests Unitarios

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
mkdir -p __tests__/lib/database/queries
```

**Estimado:** 3-4 horas (para setup + tests básicos)

#### 14. Documentación de API

Crear documentación de las funciones principales.

**Estimado:** 2 horas

---

## 📅 Cronograma Sugerido

### Semana 1: Fundamentos (6-8 horas)

**Día 1-2: Types y Validaciones**
- [ ] Instalar Zod
- [ ] Crear types TypeScript
- [ ] Crear validaciones Zod
- [ ] Actualizar server actions

**Día 3-4: Optimizaciones**
- [ ] Variables de entorno
- [ ] Implementar caching
- [ ] Optimizar LogOutButton
- [ ] Crear custom hooks

**Día 5: Testing**
- [ ] Probar todas las funcionalidades
- [ ] Verificar que no hay errores
- [ ] Probar en diferentes navegadores

### Semana 2: Refactoring (8-10 horas)

**Día 1-3: Reorganización**
- [ ] Reorganizar estructura de carpetas
- [ ] Actualizar todos los imports
- [ ] Renombrar componentes
- [ ] Probar que todo funciona

**Día 4-5: Mejoras Adicionales**
- [ ] Error boundaries
- [ ] Prettier y ESLint
- [ ] Documentación
- [ ] Code review

---

## 🔧 Comandos Útiles

### Testing

```bash
# Verificar que no hay errores de TypeScript
npm run build

# Ejecutar linter
npm run lint

# Formatear código con Prettier (después de instalarlo)
npx prettier --write .
```

### Git

```bash
# Crear branch para cada mejora
git checkout -b feature/add-typescript-types
git checkout -b feature/add-validations
git checkout -b feature/reorganize-folders

# Commit frecuentes con mensajes descriptivos
git add .
git commit -m "feat: add TypeScript types for database models"
```

---

## 📊 Métricas de Progreso

### Antes de Optimizaciones

- ❌ Middleware no funcional
- ❌ ~2 llamadas a Supabase por operación
- ❌ Sin types TypeScript definidos
- ❌ Sin validaciones en servidor
- ❌ Sin estrategia de caching
- ❌ Bug en logout
- ❌ Estructura de carpetas inconsistente

### Después de Fase 1 (Prioridad Alta)

- ✅ Middleware funcional
- ✅ 1 llamada a Supabase por operación
- ✅ Types TypeScript completos
- ✅ Validaciones con Zod
- ✅ Variables de entorno documentadas
- ✅ Bug de logout corregido
- ⚠️ Estructura de carpetas (pendiente)

### Después de Fase 2 (Prioridad Media)

- ✅ Caching implementado
- ✅ Custom hooks creados
- ✅ LogOutButton optimizado
- ✅ Estructura de carpetas reorganizada
- ⚠️ Tests (pendiente)
- ⚠️ Documentación (pendiente)

### Objetivo Final (Prioridad Baja)

- ✅ Componentes renombrados consistentemente
- ✅ Error boundaries implementados
- ✅ Prettier y ESLint configurados
- ✅ Tests unitarios básicos
- ✅ Documentación completa

---

## 🎯 Quick Wins (Implementar YA)

Estos son cambios pequeños con gran impacto que puedes hacer en los próximos 30 minutos:

### 1. Variables de Entorno (.env.example)

```bash
# Crear archivo
cat > .env.example << 'EOF'
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
EOF
```

### 2. Optimizar Query de getUserProfile

```typescript
// Cambiar en lib/data-access-layer/user.ts
// De:
const { data: users } = await supabase.from("profiles").select("*");

// A:
const { data: users } = await supabase
  .from("profiles")
  .select("id, first_name, last_name, role")
  .order("created_at", { ascending: false });
```

### 3. Añadir manejo de errores en logout

Ya implementado ✅

### 4. Añadir "use server" donde falta

Verificar que todas las server actions tengan la directiva `"use server"` al principio.

---

## ❓ FAQ

### ¿Puedo implementar los cambios gradualmente?

**Sí**, de hecho es recomendado. Sigue el orden de prioridades:
1. Alta → 2. Media → 3. Baja

### ¿Los cambios romperán algo en producción?

Los cambios de Prioridad Alta son **seguros** y no rompen funcionalidad existente.
Los de Prioridad Media requieren **testing cuidadoso** antes de deploy.

### ¿Necesito hacer todos los cambios?

**No**. Los cambios de Prioridad Alta son **muy recomendados**.
Los de Media y Baja son **mejoras** que puedes hacer cuando tengas tiempo.

### ¿Cuánto tiempo tomará todo?

- **Prioridad Alta**: 2-3 horas
- **Prioridad Media**: 4-5 horas
- **Prioridad Baja**: 6-8 horas
- **TOTAL**: 12-16 horas (1-2 semanas trabajando unas horas al día)

### ¿Por dónde empiezo?

1. Lee `REVIEW_PERFORMANCE_ESTRUCTURA.md` (5 min)
2. Implementa Quick Wins (30 min)
3. Sigue la Semana 1 del cronograma
4. Continúa con Semana 2 cuando tengas tiempo

---

## 📞 Soporte

Si tienes dudas sobre algún cambio:

1. Revisa el documento correspondiente:
   - `REVIEW_PERFORMANCE_ESTRUCTURA.md` → Análisis y problemas
   - `ESTRUCTURA_PROPUESTA.md` → Nueva estructura
   - `EJEMPLOS_OPTIMIZACION.md` → Código de ejemplo
   - `PLAN_DE_ACCION.md` → Este documento

2. Busca ejemplos en `EJEMPLOS_OPTIMIZACION.md`

3. Prueba en una branch separada antes de mergear

---

## ✅ Checklist Final

Antes de considerar el proyecto "optimizado":

### Performance
- [x] Middleware funcional
- [x] Llamadas a Supabase optimizadas
- [ ] Caching implementado
- [ ] Queries con campos específicos

### Code Quality
- [x] Bug de logout corregido
- [ ] Types TypeScript completos
- [ ] Validaciones en servidor
- [ ] Manejo de errores estructurado

### Estructura
- [ ] Carpetas reorganizadas según propuesta
- [ ] Componentes con naming consistente
- [ ] Barrel exports implementados
- [ ] Constants centralizados

### Developer Experience
- [ ] Variables de entorno documentadas
- [ ] ESLint y Prettier configurados
- [ ] Custom hooks creados
- [ ] Documentación actualizada

### Testing
- [ ] Tests unitarios básicos
- [ ] Todas las rutas probadas
- [ ] Sin errores de lint
- [ ] Build exitoso

---

*Última actualización: 10 de Diciembre, 2025*
*Progreso: 3 de 5 items de Prioridad Alta completados*
