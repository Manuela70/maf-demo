# Requerimientos

## Bloque 1: Conocer la aplicación deseada

| ITEM | PREGUNTA | DESCRIPCIÓN |
| --- | --- | --- |
| 1 | Descripción del proyecto |  |
| 2 | Links |  |

<!-- TODO: en la fuente, la columna DESCRIPCIÓN del Bloque 1 (ítems 1 y 2) está vacía. Se preserva tal cual, sin inventar contenido. -->

## Bloque 2: Requerimientos

<table>
<thead>
<tr><th>ITEM</th><th>TIPO DE REQUERIMIENTO</th><th>DESCRIPCIÓN</th><th>REQUERIMIENTO TÉCNICO / CONSIDERACIONES ADICIONALES</th><th>COMPLEJIDAD</th><th>HORAS FRONTEND</th><th>HORAS BACKEND</th><th>Total del Requerimiento</th><th>Sustento técnico (microservicio · endpoints · integración · detalle)</th></tr>
</thead>
<tbody>
<tr><td>REQ-01</td><td>Funcional</td><td><p>[RF-001] Autenticación y Control de Acceso por Rol</p>
<p>Cada usuario cuenta con credenciales únicas. El sistema controla el acceso según el rol asignado. Sesiones con expiración configurable. Control en backend.<br>
Los 9 roles definidos (validados por MAF — equipo comercial y operativo el 18/06):<br>
Asesor FC — gestión de leads y flujo de venta<br>
Jefe de Ventas — supervisión operativa y vista de cartera<br>
Supervisor Comercial — gestión de equipo y reasignación de leads<br>
Gerente Comercial — visibilidad de zona y métricas consolidadas<br>
Call Center — registro de leads, derivación y seguimiento (soporta múltiples operadores)<br>
Oficial PLAFT — revisión y resolución de casos de cumplimiento<br>
Operaciones — revisión de expedientes y registro de bienvenida<br>
Administrador — configuración de usuarios, roles y parámetros del sistema<br>
Admin Sistema — acceso técnico completo para soporte y auditoría<br>
Un usuario puede tener uno o más roles asignados. La cantidad de usuarios por rol es flexible (MAF puede agregar 20+ usuarios de Call Center sin afectar el modelo de roles).</p></td><td><p>Actores: Todos los roles<br>
Prioridad: MUST<br>
Módulo: M1 — Autenticación y Control de Acceso</p></td><td>Alta</td><td>24</td><td>36</td><td>60</td><td><p>🔹 Microservicio: auth-service</p>
<p>🔹 Endpoints REST: POST /auth/login · POST /auth/logout · POST /auth/refresh · GET /users/me · GET/POST/PUT/DELETE /users · GET/POST/PUT /roles · GET /roles/{id}/permissions (≈11 endpoints)</p>
<p>🔹 Integración: AWS Cognito (IdP)</p>
<p>🔹 Detalle: 9 roles con matriz de permisos, sesión configurable, control en backend, multi-usuario CC concurrente. Integración Cognito + lógica de autorización por rol en cada endpoint. Front: pantallas login, recuperación, gestión usuarios/roles.</p></td></tr>
<tr><td>REQ-02</td><td>Funcional</td><td><p>[RF-002] Recepción de Leads desde 4 Fuentes con Lógica de Asignación</p>
<p>La plataforma recibe leads desde cuatro fuentes:<br>
Base Toyota / CSV: asignación automática por dealer y sucursal.<br>
Landing Page / Digital: asignación automática por distrito del cliente.<br>
Call Center (tercero): el operador registra el lead (manual o vía ingesta masiva — ver RF-CC-MASS) y lo asigna manualmente según criterio geográfico. La derivación post-ingesta se ejecuta automáticamente por consorcio y vendedor.<br>
Derivación in situ y cartera propia: el asesor receptor registra y asigna manualmente.</p></td><td><p>Actores: Asesor FC, Supervisor, Call Center, Jefe de Ventas<br>
Prioridad: MUST<br>
Módulo: M2 — Recepción de Leads</p></td><td>Alta</td><td>20</td><td>35</td><td>55</td><td><p>🔹 Microservicio: leads-service</p>
<p>🔹 Endpoints REST: POST /leads/intake/toyota · POST /leads/intake/landing · POST /leads/intake/callcenter · POST /leads/intake/insitu · POST /leads/assign · GET /leads/sources (≈6 endpoints)</p>
<p>🔹 Integración: Landing/Digital, CSV Toyota, CRM Dynamics</p>
<p>🔹 Detalle: 4 fuentes con lógica de asignación distinta (dealer/sucursal, distrito, consorcio/vendedor, manual). Parser de ingesta + reglas de distribución equitativa. Front: bandeja por fuente, indicador de origen.</p></td></tr>
<tr><td>REQ-03</td><td>Funcional</td><td><p>[RF-P07] Creación Manual de Lead con Concesionario Predeterminado</p>
<p>El asesor crea un lead manualmente. El concesionario se carga automáticamente según el perfil del asesor. Únicamente DNI y correo son obligatorios. Modelo y color del auto opcionales pero visibles desde el primer paso.<br>
Cuando el lead proviene de fuente automática (Base Toyota, Landing, ingesta masiva CC), el campo "fuente del lead" se carga automáticamente y no requiere intervención del asesor.</p></td><td><p>Actores: Asesor FC, Call Center<br>
Prioridad: MUST<br>
Módulo: M3 — Creación de Leads</p></td><td>Media</td><td>10</td><td>18</td><td>28</td><td><p>🔹 Microservicio: leads-service</p>
<p>🔹 Endpoints REST: POST /leads · GET /leads/{id} · GET /dealers/by-profile · GET /leads/check-duplicate (≈4 endpoints)</p>
<p>🔹 Integración: —</p>
<p>🔹 Detalle: Formulario de creación con concesionario precargado por perfil, DNI+correo obligatorios, detección de duplicados. CRUD básico.</p></td></tr>
<tr><td>REQ-04</td><td>Funcional</td><td><p>[RF-P07] Campo Asesor de Ventas del Dealer en Derivaciones y Base Toyota</p>
<p>Cuando la fuente del lead es "Derivado Dealer", el sistema muestra un campo adicional obligatorio: nombre del asesor de ventas del dealer. Para Base Toyota / CSV, el campo es opcional. No aparece para otras fuentes.</p></td><td><p>Actores: Asesor FC<br>
Prioridad: MUST<br>
Módulo: M3 — Creación de Leads</p></td><td>Media</td><td>5</td><td>9</td><td>14</td><td><p>🔹 Microservicio: leads-service</p>
<p>🔹 Endpoints REST: Reutiliza POST/PUT /leads con campo condicional (0 endpoints nuevos)</p>
<p>🔹 Integración: —</p>
<p>🔹 Detalle: Campo condicional 'asesor de ventas del dealer' según fuente. Lógica de visibilidad en formulario. Bajo esfuerzo.</p></td></tr>
<tr><td>REQ-05</td><td>Funcional</td><td><p>[RF-GL-01] Vista de Cartera de Leads con Estados y Métricas</p>
<p>El asesor ve su cartera con nombre del cliente, fuente, estado actual, fecha de registro, último intento de contacto, teléfono y correo. La ficha individual muestra modelo de auto, color y asesor dealer cuando aplica.</p></td><td><p>Actores: Asesor FC, Supervisor Comercial, Jefe de Ventas<br>
Prioridad: MUST<br>
Módulo: M4 — Gestión de Leads</p></td><td>Media</td><td>15</td><td>26</td><td>41</td><td><p>🔹 Microservicio: leads-service</p>
<p>🔹 Endpoints REST: GET /leads (cartera con filtros) · GET /leads/{id} · GET /leads/metrics (≈3 endpoints)</p>
<p>🔹 Integración: —</p>
<p>🔹 Detalle: Vista de cartera con datos consolidados + ficha individual. Consultas con filtros y paginación. Front: tabla/cards + ficha detallada.</p></td></tr>
<tr><td>REQ-06</td><td>Funcional</td><td><p>[RF-GL-02] Gestión de Estados del Lead y Registro de Intentos de Contacto</p>
<p>El asesor cambia el estado del lead y registra el resultado de cada intento. Cada cambio genera entrada en historial con timestamp y usuario. Al descartar, razón obligatoria. CERRADO se asigna automáticamente al recibir N° de contrato de NewCon.</p></td><td><p>Actores: Asesor FC<br>
Prioridad: MUST<br>
Módulo: M4 — Gestión de Leads</p></td><td>Media</td><td>20</td><td>35</td><td>55</td><td><p>🔹 Microservicio: leads-service</p>
<p>🔹 Endpoints REST: PUT /leads/{id}/status · POST /leads/{id}/contact-attempts · GET /leads/{id}/history (≈3 endpoints)</p>
<p>🔹 Integración: NewCon (cierre automático)</p>
<p>🔹 Detalle: Máquina de 6 estados con transiciones validadas, historial con timestamp, razón obligatoria al descartar, 2 macro-estados CC con sub-estados, módulo de notas. Lógica de estado compleja.</p></td></tr>
<tr><td>REQ-07</td><td>Funcional</td><td><p>[RF-GL-03] Notificación en Tiempo Real al Asesor — Asignación de Lead</p>
<p>El asesor y el supervisor responsable reciben notificación inmediata (push web y/o email) al asignarse un nuevo lead. Incluye: nombre del lead, fuente, teléfono y fecha de asignación.</p></td><td><p>Actores: Asesor FC, Supervisor Comercial<br>
Prioridad: MUST<br>
Módulo: M4 — Gestión de Leads</p></td><td>Media</td><td>10</td><td>18</td><td>28</td><td><p>🔹 Microservicio: leads-service + notification-service</p>
<p>🔹 Endpoints REST: Evento async (SQS) + POST /notifications/lead-assigned (≈1 endpoint + cola)</p>
<p>🔹 Integración: AWS End User Messaging, push web</p>
<p>🔹 Detalle: Notificación push web/email en tiempo real al asignar. Productor de evento a cola SQS, consumidor que envía. WebSocket o polling para push.</p></td></tr>
<tr><td>REQ-08</td><td>Funcional</td><td><p>[RF-GL-04] Trazabilidad de Actividad del Asesor para el Supervisor</p>
<p>El supervisor ve el historial cronológico de actividad de cada asesor de su equipo: leads contactados, cambios de estado, observaciones y tiempo entre asignación y primer contacto.</p></td><td><p>Actores: Supervisor Comercial, Jefe de Ventas<br>
Prioridad: MUST<br>
Módulo: M4 — Gestión de Leads</p></td><td>Media</td><td>8</td><td>14</td><td>22</td><td><p>🔹 Microservicio: leads-service</p>
<p>🔹 Endpoints REST: GET /supervisor/team-activity · GET /asesores/{id}/timeline (≈2 endpoints)</p>
<p>🔹 Integración: —</p>
<p>🔹 Detalle: Historial cronológico de actividad por asesor, tiempo entre asignación y contacto. Consultas agregadas de solo lectura.</p></td></tr>
<tr><td>REQ-09</td><td>Funcional</td><td><p>[RF-GL-05] Reasignación y Cobertura Temporal de Leads</p>
<p>El supervisor puede reasignar leads. Cuando un asesor no está disponible, asigna a 1 o 2 asesores de cobertura temporal. El lead aparece marcado como "En cobertura". El asesor titular se mantiene registrado.</p></td><td><p>Actores: Supervisor Comercial, Jefe de Ventas<br>
Prioridad: MUST<br>
Módulo: M4 — Gestión de Leads</p></td><td>Media</td><td>7</td><td>12</td><td>19</td><td><p>🔹 Microservicio: leads-service</p>
<p>🔹 Endpoints REST: PUT /leads/{id}/reassign · POST /leads/{id}/coverage · DELETE /leads/{id}/coverage (≈3 endpoints)</p>
<p>🔹 Integración: —</p>
<p>🔹 Detalle: Reasignación y cobertura temporal (1-2 asesores), marca 'En cobertura', titular preservado. Lógica de asignación múltiple.</p></td></tr>
<tr><td>REQ-10</td><td>Funcional</td><td><p>[RF-GL-06] Dashboard de Métricas del Equipo para el Supervisor</p>
<p>El supervisor accede a un dashboard con métricas de su equipo: leads activos por estado, evaluaciones realizadas, ventas cerradas y tasa de efectividad por asesor. Click en cualquier número filtra la lista.</p></td><td><p>Actores: Supervisor Comercial, Jefe de Ventas, Gerente Comercial<br>
Prioridad: MUST<br>
Módulo: M4 — Gestión de Leads</p></td><td>Media</td><td>5</td><td>9</td><td>14</td><td><p>🔹 Microservicio: leads-service + reporting-service</p>
<p>🔹 Endpoints REST: GET /dashboard/supervisor/metrics · GET /dashboard/supervisor/drilldown (≈2 endpoints)</p>
<p>🔹 Integración: QuickSight (opcional)</p>
<p>🔹 Detalle: Dashboard de equipo con métricas y drill-down al hacer click. Consultas agregadas. Front: panel con filtros encadenados.</p></td></tr>
<tr><td>REQ-11</td><td>Funcional</td><td><p>[RF-003] Soporte Multi-Documento de Identidad</p>
<p>El sistema acepta DNI peruano (8 dígitos), Carnet de Extranjería (CE), Pasaporte y RUC. Cada uno con su máscara. Para DNI y RUC se consulta fuente oficial (S-02) para autocompletar.</p></td><td><p>Actores: Asesor FC<br>
Prioridad: MUST<br>
Módulo: M5 — Identificación del Cliente</p></td><td>Media</td><td>8</td><td>9</td><td>17</td><td><p>🔹 Microservicio: identity-service</p>
<p>🔹 Endpoints REST: GET /identity/validate/{tipo}/{doc} · GET /identity/masks (≈2 endpoints)</p>
<p>🔹 Integración: Fuente oficial DNI/RUC (S-02 - RENIEC/SUNAT)</p>
<p>🔹 Detalle: 4 tipos de documento con máscara propia, consulta a fuente oficial para DNI/RUC. Lógica de validación por tipo.</p></td></tr>
<tr><td>REQ-12</td><td>Funcional</td><td><p>[RF-004] Validación de Identidad y Autocompletado de Datos</p>
<p>Al ingresar el documento, el sistema consulta al proveedor y autocompleta. Si falla, permite ingreso manual con advertencia. Verifica en tiempo real si el DNI ya existe.</p></td><td><p>Actores: Asesor FC<br>
Prioridad: MUST<br>
Módulo: M5 — Identificación del Cliente</p></td><td>Media</td><td>7</td><td>8</td><td>15</td><td><p>🔹 Microservicio: identity-service</p>
<p>🔹 Endpoints REST: GET /identity/autocomplete/{doc} · GET /identity/exists/{doc} (≈2 endpoints)</p>
<p>🔹 Integración: Proveedor validación identidad (S-02)</p>
<p>🔹 Detalle: Autocompletado con fallback manual ante timeout, detección de cliente existente con historial. Manejo de error de servicio externo.</p></td></tr>
<tr><td>REQ-13</td><td>Funcional</td><td><p>[RF-014] Validación de Formato de Datos Críticos</p>
<p>Validación en tiempo real: correo válido, teléfono celular peruano (9 dígitos, inicio con 9), longitud de documento. CE/Pasaporte aceptan teléfono internacional con indicativo de país.</p></td><td><p>Actores: Asesor FC<br>
Prioridad: MUST<br>
Módulo: M5 — Identificación del Cliente</p></td><td>Baja</td><td>3</td><td>4</td><td>7</td><td><p>🔹 Microservicio: identity-service (validación en front + back)</p>
<p>🔹 Endpoints REST: Validación en POST /leads y POST /identity (0 endpoints nuevos)</p>
<p>🔹 Integración: —</p>
<p>🔹 Detalle: Validación de formato en tiempo real (correo, celular 9 díg, teléfono internacional para CE/Pasaporte). Reglas de validación. Bajo esfuerzo.</p></td></tr>
<tr><td>REQ-14</td><td>Funcional</td><td><p>[RF-012] Captura y Almacenamiento del Documento de Identidad</p>
<p>El asesor captura imagen del DNI (anverso y reverso). Opcional en proforma, obligatorio antes de firma biométrica. Almacenamiento en AWS S3 con Object Lock (WORM).</p></td><td><p>Actores: Asesor FC<br>
Prioridad: MUST<br>
Módulo: M5 — Identificación del Cliente</p></td><td>Media</td><td>7</td><td>8</td><td>15</td><td><p>🔹 Microservicio: identity-service + document-service</p>
<p>🔹 Endpoints REST: POST /documents/id-capture · GET /documents/{id} (≈2 endpoints)</p>
<p>🔹 Integración: AWS S3 (Object Lock WORM)</p>
<p>🔹 Detalle: Captura anverso/reverso, obligatorio antes de firma, almacenamiento WORM. Manejo de archivos + S3.</p></td></tr>
<tr><td>REQ-15</td><td>Funcional</td><td><p>[RF-005] Evaluación de Riesgo — Persona Natural (PLAFT + Equifax)</p>
<p>El sistema ejecuta dos validaciones en secuencia de forma invisible para el asesor:<br>
1. PLAFT–Inspektor primero, de forma automática. Solo si PLAFT aprueba, se consulta Equifax.<br>
2. El asesor ve el resultado: Aprobado, Rechazado o En revisión.<br>
Visibilidad de rechazo (confirmado 18/06): cuando Equifax retorna rechazo, el sistema muestra al asesor un mensaje GENÉRICO ACCIONABLE que le ayuda a tomar acción comercial (por ejemplo: indicios genéricos que sugieren que reducir la cuota podría llevar a aprobación). El mensaje NO incluye detalle técnico ni distingue si el rechazo se originó en PLAFT o en Equifax. La distinción PLAFT vs. Equifax permanece interna por compliance. El Oficial de Cumplimiento mantiene acceso al detalle completo de PLAFT.<br>
Re-evaluación tras rechazo (confirmado 18/06): NO hay límite de reintentos. El asesor puede modificar los datos de cuota (monto, plazo, número de certificados) y volver a evaluar tantas veces como sea necesario. La re-evaluación NO se limita a reducir el monto: el asesor puede cambiar cualquier parámetro de la cuota para negociar con el cliente.<br>
Bloqueo de vacante: al iniciar la evaluación, la vacante del grupo/certificado seleccionado queda bloqueada (reservada en memoria). Para modificar el grupo o certificado tras una evaluación, el asesor debe usar el control "Reevaluar" que libera la reserva y permite volver al paso de selección — ver RF-008 y RF-EVAL-LOCK.<br>
Declaración Jurada de Ingresos (DDJJ) — Persona Natural: el sistema captura antes de la evaluación:<br>
Situación laboral: Dependiente / Independiente<br>
Profesión / Cargo actual<br>
Giro o actividad de la empresa<br>
Nombre del centro de trabajo (empleador)<br>
RUC del empleador<br>
Dirección laboral<br>
Fecha de ingreso al empleo actual<br>
Ingreso neto mensual en USD (declaración jurada)<br>
Vinculación con MAF EAFC S.A.: Sí / No<br>
Persona Expuesta Políticamente (PEP): Sí / No</p></td><td><p>Actores: Asesor FC, Oficial de Cumplimiento, Supervisor<br>
Prioridad: MUST<br>
Módulo: M6 — Evaluación de Riesgo</p></td><td>Muy Alta</td><td>45</td><td>70</td><td>115</td><td><p>🔹 Microservicio: risk-service + integration-service</p>
<p>🔹 Endpoints REST: POST /risk/evaluate · POST /risk/re-evaluate · GET /risk/{leadId}/result · POST /risk/ddjj · POST /vacancy/lock · DELETE /vacancy/lock · GET /risk/{id}/plaft-detail (≈7 endpoints)</p>
<p>🔹 Integración: PLAFT-Inspektor + Equifax (secuencial)</p>
<p>🔹 Detalle: Orquestación PLAFT→Equifax secuencial e invisible, 3 resultados, mensaje genérico accionable, reintentos ilimitados, bloqueo de vacante en memoria, captura DDJJ (11 campos), estado PLAFT 'Consultar' que pausa, acceso Oficial Cumplimiento. Módulo más complejo: orquestación + manejo de errores de 2 APIs + lógica de estado de reserva. Justifica las 115h.</p></td></tr>
<tr><td>REQ-16</td><td>Funcional</td><td><p>[RF-006] Evaluación de Riesgo — Persona Jurídica (Manual)</p>
<p>Para personas jurídicas (RUC), no se consume Equifax. PLAFT-Inspektor primero; si aprueba, pasa al Analista de Créditos de MAF para evaluación manual.</p></td><td><p>Actores: Asesor FC, Analista de Créditos, Oficial de Cumplimiento<br>
Prioridad: MUST<br>
Módulo: M6 — Evaluación de Riesgo</p></td><td>Alta</td><td>10</td><td>15</td><td>25</td><td><p>🔹 Microservicio: risk-service</p>
<p>🔹 Endpoints REST: POST /risk/evaluate/juridica · PUT /risk/{id}/analyst-decision (≈2 endpoints)</p>
<p>🔹 Integración: PLAFT-Inspektor</p>
<p>🔹 Detalle: Persona jurídica sin Equifax, derivación a Analista de Créditos para evaluación manual. Flujo de aprobación manual.</p></td></tr>
<tr><td>REQ-17</td><td>Funcional</td><td><p>[RF-021] Gestión de Co-titularidad</p>
<p>Ambos titulares pasan la evaluación de forma independiente. El contrato solo avanza si ambos aprueban.</p></td><td><p>Actores: Asesor FC, Co-titular<br>
Prioridad: MUST<br>
Módulo: M6 — Evaluación de Riesgo</p></td><td>Media</td><td>10</td><td>15</td><td>25</td><td><p>🔹 Microservicio: risk-service</p>
<p>🔹 Endpoints REST: POST /risk/co-titular · GET /risk/{leadId}/co-titular-status (≈2 endpoints)</p>
<p>🔹 Integración: PLAFT + Equifax (por cada titular)</p>
<p>🔹 Detalle: Evaluación independiente de ambos titulares, contrato avanza solo si ambos aprueban. Duplica lógica de evaluación + agregación de resultados.</p></td></tr>
<tr><td>REQ-18</td><td>Funcional</td><td><p>[RF-008] Selección en Cascada de Programa, Grupo y Certificado</p>
<p>Flujo en cascada con API NewCon en tiempo real: Programa → Grupo → Certificado (hasta 5). Validación de vacantes antes de confirmar.<br>
Al confirmar la selección e iniciar evaluación de riesgo, la vacante queda bloqueada (ver RF-EVAL-LOCK). Para modificar la selección tras evaluar, el asesor debe usar el botón Reevaluar que libera la reserva.</p></td><td><p>Actores: Asesor FC<br>
Prioridad: MUST<br>
Módulo: M7 — Selección de Programa, Grupo y Certificado</p></td><td>Alta</td><td>21</td><td>24</td><td>45</td><td><p>🔹 Microservicio: selection-service + integration-service</p>
<p>🔹 Endpoints REST: GET /programs · GET /programs/{id}/groups · GET /groups/{id}/certificates · POST /selection · GET /selection/{id}/vacancy-check (≈5 endpoints)</p>
<p>🔹 Integración: NewCon (CORE, tiempo real)</p>
<p>🔹 Detalle: Cascada Programa→Grupo→Certificado contra NewCon en tiempo real, hasta 5 certificados con valor independiente, validación de vacantes, coordinación con bloqueo de M6. Integración NewCon + lógica de cascada.</p></td></tr>
<tr><td>REQ-19</td><td>Funcional</td><td><p>[RF-010] Generación Automática de Proforma con Cuota 1 + CIA</p>
<p>El sistema genera la proforma automáticamente. Debe mostrar EXPLÍCITAMENTE dos conceptos diferenciados:<br>
Cuota 1 (primera cuota mensual del programa) — calculada por NewCon.<br>
CIA (Cuota de Inscripción) — equivalente al 4% del valor de la cuota mensual, obtenida de NewCon.<br>
Adicionalmente: datos del cliente, grupo y certificado(s) seleccionados, modelo/color tentativo del vehículo, plazo del programa. PDF descargable. Todos los montos en USD.<br>
La proforma debe ser fiel al contenido del contrato, ya que el contrato jala la información de la proforma. Cualquier campo que aparezca en el contrato debe estar presente en la proforma.</p></td><td><p>Actores: Asesor FC<br>
Prioridad: MUST<br>
Módulo: M8 — Proforma, OTP y Documentos Normativos</p></td><td>Alta</td><td>17</td><td>19</td><td>36</td><td><p>🔹 Microservicio: proforma-service + integration-service</p>
<p>🔹 Endpoints REST: POST /proforma/generate · GET /proforma/{id} · GET /proforma/{id}/pdf (≈3 endpoints)</p>
<p>🔹 Integración: NewCon (montos Cuota 1 + CIA)</p>
<p>🔹 Detalle: Proforma automática con 2 conceptos (Cuota 1 + CIA 4%), fiel al contrato, PDF descargable, montos USD. Generación de documento + cálculos de NewCon.</p></td></tr>
<tr><td>REQ-20</td><td>Funcional</td><td><p>[RF-009] Validación OTP para Consentimiento Informado del Cliente</p>
<p>OTP enviado al cliente por Correo, WhatsApp o SMS. Libera envío de documentos normativos solo tras confirmación exitosa.</p></td><td><p>Actores: Asesor FC, Cliente<br>
Prioridad: MUST<br>
Módulo: M8 — Proforma, OTP y Documentos Normativos</p></td><td>Media</td><td>10</td><td>11</td><td>21</td><td><p>🔹 Microservicio: proforma-service + notification-service</p>
<p>🔹 Endpoints REST: POST /otp/send · POST /otp/verify (≈2 endpoints)</p>
<p>🔹 Integración: AWS End User Messaging (correo/WhatsApp/SMS)</p>
<p>🔹 Detalle: OTP multicanal con vigencia, libera documentos solo tras confirmación. Generación y validación de OTP + integración mensajería.</p></td></tr>
<tr><td>REQ-21</td><td>Funcional</td><td><p>[RF-011] Generación y Envío de Documentos Normativos</p>
<p>Tras OTP, el sistema envía 6 documentos normativos: Política de Privacidad, Contrato de Adhesión, Reglamento del Programa, Prospecto Informativo, Declaración Jurada de Ingresos, Formato de Consentimiento. Almacenados en S3 WORM.</p></td><td><p>Actores: Asesor FC<br>
Prioridad: MUST<br>
Módulo: M8 — Proforma, OTP y Documentos Normativos</p></td><td>Media</td><td>11</td><td>12</td><td>23</td><td><p>🔹 Microservicio: document-service + notification-service</p>
<p>🔹 Endpoints REST: POST /documents/normativos/generate · POST /documents/send (≈2 endpoints)</p>
<p>🔹 Integración: AWS S3 (WORM), End User Messaging</p>
<p>🔹 Detalle: Generación de 6 documentos normativos + envío multicanal + almacenamiento WORM. Generación de PDFs desde plantillas.</p></td></tr>
<tr><td>REQ-22</td><td>Funcional</td><td><p>[RF-013] Generación de Orden de Pago — Integración Directa con Kashio</p>
<p>La plataforma se integra directamente con Kashio. La orden de pago se construye explícitamente con DOS conceptos diferenciados (confirmado 18/06):<br>
Concepto 1: Cuota 1 (primera cuota mensual).<br>
Concepto 2: CIA (Cuota de Inscripción).<br>
La orden NO debe contener un tercer concepto ni separar la inscripción en partes adicionales — son únicamente dos líneas.<br>
Vigencia de la orden: 48 horas desde su generación. Las cuotas 2 en adelante son gestionadas por Operaciones con NewCon, fuera del alcance.</p></td><td><p>Actores: Asesor FC<br>
Prioridad: MUST<br>
Módulo: M9 — Generación de Orden de Pago</p></td><td>Muy Alta</td><td>52</td><td>100</td><td>152</td><td><p>🔹 Microservicio: payment-service + integration-service</p>
<p>🔹 Endpoints REST: POST /payment/order · GET /payment/{id}/status · POST /payment/partial · GET /payment/{leadId}/history · POST /payment/webhook (Kashio) · PUT /payment/{id}/expire (≈6 endpoints)</p>
<p>🔹 Integración: Kashio (orden + webhook confirmación)</p>
<p>🔹 Detalle: Integración directa Kashio, 2 conceptos exactos, vigencia 48h server-side (override), pago total vs parcial manual (CIA financiable desde 1 USD, Cuota 1 íntegra), historial de saldos, webhook de confirmación, manejo de errores de pasarela. 2º módulo más complejo: integración + casuísticas de pago + 48h. Justifica las 152h.</p></td></tr>
<tr><td>REQ-23</td><td>Funcional</td><td><p>[RF-015] Firma Electrónica Biométrica — proveedor a confirmar (S-01)</p>
<p>Una vez confirmado el pago total (o el cierre del saldo en pago parcial), el sistema dispara el proceso de firma con el proveedor biométrico (S-01). El cliente recibe enlace en su celular y realiza validación biométrica facial. Co-titulares firman de forma independiente.<br>
Cuenta de Devolución: el asesor registra antes de la firma — Cheque o Cuenta bancaria en USD (banco + número).</p></td><td><p>Actores: Asesor FC, Cliente, Co-titular<br>
Prioridad: MUST<br>
Módulo: M10 — Firma Biométrica y Cierre</p></td><td>Alta</td><td>18</td><td>30</td><td>48</td><td><p>🔹 Microservicio: signature-service + integration-service</p>
<p>🔹 Endpoints REST: POST /signature/trigger · GET /signature/{id}/status · POST /signature/webhook · POST /devolution-account (≈4 endpoints)</p>
<p>🔹 Integración: Keynua/biométrico (S-01)</p>
<p>🔹 Detalle: Disparo de firma tras pago, validación biométrica facial, co-titulares independientes, registro cuenta de devolución, webhook de firma. Integración proveedor externo + flujo de firma.</p></td></tr>
<tr><td>REQ-24</td><td>Funcional</td><td><p>[RF-016] Generación de N° de Contrato y Separación de Vacante</p>
<p>El sistema envía datos a NewCon, que retorna número de contrato y confirma separación de vacante. No modificable por el asesor.</p></td><td><p>Actores: Asesor FC, Operaciones<br>
Prioridad: MUST<br>
Módulo: M10 — Firma Biométrica y Cierre</p></td><td>Media</td><td>9</td><td>15</td><td>24</td><td><p>🔹 Microservicio: contract-service + integration-service</p>
<p>🔹 Endpoints REST: POST /contract/generate · GET /contract/{id} (≈2 endpoints)</p>
<p>🔹 Integración: NewCon (N° contrato + vacante)</p>
<p>🔹 Detalle: Envío a NewCon, retorno de N° de contrato, separación de vacante, no modificable. Integración NewCon + cierre.</p></td></tr>
<tr><td>REQ-25</td><td>Funcional</td><td><p>[RF-017] Visor del Expediente y Envío a Operaciones</p>
<p>Previsualización del expediente con checklist de documentos obligatorio. Al confirmar, envío a Operaciones por correo + alerta dentro de la plataforma.</p></td><td><p>Actores: Asesor FC, Operaciones<br>
Prioridad: MUST<br>
Módulo: M10 — Firma Biométrica y Cierre</p></td><td>Media</td><td>9</td><td>15</td><td>24</td><td><p>🔹 Microservicio: contract-service + notification-service</p>
<p>🔹 Endpoints REST: GET /expediente/{id}/preview · POST /expediente/{id}/send-operations (≈2 endpoints)</p>
<p>🔹 Integración: End User Messaging (correo + alerta)</p>
<p>🔹 Detalle: Visor con checklist obligatorio que bloquea envío, envío a Operaciones por correo + alerta in-app. Validación de completitud.</p></td></tr>
<tr><td>REQ-26</td><td>Funcional</td><td><p>[RF-019] Almacenamiento Centralizado de Documentación</p>
<p>Toda la documentación en AWS S3 con Object Lock (WORM). Retención mínima 5 años por SBS.</p></td><td><p>Actores: Todos los roles<br>
Prioridad: MUST<br>
Módulo: M10 — Firma Biométrica y Cierre</p></td><td>Baja</td><td>4</td><td>8</td><td>12</td><td><p>🔹 Microservicio: document-service (transversal)</p>
<p>🔹 Endpoints REST: Política de almacenamiento en todos los POST de documentos (0 endpoints nuevos)</p>
<p>🔹 Integración: AWS S3 (Object Lock WORM)</p>
<p>🔹 Detalle: Almacenamiento centralizado WORM, retención 5 años SBS. Configuración de bucket policy + Object Lock. Transversal.</p></td></tr>
<tr><td>REQ-27</td><td>Funcional</td><td><p>[RF-023] Registro de Llamada de Bienvenida — Operaciones</p>
<p>Operaciones registra llamada de bienvenida. Estado del proceso queda CERRADO tras este registro.</p></td><td><p>Actores: Operaciones<br>
Prioridad: COULD<br>
Módulo: M10 — Firma Biométrica y Cierre</p></td><td>Baja</td><td>4</td><td>8</td><td>12</td><td><p>🔹 Microservicio: contract-service</p>
<p>🔹 Endpoints REST: POST /welcome-call · PUT /leads/{id}/close (≈2 endpoints)</p>
<p>🔹 Integración: —</p>
<p>🔹 Detalle: Registro de llamada de bienvenida por Operaciones, estado CERRADO definitivo. CRUD simple. Prioridad COULD.</p></td></tr>
<tr><td>REQ-28</td><td>Funcional</td><td><p>[RF-020] Módulo de Reportería y Dashboard Operativo</p>
<p>El sistema incluye 4 dashboards nativos calculados sobre los datos de la plataforma:<br>
Dashboard 1 — Panel del Asesor (Asesor FC, Jefe de Ventas):<br>
Mis leads por estado · Leads sin movimiento hace más de X días · Evaluaciones realizadas vs. meta diaria · Ventas cerradas del mes vs. tasa de efectividad · Historial mensual de ventas — funnel propio · Citas agendadas<br>
Dashboard 2 — Panel del Supervisor:<br>
Leads activos por estado, desglosados por asesor · Leads NUEVO sin gestión · Evaluaciones por asesor vs. meta del equipo · Ventas cerradas por asesor · Último contacto registrado por asesor<br>
Dashboard 3 — Panel Gerencial:<br>
Leads del mes por sucursal y zona · Contratos cerrados por sucursal · Tasa de conversión consolidada · Evaluaciones a nivel zona · Asesores activos por sucursal<br>
Dashboard 4 — Panel Call Center (Operador CC, Supervisor CC, Calidad):<br>
Leads gestionados por operador · Tasa de contactabilidad · Desglose por sub-estado (En seguimiento, Descartado, Venta en trámite, Venta cerrada, Teléfono incorrecto, No contesta) · Citas agendadas tras derivación · Tasa de conversión derivación → venta cerrada (trazabilidad cruzada) · Tiempo promedio entre primer contacto y derivación<br>
Implementación: a definir entre dashboards nativos calculados sobre los datos de la plataforma (QuickSight embebido) vs. plataforma externa separada (Power BI o QuickSight analítico). Decisión técnica pendiente — depende de la experiencia previa del equipo de implementación. Los datos históricos quedarán en servicios de AWS, lo que habilita ambos modelos.</p></td><td><p>Actores: Asesor FC, Supervisor Comercial, Jefe de Ventas, Gerente Comercial, Call Center, Calidad<br>
Prioridad: SHOULD<br>
Módulo: M11 — Reportería y Dashboard</p></td><td>Alta</td><td>0</td><td>80</td><td>80</td><td><p>🔹 Microservicio: reporting-service + Data Engineer</p>
<p>🔹 Endpoints REST: 4 datasets QuickSight + GET /dashboard/{role}/data (≈5 endpoints/datasets)</p>
<p>🔹 Integración: Amazon QuickSight (embebido)</p>
<p>🔹 Detalle: 4 dashboards (Asesor, Supervisor, Gerencial, Call Center) con KPIs, filtros encadenados, drill-down, trazabilidad cruzada CC. Construcción de datasets + embedding. Data Engineer 80h.</p></td></tr>
<tr><td>REQ-29</td><td>Funcional</td><td><p>[M12 — BackOffice y Administración] Módulo de configuración y administración de la plataforma. Gestión de usuarios y asignación de roles, configuración de parámetros de negocio (N° de letras de la CIA, metas, sub-estados parametrizables del Call Center), administración de catálogos y configuración del sistema. Operado por el rol Administrador. Cuenta con pantallas propias en los wireframes.</p></td><td><p>Actores: Administrador<br>
Prioridad: MUST<br>
Módulo: M12 — BackOffice y Administración</p></td><td>Alta</td><td>52</td><td>124</td><td>176</td><td><p>🔹 Microservicio: admin-service</p>
<p>🔹 Endpoints REST: CRUD de usuarios, roles, parámetros, catálogos, configuración (≈12-15 endpoints)</p>
<p>🔹 Integración: Cognito, NewCon (parámetros)</p>
<p>🔹 Detalle: Módulo de administración: gestión de usuarios y roles, configuración de parámetros de negocio (N letras CIA, sub-estados CC, metas), catálogos. CRUD extenso para el rol Administrador.</p></td></tr>
<tr><td>RNF-01</td><td>No Funcional</td><td><p>[Manejo de Excepciones]</p>
<p>Errores de integraciones externas capturados, registrados y presentados con mensajes claros. No se muestran errores técnicos al usuario final.</p></td><td><p>Transversal a toda la plataforma</p></td><td>—</td><td></td><td></td><td></td><td></td></tr>
<tr><td>RNF-02</td><td>No Funcional</td><td><p>[Rendimiento]</p>
<p>Equifax &lt; 2 min; PLAFT-Inspektor &lt; 60 seg; carga del dashboard y proforma &lt; 3 seg.</p></td><td><p>Transversal a toda la plataforma</p></td><td>—</td><td></td><td></td><td></td><td></td></tr>
<tr><td>RNF-03</td><td>No Funcional</td><td><p>[Disponibilidad]</p>
<p>≥ 99.5% en horario comercial (L-S 8:00-20:00 Perú). Infraestructura multi-AZ.</p></td><td><p>Transversal a toda la plataforma</p></td><td>—</td><td></td><td></td><td></td><td></td></tr>
<tr><td>RNF-04</td><td>No Funcional</td><td><p>[Seguridad]</p>
<p>Credenciales individuales vía AWS Cognito. Datos sensibles cifrados en tránsito (TLS 1.2+) y reposo (KMS). Aprobación del área de Seguridad de MAF antes de PROD.</p></td><td><p>Transversal a toda la plataforma</p></td><td>—</td><td></td><td></td><td></td><td></td></tr>
<tr><td>RNF-05</td><td>No Funcional</td><td><p>[Escalabilidad]</p>
<p>43 asesores simultáneos como carga base (~650 leads/día), más operadores de Call Center concurrentes (20+ sin restricción, validado 18/06). Escalado horizontal con AWS Auto Scaling.</p></td><td><p>Transversal a toda la plataforma</p></td><td>—</td><td></td><td></td><td></td><td></td></tr>
<tr><td>RNF-06</td><td>No Funcional</td><td><p>[Usabilidad]</p>
<p>Interfaz responsive. Diseño primario escritorio, adaptación móvil. Compatible con Chrome y Edge.</p></td><td><p>Transversal a toda la plataforma</p></td><td>—</td><td></td><td></td><td></td><td></td></tr>
<tr><td>RNF-07</td><td>No Funcional</td><td><p>[Cumplimiento Normativo]</p>
<p>S3 Object Lock (WORM) retención 5 años por SBS. Cumplimiento Ley 29733. Firma exclusivamente biométrica EAFC.</p></td><td><p>Transversal a toda la plataforma</p></td><td>—</td><td></td><td></td><td></td><td></td></tr>
<tr><td>RNF-08</td><td>No Funcional</td><td><p>[Integración]</p>
<p>API REST. Sistemas Fase 1: CRM Dynamics 365, NewCon (CORE), S-03 crediticia (PLAFT+Equifax), S-02 identidad, S-01 firma, Kashio, AWS End User Messaging.</p></td><td><p>Transversal a toda la plataforma</p></td><td>—</td><td></td><td></td><td></td><td></td></tr>
<tr><td>RNF-09</td><td>No Funcional</td><td><p>[Mantenibilidad]</p>
<p>Arquitectura modular. IaC con CloudFormation. CI/CD a DEV/QA/PROD. Documentación: SAD, Swagger, manuales.</p></td><td><p>Transversal a toda la plataforma</p></td><td>—</td><td></td><td></td><td></td><td></td></tr>
<tr><td colspan="9"><strong>DESARROLLO TRANSVERSAL TÉCNICO (sin pantallas de negocio)</strong></td></tr>
<tr><td>DEV-INTEG</td><td>Técnico</td><td><p>Integraciones, manejo de colas (SQS), motores de eventos, notificaciones proactivas, trazabilidad y logs completos. Capa de orquestación asíncrona entre microservicios y proveedores externos. No tiene pantallas de negocio propias.</p></td><td></td><td>Alta</td><td>60</td><td>44</td><td>104</td><td><p>🔹 Microservicio: integration-service + message-broker</p>
<p>🔹 Orquestación transversal: 5 colas SQS, consumers, reintentos, DLQ, logs (≈sin endpoints REST públicos)</p>
<p>🔹 Integración: SQS, SNS, todas las APIs externas</p>
<p>🔹 Detalle: Capa transversal: manejo de colas, motores de eventos, notificaciones proactivas, trazabilidad y logs completos. Orquesta la comunicación asíncrona entre todos los microservicios y con los proveedores externos.</p></td></tr>
<tr><td colspan="5"><strong>TOTAL DESARROLLO DE SOFTWARE</strong></td><td><strong>481</strong></td><td><strong>831</strong></td><td><strong>1312</strong></td><td></td></tr>
</tbody>
</table>

