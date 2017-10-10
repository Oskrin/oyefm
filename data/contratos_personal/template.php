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
	$resultado = $class->consulta("SELECT P.id, P.nombres_completos, P.cedula_identificacion, T.nombre_tipo, C.fecha_contrato from contrato_personal  C, corporativo.personal P, tipo_contrato_personal T WHERE C.id_personal = P.id AND C.id_tipo_contrato = T.id AND C.id = '".$_GET['id']."'");

	while ($row = $class->fetch_array($resultado)) {
		$id_personal = $row[0];
		$nombres_completos = $row[1];
		$cedula_identificacion = $row[2];
		$nombre_tipo = $row[3];
		$fecha_contrato = $row[4];	
	}

	$pg_respuesta = $class->consulta("SELECT C.nombre FROM corporativo.cargos_asignacion A, corporativo.cargos C WHERE A.id_personal = '".$id_personal."' AND A.id_cargos = C.id ");

	while ($row = $class->fetch_array($pg_respuesta)) {
		$cargo = $row[0];
	}

	$templateWord = new TemplateProcessor('Contrato_Trabajo.docx');

	// --- Asignamos valores a la plantilla
	$templateWord->setValue('nombres_completos',$nombres_completos);
	$templateWord->setValue('cedula_identificacion',$cedula_identificacion);
	$templateWord->setValue('nombre_tipo',$nombre_tipo);
	$templateWord->setValue('cargo',$cargo);
	$templateWord->setValue('fecha_contrato',$fecha_contrato);


// --- Guardamos el documento
$templateWord->saveAs('Contrato_Personal.docx');

header("Content-Disposition: attachment; filename=Contrato_Personal.docx; charset=iso-8859-1");
echo file_get_contents('Contrato_Personal.docx');
        
?>