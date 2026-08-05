# Catálogo de Endpoints REST — Plataforma MAF

96 endpoints estimados sobre 14 microservicios. Detalle definitivo en documentación Swagger/OpenAPI.

## auth-service  (11 endpoints)

<table>
<thead>
<tr><th>Método</th><th>Ruta</th><th>Descripción</th><th>REQ</th></tr>
</thead>
<tbody>
<tr><td>POST</td><td><code>/auth/login</code></td><td>Autenticar usuario y emitir token</td><td>REQ-01</td></tr>
<tr><td>POST</td><td><code>/auth/logout</code></td><td>Cerrar sesión e invalidar token</td><td>REQ-01</td></tr>
<tr><td>POST</td><td><code>/auth/refresh</code></td><td>Renovar token de sesión</td><td>REQ-01</td></tr>
<tr><td>GET</td><td><code>/users/me</code></td><td>Obtener perfil y roles del usuario autenticado</td><td>REQ-01</td></tr>
<tr><td>GET</td><td><code>/users</code></td><td>Listar usuarios (con filtros y paginación)</td><td>REQ-01 / DEV-BO</td></tr>
<tr><td>POST</td><td><code>/users</code></td><td>Crear usuario</td><td>DEV-BO</td></tr>
<tr><td>PUT</td><td><code>/users/{id}</code></td><td>Actualizar usuario</td><td>DEV-BO</td></tr>
<tr><td>DELETE</td><td><code>/users/{id}</code></td><td>Desactivar/eliminar usuario</td><td>DEV-BO</td></tr>
<tr><td>GET</td><td><code>/roles</code></td><td>Listar roles disponibles</td><td>REQ-01</td></tr>
<tr><td>POST</td><td><code>/users/{id}/roles</code></td><td>Asignar uno o más roles a un usuario</td><td>REQ-01</td></tr>
<tr><td>GET</td><td><code>/roles/{id}/permissions</code></td><td>Obtener matriz de permisos del rol</td><td>REQ-01</td></tr>
</tbody>
</table>

## leads-service  (22 endpoints)

<table>
<thead>
<tr><th>Método</th><th>Ruta</th><th>Descripción</th><th>REQ</th></tr>
</thead>
<tbody>
<tr><td>POST</td><td><code>/leads</code></td><td>Crear lead manual</td><td>REQ-03</td></tr>
<tr><td>GET</td><td><code>/leads</code></td><td>Listar cartera con filtros (estado, fuente, fecha)</td><td>REQ-05</td></tr>
<tr><td>GET</td><td><code>/leads/{id}</code></td><td>Obtener ficha individual del lead</td><td>REQ-05</td></tr>
<tr><td>PUT</td><td><code>/leads/{id}</code></td><td>Actualizar datos del lead</td><td>REQ-03/04</td></tr>
<tr><td>GET</td><td><code>/leads/check-duplicate</code></td><td>Verificar lead/DNI duplicado</td><td>REQ-03</td></tr>
<tr><td>POST</td><td><code>/leads/intake/toyota</code></td><td>Ingesta Base Toyota/CSV (asignación por dealer/sucursal)</td><td>REQ-02</td></tr>
<tr><td>POST</td><td><code>/leads/intake/landing</code></td><td>Ingesta Landing/Digital (asignación por distrito)</td><td>REQ-02</td></tr>
<tr><td>POST</td><td><code>/leads/intake/callcenter</code></td><td>Ingesta Call Center (manual o masiva)</td><td>REQ-02</td></tr>
<tr><td>POST</td><td><code>/leads/intake/insitu</code></td><td>Registro derivación in situ / cartera propia</td><td>REQ-02</td></tr>
<tr><td>POST</td><td><code>/leads/assign</code></td><td>Asignar/distribuir lead a asesor</td><td>REQ-02</td></tr>
<tr><td>GET</td><td><code>/dealers/by-profile</code></td><td>Obtener concesionario del perfil del asesor</td><td>REQ-03</td></tr>
<tr><td>PUT</td><td><code>/leads/{id}/status</code></td><td>Cambiar estado del lead (máquina de 6 estados)</td><td>REQ-06</td></tr>
<tr><td>POST</td><td><code>/leads/{id}/contact-attempts</code></td><td>Registrar intento de contacto</td><td>REQ-06</td></tr>
<tr><td>GET</td><td><code>/leads/{id}/history</code></td><td>Obtener historial cronológico del lead</td><td>REQ-06</td></tr>
<tr><td>POST</td><td><code>/leads/{id}/notes</code></td><td>Agregar nota obligatoria (Call Center)</td><td>REQ-06</td></tr>
<tr><td>PUT</td><td><code>/leads/{id}/reassign</code></td><td>Reasignar lead a otro asesor</td><td>REQ-09</td></tr>
<tr><td>POST</td><td><code>/leads/{id}/coverage</code></td><td>Asignar cobertura temporal (1-2 asesores)</td><td>REQ-09</td></tr>
<tr><td>DELETE</td><td><code>/leads/{id}/coverage</code></td><td>Quitar cobertura temporal</td><td>REQ-09</td></tr>
<tr><td>GET</td><td><code>/supervisor/team-activity</code></td><td>Actividad cronológica del equipo</td><td>REQ-08</td></tr>
<tr><td>GET</td><td><code>/asesores/{id}/timeline</code></td><td>Línea de tiempo de actividad del asesor</td><td>REQ-08</td></tr>
<tr><td>GET</td><td><code>/dashboard/supervisor/metrics</code></td><td>Métricas del equipo del supervisor</td><td>REQ-10</td></tr>
<tr><td>GET</td><td><code>/dashboard/supervisor/drilldown</code></td><td>Detalle filtrado al hacer click en métrica</td><td>REQ-10</td></tr>
</tbody>
</table>