> Nota: horas de desarrollo del Gantt distribuidas por requerimiento. BackOffice y Administración (REQ-29 / M12) es un módulo funcional con pantallas propias en wireframes. Integraciones es la única partida técnica transversal sin pantallas de negocio. Total alineado con 'Desarrollo de Módulos en Paralelo' del Gantt (1,312 h). Horas incluyen pruebas funcionales (4h por bloque).


---

## Bloque 3: Nuevos Requerimientos UX - v2.0 (Reunión 03-AGO-2026)

Los siguientes requerimientos fueron identificados durante la revisión del demo con el Account Manager y aprobados para implementación inmediata.

<table>
<thead>
<tr><th>ITEM</th><th>TIPO DE REQUERIMIENTO</th><th>DESCRIPCIÓN</th><th>REQUERIMIENTO TÉCNICO / CONSIDERACIONES ADICIONALES</th><th>COMPLEJIDAD</th><th>HORAS FRONTEND</th><th>HORAS BACKEND</th><th>Total del Requerimiento</th><th>Sustento técnico</th></tr>
</thead>
<tbody>

<tr><td>REQ-AGT-01</td><td>UX/Frontend</td><td><p>[RF-AGT-01] Sistema de Notificaciones Proactivas</p>
<p>Campanita de notificaciones en el header con badge indicando cantidad de notificaciones no leídas. Tipos de notificaciones: recordatorios manuales del vendedor, alertas de sistema (leads sin movimiento), leads próximos a cerrarse (5 días sin respuesta), tareas pendientes. Dropdown con lista de notificaciones, timestamp relativo, colores por urgencia (rojo/amarillo/gris). Marcar como leída individual o todas a la vez.</p>
<p>Justificación: "Garantizar que ningún lead se enfríe por falta de seguimiento"</p></td><td><p>Actores: Asesor FC, Supervisor, Jefe de Ventas<br>
Prioridad: HIGH<br>
Módulo: M-UX — Experiencia de Usuario</p></td><td>Media</td><td>12</td><td>16</td><td>28</td><td><p>🔹 Componente: Notificaciones.js (232 líneas)<br>
🔹 API REST: GET /notifications · PUT /notifications/{id}/read · PUT /notifications/read-all<br>
🔹 Integración: WebSockets o polling para real-time<br>
🔹 Ubicación: GlobalHeader<br>
🔹 Estado: ✅ Implementado frontend (mock data)</p></td></tr>

