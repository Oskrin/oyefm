<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once dirname(__FILE__).'/PHPWord-master/src/PhpWord/Autoloader.php';
\PhpOffice\PhpWord\Autoloader::register();
include_once('../../admin/class.php');
include_once('../../admin/convertir.php');
include_once('../../admin/funciones_generales.php');
setlocale(LC_ALL,"es_ES@euro","es_ES","esp");
$class = new constante();
$letras = new EnLetras();
session_start(); 
// error_reporting(0);

use PhpOffice\PhpWord\TemplateProcessor;
$resultado = $class->consulta("SELECT programacion FROM contratos WHERE id = '".$_GET['id']."'");
while ($row = $class->fetch_array($resultado)) {
	$programacion = $row[0];
}

if ($programacion == "SELECTIVA") {
	$resultado = $class->consulta("SELECT T.nombre_tipo, S.programacion, S.codigo_contrato, C.representante_legal, C.cedula_representante, C.nombre_comercial, C.ruc_empresa, C.celular, S.duracion, S.fecha_inicio, S.fecha_final, P.descripcion, M.nombre_programa, S.bonificacion, P.suma_mes, S.fecha_contrato, S.spots, S.mensiones, S.valor, S.precio_contrato, S.detalle, S.dia_inicio_facturacion, S.dia_fin_facturacion, S.dia_inicio_pago, S.dia_fin_pago, S.id_vendedor FROM contratos S, tipo_contrato T, clientes C, paquetes P, programas.programa M WHERE S.id_cliente = C.id AND S.id_paquete = P.id AND id_tipo_contrato = T.id AND S.id_programa= M.id AND S.id = '".$_GET['id']."'");

	while ($row = $class->fetch_array($resultado)) {
		$tipo_contrato = $row['nombre_tipo'];
		$programacion = $row['programacion'];
		$codigo = $row['codigo_contrato'];
		$representante_legal = $row['representante_legal'];
		$cedula_representante = $row['cedula_representante'];
		$razon_social = $row['nombre_comercial'];
		$ruc_empresa = $row['ruc_empresa'];
		$celular = $row['celular'];
		$duracion_contrato = $row['duracion'];
		$fecha_inicio = strftime("%d de %B del %Y", strtotime($row['fecha_inicio']));
		$fecha_final = strftime("%d de %B del %Y", strtotime($row['fecha_final']));
		$descripcion = $row['descripcion'];
		$nombre_programa = $row['nombre_programa'];
		$bonificacion = $row['bonificacion'];
		$suma_mes = $row['suma_mes'];
		$fecha_contrato = $row['fecha_contrato'];
		$nombre_cliente_corto = maxCaracter(utf8_decode($row['representante_legal']),22);
		$spots = $row['spots'];
		$mensiones = $row['mensiones'];
		$valor = $row['valor'];
		$precio_contrato = $row['precio_contrato'];
		$detalle = $row['detalle'];
		$dia_inicio_facturacion = $row['dia_inicio_facturacion'];
		$dia_fin_facturacion = $row['dia_fin_facturacion'];
		$dia_inicio_pago = $row['dia_inicio_pago'];
		$dia_fin_pago = $row['dia_fin_pago'];
		$id_vendedor = $row['id_vendedor'];
		$cambio = utf8_decode($letras->ValorEnLetras($precio_contrato, 'dolares'));
	}
	$resultado = $class->consulta("SELECT PP.nombres_completos, PP.cedula_identificacion, PP.telf_celular  FROM contratos S, vendedores V, corporativo.personal PP WHERE V.id_personal = PP.id AND S.id_vendedor = V.id AND S.id ='".$_GET['id']."'");
	while ($row = $class->fetch_array($resultado)) {
		$nombres_completos = maxCaracter(utf8_decode($row['nombres_completos']),18);
		$ci_vendedor = $row['cedula_identificacion'];
		$telf_vendedor = $row['telf_celular'];
	}

	if($tipo_contrato == 'CONTRATO DE CANJE PUBLICITARIO') {
		$templateWord = new TemplateProcessor('CC.docx');
		$templateWord->setValue('tipo_contrato',$tipo_contrato); 

		// --- Asignamos valores a la plantilla
		$templateWord->setValue('codigo',$codigo);
		$templateWord->setValue('programacion',$programacion);
		$templateWord->setValue('nombre_cliente',$representante_legal);
		$templateWord->setValue('identificacion_cliente',$cedula_representante);
		$templateWord->setValue('nombre_empresa',$razon_social);
		$templateWord->setValue('duracion',$duracion_contrato);
		$templateWord->setValue('fecha_inicio',$fecha_inicio);
		$templateWord->setValue('fecha_fin',$fecha_final);
		$templateWord->setValue('programa',$nombre_programa);
		$templateWord->setValue('spots',$spots);
		$templateWord->setValue('mensiones',$mensiones);
		$templateWord->setValue('paquetes',$descripcion);
		$templateWord->setValue('bonificacion',$bonificacion);
		$templateWord->setValue('valor',$suma_mes);
		$templateWord->setValue('valor_letras',$cambio);
		$templateWord->setValue('detalle',$detalle);
		$templateWord->setValue('fecha_actual',$fecha_inicio);
		$templateWord->setValue('ruc_empresa',$ruc_empresa);
		$templateWord->setValue('celular',$celular);
		$templateWord->setValue('nombre_cliente_corto',$nombre_cliente_corto);
	} else {
		if($tipo_contrato == 'CONTRATO PREPAGO') {
			$templateWord = new TemplateProcessor('CP.docx');
			$templateWord->setValue('tipo_contrato',$tipo_contrato); 

			// --- Asignamos valores a la plantilla
			$templateWord->setValue('codigo',$codigo);
			$templateWord->setValue('programacion',$programacion);
			$templateWord->setValue('nombre_cliente',$representante_legal);
			$templateWord->setValue('identificacion_cliente',$cedula_representante);
			$templateWord->setValue('nombre_empresa',$razon_social);
			$templateWord->setValue('duracion',$duracion_contrato);
			$templateWord->setValue('fecha_inicio',$fecha_inicio);
			$templateWord->setValue('fecha_fin',$fecha_final);
			$templateWord->setValue('programa',$nombre_programa);
			$templateWord->setValue('spots',$spots);
			$templateWord->setValue('mensiones',$mensiones);
			$templateWord->setValue('paquetes',$descripcion);
			$templateWord->setValue('bonificacion',$bonificacion);
			$templateWord->setValue('valor',$precio_contrato);
			$templateWord->setValue('valor_letras',$cambio);
			$templateWord->setValue('detalle',$detalle);
			$templateWord->setValue('dia_inicio_facturacion',$dia_inicio_facturacion);
			$templateWord->setValue('dia_fin_facturacion',$dia_fin_facturacion);
			$templateWord->setValue('dia_inicio_pago',$dia_inicio_pago);
			$templateWord->setValue('dia_fin_pago',$dia_fin_pago);
			$templateWord->setValue('fecha_actual',$fecha_inicio);
			$templateWord->setValue('nombre_vendedor',$nombres_completos);
			$templateWord->setValue('ci_vendedor',$ci_vendedor);
			$templateWord->setValue('celular_vendedor',$telf_vendedor);
			$templateWord->setValue('ruc_empresa',$ruc_empresa);
			$templateWord->setValue('celular',$celular);
			$templateWord->setValue('nombre_cliente_corto',$nombre_cliente_corto);
		} else {
			if($tipo_contrato == 'CONTRATO SOLIDARIO') {
				$templateWord = new TemplateProcessor('CS.docx');
				$templateWord->setValue('tipo_contrato',$tipo_contrato); 

				// --- Asignamos valores a la plantilla
				$templateWord->setValue('codigo',$codigo);
				$templateWord->setValue('programacion',$programacion);
				$templateWord->setValue('nombre_cliente',$representante_legal);
				$templateWord->setValue('identificacion_cliente',$cedula_representante);
				$templateWord->setValue('nombre_empresa',$razon_social);
				$templateWord->setValue('duracion',$duracion_contrato);
				$templateWord->setValue('fecha_inicio',$fecha_inicio);
				$templateWord->setValue('fecha_fin',$fecha_final);
				$templateWord->setValue('programa',$nombre_programa);
				$templateWord->setValue('spots',$spots);
				$templateWord->setValue('mensiones',$mensiones);
				$templateWord->setValue('paquetes',$descripcion);
				$templateWord->setValue('bonificacion',$bonificacion);
				$templateWord->setValue('valor',$suma_mes);
				$templateWord->setValue('valor_letras',$cambio);
				$templateWord->setValue('detalle',$detalle);
				$templateWord->setValue('fecha_actual',$fecha_inicio);
				$templateWord->setValue('ruc_empresa',$ruc_empresa);
				$templateWord->setValue('celular',$celular);
				$templateWord->setValue('nombre_cliente_corto',$nombre_cliente_corto);
			}	
		}
	}
} else {
	if ($programacion == "ROTATIVA") {
		$resultado = $class->consulta("SELECT T.nombre_tipo, S.programacion, S.codigo_contrato, C.representante_legal, C.cedula_representante, C.nombre_comercial, C.ruc_empresa, C.celular, S.duracion, S.fecha_inicio, S.fecha_final, P.descripcion, S.bonificacion, P.suma_mes, S.fecha_contrato, S.spots, S.mensiones, S.valor, S.precio_contrato, S.detalle, S.dia_inicio_facturacion, S.dia_fin_facturacion, S.dia_inicio_pago, S.dia_fin_pago, S.id_vendedor FROM contratos S, tipo_contrato T, clientes C, paquetes P WHERE S.id_cliente = C.id AND S.id_paquete = P.id AND id_tipo_contrato = T.id AND S.id = '".$_GET['id']."'");
	
		while ($row = $class->fetch_array($resultado)) {
			$tipo_contrato = $row['nombre_tipo'];
			$programacion = $row['programacion'];
			$codigo = $row['codigo_contrato'];
			$representante_legal = $row['representante_legal'];
			$cedula_representante = $row['cedula_representante'];
			$razon_social = $row['nombre_comercial'];
			$ruc_empresa = $row['ruc_empresa'];
			$celular = $row['celular'];
			$duracion_contrato = $row['duracion'];
			$fecha_inicio = strftime("%d de %B del %Y", strtotime($row['fecha_inicio']));
			$fecha_final = strftime("%d de %B del %Y", strtotime($row['fecha_final']));
			$descripcion = $row['descripcion'];
			$nombre_programa = 'ROTATIVO';
			$bonificacion = $row['bonificacion'];
			$suma_mes = $row['suma_mes'];
			$fecha_contrato = $row['fecha_contrato'];
			$nombre_cliente_corto = maxCaracter(utf8_decode($row['representante_legal']),22);
			$spots = $row['spots'];
			$mensiones = $row['mensiones'];
			$valor = $row['valor'];
			$precio_contrato = $row['precio_contrato'];
			$detalle = $row['detalle'];
			$dia_inicio_facturacion = $row['dia_inicio_facturacion'];
			$dia_fin_facturacion = $row['dia_fin_facturacion'];
			$dia_inicio_pago = $row['dia_inicio_pago'];
			$dia_fin_pago = $row['dia_fin_pago'];
			$id_vendedor = $row['id_vendedor'];
			$cambio = utf8_decode($letras->ValorEnLetras($precio_contrato, 'dolares'));
		}
		$resultado = $class->consulta("SELECT PP.nombres_completos, PP.cedula_identificacion, PP.telf_celular  FROM contratos S, vendedores V, corporativo.personal PP WHERE V.id_personal = PP.id AND S.id_vendedor = V.id AND S.id ='".$_GET['id']."'");
		while ($row = $class->fetch_array($resultado)) {
			$nombres_completos = maxCaracter(utf8_decode($row['nombres_completos']),18);
			$ci_vendedor = $row['cedula_identificacion'];
			$telf_vendedor = $row['telf_celular'];
		}

		if($tipo_contrato == 'CONTRATO DE CANJE PUBLICITARIO') {
			$templateWord = new TemplateProcessor('CC.docx');
			$templateWord->setValue('tipo_contrato',$tipo_contrato); 

			// --- Asignamos valores a la plantilla
			$templateWord->setValue('codigo',$codigo);
			$templateWord->setValue('programacion',$programacion);
			$templateWord->setValue('nombre_cliente',$representante_legal);
			$templateWord->setValue('identificacion_cliente',$cedula_representante);
			$templateWord->setValue('nombre_empresa',$razon_social);
			$templateWord->setValue('duracion',$duracion_contrato);
			$templateWord->setValue('fecha_inicio',$fecha_inicio);
			$templateWord->setValue('fecha_fin',$fecha_final);
			$templateWord->setValue('programa',$nombre_programa);
			$templateWord->setValue('spots',$spots);
			$templateWord->setValue('mensiones',$mensiones);
			$templateWord->setValue('paquetes',$descripcion);
			$templateWord->setValue('bonificacion',$bonificacion);
			$templateWord->setValue('valor',$precio_contrato);
			$templateWord->setValue('valor_letras',$cambio);
			$templateWord->setValue('detalle',$detalle);
			$templateWord->setValue('dia_inicio_facturacion',$dia_inicio_facturacion);
			$templateWord->setValue('dia_fin_facturacion',$dia_fin_facturacion);
			$templateWord->setValue('dia_inicio_pago',$dia_inicio_pago);
			$templateWord->setValue('dia_fin_pago',$dia_fin_pago);
			$templateWord->setValue('fecha_actual',$fecha_inicio);
			$templateWord->setValue('nombre_vendedor',$nombres_completos);
			$templateWord->setValue('ci_vendedor',$ci_vendedor);
			$templateWord->setValue('celular_vendedor',$telf_vendedor);
			$templateWord->setValue('ruc_empresa',$ruc_empresa);
			$templateWord->setValue('celular',$celular);
			$templateWord->setValue('nombre_cliente_corto',$nombre_cliente_corto);
			// $templateWord->setValue('codigo',$codigo);
			// $templateWord->setValue('programacion',$programacion);
			// $templateWord->setValue('nombre_cliente',$representante_legal);
			// $templateWord->setValue('identificacion_cliente',$cedula_representante);
			// $templateWord->setValue('nombre_empresa',$razon_social);
			// $templateWord->setValue('duracion',$duracion_contrato);
			// $templateWord->setValue('fecha_inicio',$fecha_inicio);
			// $templateWord->setValue('fecha_fin',$fecha_final);
			// $templateWord->setValue('programa',$nombre_programa);
			// $templateWord->setValue('spots',$spots);
			// $templateWord->setValue('mensiones',$mensiones);
			// $templateWord->setValue('paquetes',$descripcion);
			// $templateWord->setValue('bonificacion',$bonificacion);
			// $templateWord->setValue('valor',$suma_mes);
			// $templateWord->setValue('valor_letras',$cambio);
			// $templateWord->setValue('detalle',$detalle);
			// $templateWord->setValue('dia_inicio_facturacion',$dia_inicio_facturacion);
			// $templateWord->setValue('dia_fin_facturacion',$dia_fin_facturacion);
			// $templateWord->setValue('dia_inicio_pago',$dia_inicio_pago);
			// $templateWord->setValue('dia_fin_pago',$dia_fin_pago);
			// $templateWord->setValue('fecha_actual',$fecha_inicio);
			// $templateWord->setValue('ruc_empresa',$ruc_empresa);
			// $templateWord->setValue('celular',$celular);
			// $templateWord->setValue('nombre_cliente_corto',$nombre_cliente_corto);
		} else {
			if($tipo_contrato == 'CONTRATO PREPAGO') {
				$templateWord = new TemplateProcessor('CP.docx');
				$templateWord->setValue('tipo_contrato',$tipo_contrato); 

				// --- Asignamos valores a la plantilla
				$templateWord->setValue('codigo',$codigo);
				$templateWord->setValue('programacion',$programacion);
				$templateWord->setValue('nombre_cliente',$representante_legal);
				$templateWord->setValue('identificacion_cliente',$cedula_representante);
				$templateWord->setValue('nombre_empresa',$razon_social);
				$templateWord->setValue('duracion',$duracion_contrato);
				$templateWord->setValue('fecha_inicio',$fecha_inicio);
				$templateWord->setValue('fecha_fin',$fecha_final);
				$templateWord->setValue('programa',$nombre_programa);
				$templateWord->setValue('spots',$spots);
				$templateWord->setValue('mensiones',$mensiones);
				$templateWord->setValue('paquetes',$descripcion);
				$templateWord->setValue('bonificacion',$bonificacion);
				$templateWord->setValue('valor',$precio_contrato);
				$templateWord->setValue('valor_letras',$cambio);
				$templateWord->setValue('detalle',$detalle);
				$templateWord->setValue('dia_inicio_facturacion',$dia_inicio_facturacion);
				$templateWord->setValue('dia_fin_facturacion',$dia_fin_facturacion);
				$templateWord->setValue('dia_inicio_pago',$dia_inicio_pago);
				$templateWord->setValue('dia_fin_pago',$dia_fin_pago);
				$templateWord->setValue('fecha_actual',$fecha_inicio);
				$templateWord->setValue('nombre_vendedor',$nombres_completos);
				$templateWord->setValue('ci_vendedor',$ci_vendedor);
				$templateWord->setValue('celular_vendedor',$telf_vendedor);
				$templateWord->setValue('ruc_empresa',$ruc_empresa);
				$templateWord->setValue('celular',$celular);
				$templateWord->setValue('nombre_cliente_corto',$nombre_cliente_corto);
			} else {
				if($tipo_contrato == 'CONTRATO SOLIDARIO') {
					$templateWord = new TemplateProcessor('CS.docx');
					$templateWord->setValue('tipo_contrato',$tipo_contrato); 

					// --- Asignamos valores a la plantilla
					$templateWord->setValue('codigo',$codigo);
					$templateWord->setValue('programacion',$programacion);
					$templateWord->setValue('nombre_cliente',$representante_legal);
					$templateWord->setValue('identificacion_cliente',$cedula_representante);
					$templateWord->setValue('nombre_empresa',$razon_social);
					$templateWord->setValue('duracion',$duracion_contrato);
					$templateWord->setValue('fecha_inicio',$fecha_inicio);
					$templateWord->setValue('fecha_fin',$fecha_final);
					$templateWord->setValue('programa',$nombre_programa);
					$templateWord->setValue('spots',$spots);
					$templateWord->setValue('mensiones',$mensiones);
					$templateWord->setValue('paquetes',$descripcion);
					$templateWord->setValue('bonificacion',$bonificacion);
					$templateWord->setValue('valor',$suma_mes);
					$templateWord->setValue('valor_letras',$cambio);
					$templateWord->setValue('detalle',$detalle);
					$templateWord->setValue('fecha_actual',$fecha_inicio);
					$templateWord->setValue('ruc_empresa',$ruc_empresa);
					$templateWord->setValue('celular',$celular);
					$templateWord->setValue('nombre_cliente_corto',$nombre_cliente_corto);
				}	
			}
		}	
	}	
}

// --- Guardamos el documento
$templateWord->saveAs('Contrato OYEFM.docx');

header("Content-Disposition: attachment; filename=Contrato OYEFM.docx; charset=iso-8859-1");
echo file_get_contents('Contrato OYEFM.docx');
        
?>