## identity-service  (4 endpoints)

<table>
<thead>
<tr><th>Método</th><th>Ruta</th><th>Descripción</th><th>REQ</th></tr>
</thead>
<tbody>
<tr><td>GET</td><td><code>/identity/validate/{tipo}/{doc}</code></td><td>Validar documento según tipo (DNI/CE/Pasaporte/RUC)</td><td>REQ-11</td></tr>
<tr><td>GET</td><td><code>/identity/masks</code></td><td>Obtener máscaras de validación por tipo de documento</td><td>REQ-11</td></tr>
<tr><td>GET</td><td><code>/identity/autocomplete/{doc}</code></td><td>Autocompletar datos desde fuente oficial</td><td>REQ-12</td></tr>
<tr><td>GET</td><td><code>/identity/exists/{doc}</code></td><td>Verificar si el documento ya existe + historial</td><td>REQ-12</td></tr>
</tbody>
</table>

## document-service  (5 endpoints)

<table>
<thead>
<tr><th>Método</th><th>Ruta</th><th>Descripción</th><th>REQ</th></tr>
</thead>
<tbody>
<tr><td>POST</td><td><code>/documents/id-capture</code></td><td>Subir imagen del documento (anverso/reverso)</td><td>REQ-14</td></tr>
<tr><td>GET</td><td><code>/documents/{id}</code></td><td>Obtener documento almacenado</td><td>REQ-14</td></tr>
<tr><td>POST</td><td><code>/documents/normativos/generate</code></td><td>Generar los 6 documentos normativos</td><td>REQ-21</td></tr>
<tr><td>POST</td><td><code>/documents/send</code></td><td>Enviar documentos por canal (correo/WhatsApp/SMS)</td><td>REQ-21</td></tr>
<tr><td>GET</td><td><code>/documents/by-lead/{leadId}</code></td><td>Listar documentos del expediente</td><td>REQ-26</td></tr>
</tbody>
</table>

## risk-service  (11 endpoints)

<table>
<thead>
<tr><th>Método</th><th>Ruta</th><th>Descripción</th><th>REQ</th></tr>
</thead>
<tbody>
<tr><td>POST</td><td><code>/risk/evaluate</code></td><td>Iniciar evaluación persona natural (orquesta PLAFT→Equifax)</td><td>REQ-15</td></tr>
<tr><td>POST</td><td><code>/risk/re-evaluate</code></td><td>Reevaluar modificando parámetros de cuota (sin límite)</td><td>REQ-15</td></tr>
<tr><td>GET</td><td><code>/risk/{leadId}/result</code></td><td>Obtener resultado (Aprobado/Rechazado/En revisión)</td><td>REQ-15</td></tr>
<tr><td>POST</td><td><code>/risk/ddjj</code></td><td>Capturar Declaración Jurada de Ingresos (11 campos)</td><td>REQ-15</td></tr>
<tr><td>GET</td><td><code>/risk/{id}/plaft-detail</code></td><td>Detalle completo PLAFT (solo Oficial de Cumplimiento)</td><td>REQ-15</td></tr>
<tr><td>POST</td><td><code>/vacancy/lock</code></td><td>Bloquear vacante al iniciar evaluación</td><td>REQ-15</td></tr>
<tr><td>DELETE</td><td><code>/vacancy/lock</code></td><td>Liberar reserva (control Reevaluar)</td><td>REQ-15</td></tr>
<tr><td>POST</td><td><code>/risk/evaluate/juridica</code></td><td>Evaluación persona jurídica (sin Equifax)</td><td>REQ-16</td></tr>
<tr><td>PUT</td><td><code>/risk/{id}/analyst-decision</code></td><td>Registrar decisión del Analista de Créditos</td><td>REQ-16</td></tr>
<tr><td>POST</td><td><code>/risk/co-titular</code></td><td>Evaluar co-titular de forma independiente</td><td>REQ-17</td></tr>
<tr><td>GET</td><td><code>/risk/{leadId}/co-titular-status</code></td><td>Estado consolidado de ambos titulares</td><td>REQ-17</td></tr>
</tbody>
</table>