<tr><td>REQ-AGT-02</td><td>UX/Frontend</td><td><p>[RF-AGT-02] Dashboard "Mi Desempeño" para Vendedor</p>
<p>Dashboard personal del vendedor mostrando: meta del mes (configurable), ventas actuales, tasa de cierre, progreso visual con barra comparativa (actual vs esperado), colores dinámicos según estado (verde: meta superada, azul: adelantado, amarillo: ritmo aceptable, rojo: requiere acción), mensaje motivacional contextual.</p>
<p>Justificación: "El vendedor tiene que tener claridad de cómo va, porque pucha, tienes que ajustar o puedes respirar un poquito"</p></td><td><p>Actores: Asesor FC<br>
Prioridad: HIGH<br>
Módulo: M-UX — Experiencia de Usuario</p></td><td>Media</td><td>10</td><td>12</td><td>22</td><td><p>🔹 Componente: MiDesempenio.js (190 líneas)<br>
🔹 API REST: GET /vendedores/{id}/metrics · GET /vendedores/{id}/meta<br>
🔹 Ubicación: Dashboard vendedor (sección 2)<br>
🔹 Cálculos: Progreso %, diferencia vs esperado<br>
🔹 Estado: ✅ Implementado frontend (mock data)</p></td></tr>

<tr><td>REQ-AGT-03</td><td>UX/Frontend</td><td><p>[RF-AGT-03] Onboarding Guiado Interactivo</p>
<p>Tour de 6 pasos para nuevos vendedores con spotlight effect (resalta elemento activo, sombrea el resto), tooltips posicionables (top/bottom/left/right), progreso visual, navegación prev/next, puede saltarse en cualquier momento. Pasos: Sidebar, Nuevo Lead, Agente Asistente, Mi Desempeño, Notificaciones, Copiloto.</p>
<p>Justificación: Reducir tiempo de capacitación de nuevos vendedores (de horas a minutos)</p></td><td><p>Actores: Asesor FC (nuevos)<br>
Prioridad: MEDIUM<br>
Módulo: M-UX — Experiencia de Usuario</p></td><td>Media</td><td>16</td><td>8</td><td>24</td><td><p>🔹 Componente: OnboardingGuiado.js (265 líneas)<br>
🔹 API REST: GET /usuarios/{id}/onboarding-status · PUT /usuarios/{id}/onboarding-complete<br>
🔹 Tecnología: CSS overlay + scroll automático<br>
🔹 Estado: ✅ Implementado frontend (activación manual)</p></td></tr>

