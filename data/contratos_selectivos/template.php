<?php
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
$resultado = $class->consulta("SELECT T.nombre_tipo, S.codigo_contrato, C.representante_legal, C.cedula_representante, C.nombre_comercial, C.ruc_empresa, C.celular, S.duracion_contrato, S.fecha_inicio, S.fecha_final, P.descripcion, M.nombre_programa, S.bonificacion, P.suma_mes, S.fecha_contrato FROM contratos.contratos_selectivos S, tipo_contrato T, clientes C, paquetes P, programas.programa M WHERE S.id_cliente = C.id AND S.id_paquete = P.id AND id_tipo_contrato = T.id AND S.id_programa= M.id AND S.id = '".$_GET['id']."'");

while ($row = $class->fetch_array($resultado)) {
	$tipo_contrato = $row['nombre_tipo'];
	$codigo = $row['codigo_contrato'];
	$representante_legal = $row['representante_legal'];
	$cedula_representante = $row['cedula_representante'];
	$razon_social = $row['nombre_comercial'];
	$ruc_empresa = $row['ruc_empresa'];
	$celular = $row['celular'];
	$duracion_contrato = $row['duracion_contrato'];
	$fecha_inicio = strftime("%d de %B de %Y", strtotime($row['fecha_inicio']));
	$fecha_final = strftime("%d de %B de %Y", strtotime($row['fecha_final']));
	$descripcion = $row['descripcion'];
	$nombre_programa = $row['nombre_programa'];
	$bonificacion = $row['bonificacion'];
	$suma_mes = $row['suma_mes'];
	$cambio = utf8_decode($letras->ValorEnLetras($suma_mes, 'dolares')); 
	$fecha_contrato = $row['fecha_contrato'];
	$nombre_cliente_corto = maxCaracter(utf8_decode($row['representante_legal']),22);
}

if($tipo_contrato == 'CANJE') {
	$templateWord = new TemplateProcessor('A&G.docx');
	$templateWord->setValue('tipo_contrato','CONTRATO DE CANJE PUBLICITARIO'); 

	// --- Asignamos valores a la plantilla
	$templateWord->setValue('codigo',$codigo);
	$templateWord->setValue('nombre_cliente',$representante_legal);
	$templateWord->setValue('identificacion_cliente',$cedula_representante);
	$templateWord->setValue('nombre_empresa',$razon_social);
	$templateWord->setValue('duracion',$duracion_contrato);
	$templateWord->setValue('fecha_inicio',$fecha_inicio);
	$templateWord->setValue('fecha_fin',$fecha_final);
	$templateWord->setValue('paquetes',$descripcion);
	$templateWord->setValue('programa',$nombre_programa);
	$templateWord->setValue('bonificacion',$bonificacion);
	$templateWord->setValue('valor',$suma_mes);
	$templateWord->setValue('valor_letras',$cambio);
	$templateWord->setValue('fecha_actual',$fecha_inicio);
	$templateWord->setValue('ruc_empresa',$ruc_empresa);
	$templateWord->setValue('celular',$celular);
	$templateWord->setValue('nombre_cliente_corto',$nombre_cliente_corto);
} else {
	if($tipo_contrato == 'PUBLICITARIO') {
		$templateWord = new TemplateProcessor('A&G2.docx');
		$templateWord->setValue('tipo_contrato','CONTRATO DE PUBLICIDAD'); 

		// --- Asignamos valores a la plantilla
		$templateWord->setValue('codigo',$codigo);
		$templateWord->setValue('nombre_cliente',$representante_legal);
		$templateWord->setValue('identificacion_cliente',$cedula_representante);
		$templateWord->setValue('nombre_empresa',$razon_social);
		$templateWord->setValue('duracion',$duracion_contrato);
		$templateWord->setValue('fecha_inicio',$fecha_inicio);
		$templateWord->setValue('fecha_fin',$fecha_final);
		$templateWord->setValue('paquetes',$descripcion);
		$templateWord->setValue('programa',$nombre_programa);
		$templateWord->setValue('bonificacion',$bonificacion);
		$templateWord->setValue('valor',$suma_mes);
		$templateWord->setValue('valor_letras',$cambio);
		$templateWord->setValue('fecha_actual',$fecha_inicio);
		$templateWord->setValue('ruc_empresa',$ruc_empresa);
		$templateWord->setValue('celular',$celular);
		$templateWord->setValue('nombre_cliente_corto',$nombre_cliente_corto);
	}
}

// --- Guardamos el documento
$templateWord->saveAs('Contrato OYEFM.docx');

header("Content-Disposition: attachment; filename=Contrato OYEFM.docx; charset=iso-8859-1");
echo file_get_contents('Contrato OYEFM.docx');
        
?>