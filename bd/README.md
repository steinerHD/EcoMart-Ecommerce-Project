# BD — EcoMart

Scripts de base de datos PostgreSQL.

## Archivos

- `01_schema.sql` — Creación de tablas
- `02_seed.sql` — Datos de prueba

## Ejecutar
```bash
psql -U ecomart_user -d ecomart_db -f 01_schema.sql
psql -U ecomart_user -d ecomart_db -f 02_seed.sql
```