<tr><td>REQ-AGT-04</td><td>AI/Generativa</td><td><p>[RF-AGT-04] Estrategia de Venta con IA Generativa</p>
<p>El vendedor puede preguntar al Copiloto: "Ármame estrategia para llegar a mi meta" y recibe análisis de progreso vs meta, ventas por día requeridas, acciones recomendadas según estado (adelantado/atrasado). También: "Ayúdame a prepararme para mi cita de mañana" retorna temas a cubrir, objeciones probables con respuestas, estrategia rápida según perfil del cliente.</p>
<p>Justificación: Vendedores no muy tecnológicos necesitan guía para planificar</p></td><td><p>Actores: Asesor FC<br>
Prioridad: MEDIUM<br>
Módulo: M-AI — Agentes de IA</p></td><td>Alta</td><td>8</td><td>24</td><td>32</td><td><p>🔹 Funciones: generarEstrategiaVenta(), prepararCita()<br>
🔹 API REST: POST /ai/estrategia · POST /ai/preparar-cita<br>
🔹 Backend: LLM (GPT-4/Claude) con contexto del vendedor<br>
🔹 Frontend: Integrado en AgenteCopiloto.js<br>
🔹 Estado: ✅ Implementado (templates, no LLM real)</p></td></tr>

<tr><td>REQ-AGT-05</td><td>UX/Frontend</td><td><p>[RF-AGT-05] Ampliación Base de Conocimientos del Copiloto</p>
<p>El Copiloto MAF (Agente 1) debe responder no solo sobre el sistema y datos del vendedor, sino también sobre negocio MAF: políticas de cuotas, documentos requeridos, cómo funciona EUFIC, plazos de desembolso, scoring de leads, estrategias de cierre. Total: 13 preguntas FAQ (6 originales + 7 nuevas).</p>
<p>Justificación: "La guía puede ayudar un poco a suplir esa información para que el supervisor se encargue de cosas mucho más estratégicas"</p></td><td><p>Actores: Asesor FC<br>
Prioridad: HIGH<br>
Módulo: M-AI — Agentes de IA</p></td><td>Baja</td><td>6</td><td>12</td><td>18</td><td><p>🔹 Archivo: mockData.js (FAQ ampliado)<br>
🔹 API REST: GET /knowledge/faq · GET /knowledge/search<br>
🔹 Backend: RAG sobre documentación MAF<br>
🔹 Estado: ✅ Implementado (FAQ estático)</p></td></tr>