## selection-service  (5 endpoints)

<table>
<thead>
<tr><th>Método</th><th>Ruta</th><th>Descripción</th><th>REQ</th></tr>
</thead>
<tbody>
<tr><td>GET</td><td><code>/programs</code></td><td>Listar programas (NewCon)</td><td>REQ-18</td></tr>
<tr><td>GET</td><td><code>/programs/{id}/groups</code></td><td>Listar grupos del programa (NewCon)</td><td>REQ-18</td></tr>
<tr><td>GET</td><td><code>/groups/{id}/certificates</code></td><td>Listar certificados del grupo (NewCon)</td><td>REQ-18</td></tr>
<tr><td>POST</td><td><code>/selection</code></td><td>Confirmar selección (hasta 5 certificados)</td><td>REQ-18</td></tr>
<tr><td>GET</td><td><code>/selection/{id}/vacancy-check</code></td><td>Validar vacantes antes de confirmar</td><td>REQ-18</td></tr>
</tbody>
</table>

## proforma-service  (5 endpoints)

<table>
<thead>
<tr><th>Método</th><th>Ruta</th><th>Descripción</th><th>REQ</th></tr>
</thead>
<tbody>
<tr><td>POST</td><td><code>/proforma/generate</code></td><td>Generar proforma (Cuota 1 + CIA)</td><td>REQ-19</td></tr>
<tr><td>GET</td><td><code>/proforma/{id}</code></td><td>Obtener proforma generada</td><td>REQ-19</td></tr>
<tr><td>GET</td><td><code>/proforma/{id}/pdf</code></td><td>Descargar proforma en PDF</td><td>REQ-19</td></tr>
<tr><td>POST</td><td><code>/otp/send</code></td><td>Enviar OTP al cliente (correo/WhatsApp/SMS)</td><td>REQ-20</td></tr>
<tr><td>POST</td><td><code>/otp/verify</code></td><td>Validar código OTP</td><td>REQ-20</td></tr>
</tbody>
</table>

## payment-service  (6 endpoints)

<table>
<thead>
<tr><th>Método</th><th>Ruta</th><th>Descripción</th><th>REQ</th></tr>
</thead>
<tbody>
<tr><td>POST</td><td><code>/payment/order</code></td><td>Generar orden de pago Kashio (2 conceptos)</td><td>REQ-22</td></tr>
<tr><td>GET</td><td><code>/payment/{id}/status</code></td><td>Consultar estado de la orden</td><td>REQ-22</td></tr>
<tr><td>POST</td><td><code>/payment/partial</code></td><td>Generar orden de pago parcial (manual)</td><td>REQ-22</td></tr>
<tr><td>GET</td><td><code>/payment/{leadId}/history</code></td><td>Historial de pagos parciales y saldos</td><td>REQ-22</td></tr>
<tr><td>POST</td><td><code>/payment/webhook</code></td><td>Recibir confirmación de pago desde Kashio</td><td>REQ-22</td></tr>
<tr><td>PUT</td><td><code>/payment/{id}/expire</code></td><td>Aplicar vencimiento 48h (server-side)</td><td>REQ-22</td></tr>
</tbody>
</table>

## signature-service  (4 endpoints)

<table>
<thead>
<tr><th>Método</th><th>Ruta</th><th>Descripción</th><th>REQ</th></tr>
</thead>
<tbody>
<tr><td>POST</td><td><code>/signature/trigger</code></td><td>Disparar firma biométrica tras pago confirmado</td><td>REQ-23</td></tr>
<tr><td>GET</td><td><code>/signature/{id}/status</code></td><td>Consultar estado de la firma</td><td>REQ-23</td></tr>
<tr><td>POST</td><td><code>/signature/webhook</code></td><td>Recibir confirmación de firma del proveedor</td><td>REQ-23</td></tr>
<tr><td>POST</td><td><code>/devolution-account</code></td><td>Registrar cuenta de devolución (cheque/cuenta USD)</td><td>REQ-23</td></tr>
</tbody>
</table>

## contract-service  (6 endpoints)