<tr><td>REQ-AGT-06</td><td>UX/Frontend</td><td><p>[RF-AGT-06] Renombrar Agente 2 y Cambiar Acción Principal</p>
<p>Agente "Asistente Personal" pasa a llamarse "Seguimiento y Tareas". Botón principal "Llamar ahora" (rojo) cambia a "Enviar correo de seguimiento" (azul). Razón: El negocio de MAF es presencial, el flujo real es: 1) Enviar correo con template, 2) Llamar para agendar cita, 3) Reunión presencial.</p>
<p>Justificación: Acción más realista para negocio presencial</p></td><td><p>Actores: Asesor FC<br>
Prioridad: HIGH<br>
Módulo: M-AI — Agentes de IA</p></td><td>Baja</td><td>2</td><td>6</td><td>8</td><td><p>🔹 Archivo: AgenteAsistente.js<br>
🔹 Cambios: Título, botón (texto + color + acción)<br>
🔹 API REST: POST /leads/{id}/send-email (template)<br>
🔹 Estado: ✅ Implementado</p></td></tr>

<tr><td>REQ-AGT-07</td><td>UX/Frontend</td><td><p>[RF-AGT-07] Preguntas Sugeridas Más Visibles (Chips)</p>
<p>Los chips de preguntas sugeridas en Agente 1 (Copiloto) y Agente 4 (Copiloto Ejecutivo) deben ser mucho más visibles: chips rojos/azules redondeados (`rounded-full`), hover effect con `scale-105`, icono 💡, 4 preguntas contextuales por pantalla.</p>
<p>Justificación: "La audiencia tiene que mirarlo y entenderlo antes que yo diga"</p></td><td><p>Actores: Todos<br>
Prioridad: MEDIUM<br>
Módulo: M-AI — Agentes de IA</p></td><td>Baja</td><td>3</td><td>0</td><td>3</td><td><p>🔹 Archivos: AgenteCopiloto.js, AgenteCopilotoEjecutivo.js<br>
🔹 Cambios: CSS (colores, border-radius, hover)<br>
🔹 Estado: ✅ Implementado</p></td></tr>