<table>
<thead>
<tr><th>Método</th><th>Ruta</th><th>Descripción</th><th>REQ</th></tr>
</thead>
<tbody>
<tr><td>POST</td><td><code>/contract/generate</code></td><td>Enviar a NewCon y obtener N° de contrato</td><td>REQ-24</td></tr>
<tr><td>GET</td><td><code>/contract/{id}</code></td><td>Obtener datos del contrato</td><td>REQ-24</td></tr>
<tr><td>GET</td><td><code>/expediente/{id}/preview</code></td><td>Previsualizar expediente con checklist</td><td>REQ-25</td></tr>
<tr><td>POST</td><td><code>/expediente/{id}/send-operations</code></td><td>Enviar expediente a Operaciones</td><td>REQ-25</td></tr>
<tr><td>POST</td><td><code>/welcome-call</code></td><td>Registrar llamada de bienvenida</td><td>REQ-27</td></tr>
<tr><td>PUT</td><td><code>/leads/{id}/close</code></td><td>Cerrar lead (estado CERRADO definitivo)</td><td>REQ-27</td></tr>
</tbody>
</table>

## reporting-service  (5 endpoints)

<table>
<thead>
<tr><th>Método</th><th>Ruta</th><th>Descripción</th><th>REQ</th></tr>
</thead>
<tbody>
<tr><td>GET</td><td><code>/dashboard/asesor/data</code></td><td>Datos del panel del Asesor</td><td>REQ-28</td></tr>
<tr><td>GET</td><td><code>/dashboard/supervisor/data</code></td><td>Datos del panel del Supervisor</td><td>REQ-28</td></tr>
<tr><td>GET</td><td><code>/dashboard/gerencial/data</code></td><td>Datos del panel Gerencial</td><td>REQ-28</td></tr>
<tr><td>GET</td><td><code>/dashboard/callcenter/data</code></td><td>Datos del panel Call Center</td><td>REQ-28</td></tr>
<tr><td>GET</td><td><code>/dashboard/{role}/embed-url</code></td><td>Obtener URL embebida de QuickSight por rol</td><td>REQ-28</td></tr>
</tbody>
</table>

## notification-service  (3 endpoints)

<table>
<thead>
<tr><th>Método</th><th>Ruta</th><th>Descripción</th><th>REQ</th></tr>
</thead>
<tbody>
<tr><td>POST</td><td><code>/notifications/lead-assigned</code></td><td>Notificar asignación de lead (push/email)</td><td>REQ-07</td></tr>
<tr><td>POST</td><td><code>/notifications/contract-signed</code></td><td>Notificar firma de contrato (3 actores)</td><td>REQ-23</td></tr>
<tr><td>POST</td><td><code>/notifications/payment-order</code></td><td>Notificar orden de pago y confirmación</td><td>REQ-22</td></tr>
</tbody>
</table>

## admin-service  (9 endpoints)

<table>
<thead>
<tr><th>Método</th><th>Ruta</th><th>Descripción</th><th>REQ</th></tr>
</thead>
<tbody>
<tr><td>GET</td><td><code>/admin/parameters</code></td><td>Listar parámetros de negocio</td><td>DEV-BO</td></tr>
<tr><td>PUT</td><td><code>/admin/parameters/{key}</code></td><td>Actualizar parámetro (N letras CIA, metas, etc.)</td><td>DEV-BO</td></tr>
<tr><td>GET</td><td><code>/admin/catalogs</code></td><td>Listar catálogos del sistema</td><td>DEV-BO</td></tr>
<tr><td>POST</td><td><code>/admin/catalogs/{tipo}</code></td><td>Crear entrada de catálogo</td><td>DEV-BO</td></tr>
<tr><td>PUT</td><td><code>/admin/catalogs/{tipo}/{id}</code></td><td>Actualizar entrada de catálogo</td><td>DEV-BO</td></tr>
<tr><td>DELETE</td><td><code>/admin/catalogs/{tipo}/{id}</code></td><td>Eliminar entrada de catálogo</td><td>DEV-BO</td></tr>
<tr><td>GET</td><td><code>/admin/cc-substates</code></td><td>Listar sub-estados Call Center parametrizables</td><td>DEV-BO</td></tr>
<tr><td>PUT</td><td><code>/admin/cc-substates</code></td><td>Configurar sub-estados Call Center</td><td>DEV-BO</td></tr>
<tr><td>GET</td><td><code>/admin/audit-config</code></td><td>Configuración de auditoría</td><td>DEV-BO</td></tr>
</tbody>
</table>

## integration-service  (0 endpoints)

<table>
<thead>
<tr><th>Método</th><th>Ruta</th><th>Descripción</th><th>REQ</th></tr>
</thead>
<tbody>
<tr><td>—</td><td><code>(sin endpoints REST públicos)</code></td><td>Orquestación interna: consumers SQS, reintentos, DLQ, circuit breakers hacia APIs externas</td><td>DEV-INTEG</td></tr>
</tbody>
</table>