<tr><td>REQ-AGT-08</td><td>UX/Frontend</td><td><p>[RF-AGT-08] Rediseño del Dashboard del Vendedor (3 Secciones)</p>
<p>El dashboard del vendedor debe mostrar primero las herramientas agénticas (máximo impacto visual), luego la lista tradicional. Orden: 1) Seguimiento y Tareas (Agente 2), 2) Mi Desempeño, 3) Lista de Leads. Objetivo: Maximizar adopción de agentes.</p>
<p>Justificación: "Disminuir mucho ese tiempo de capacitaciones. Todas las herramientas para que solo se enfoquen en conversar con el cliente"</p></td><td><p>Actores: Asesor FC<br>
Prioridad: HIGH<br>
Módulo: M-UX — Experiencia de Usuario</p></td><td>Baja</td><td>4</td><td>0</td><td>4</td><td><p>🔹 Archivo: App.js (dashboard sección)<br>
🔹 Cambios: Orden de componentes<br>
🔹 Estado: ✅ Implementado</p></td></tr>

</tbody>
</table>

### Resumen de Requerimientos v2.0

**Total nuevos requerimientos:** 8  
**Horas estimadas frontend:** 61h  
**Horas estimadas backend:** 78h  
**Total:** 139h

**Estado de implementación:**
- ✅ Frontend: 100% implementado (mock data)
- ⏳ Backend: Pendiente (APIs REST, LLM, WebSockets)

**Fuente:** Reunión 03-AGO-2026 (transcripción: `Transcripciones de Reuniones/sync-maf-avance-demo-agentes-03-08.md`)  
**Documentación:** `CHANGELOG.md`, `IMPLEMENTACION-COMPLETADA-03-08.md`

---
