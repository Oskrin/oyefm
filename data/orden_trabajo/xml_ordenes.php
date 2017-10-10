<?php
    include_once('../../admin/class.php');
    $class = new constante();   
    date_default_timezone_set('America/Guayaquil');
    setlocale (LC_TIME,"spanish");

    $page = $_GET['page'];
    $limit = $_GET['rows'];
    $sidx = $_GET['sidx'];
    $sord = $_GET['sord'];
    $search = $_GET['_search'];
    if (!$sidx)
        $sidx = 1;
    
    $count = 0;
    $resultado = $class->consulta("SELECT  COUNT(*) AS count from orden_trabajo");         
    while ($row = $class->fetch_array($resultado)) {
        $count = $count + $row[0];    
    }    
    if ($count > 0 && $limit > 0) {
        $total_pages = ceil($count / $limit);
    } else {
        $total_pages = 0;
    }
    if ($page > $total_pages)
        $page = $total_pages;
    $start = $limit * $page - $limit;
    if ($start < 0)
        $start = 0;
    
    if ($search == 'false') {
        $SQL = "SELECT O.id, O.codigo, C.nombres_completos, O.fecha_inicio, O.fecha_entrega, O.tiempo_ejecucion, O.tipo_trabajo, O.descripcion, O.destino, O.estado FROM orden_trabajo O, corporativo.personal C, usuarios U WHERE O.id_responsable = C.id AND O.id_usuario = U.id ORDER BY $sidx $sord offset $start limit $limit";
    } else {
        $campo = $_GET['searchField'];
      
        if ($_GET['searchOper'] == 'eq') {
            $SQL = "SELECT O.id, O.codigo, C.nombres_completos, O.fecha_inicio, O.fecha_entrega, O.tiempo_ejecucion, O.tipo_trabajo, O.descripcion, O.destino, O.estado FROM orden_trabajo O, corporativo.personal C, usuarios U WHERE O.id_responsable = C.id AND O.id_usuario = U.id AND $campo = '$_GET[searchString]' ORDER BY $sidx $sord offset $start limit $limit";
        }         
        if ($_GET['searchOper'] == 'cn') {
            $SQL = "SELECT O.id, O.codigo, C.nombres_completos, O.fecha_inicio, O.fecha_entrega, O.tiempo_ejecucion, O.tipo_trabajo, O.descripcion, O.destino, O.estado FROM orden_trabajo O, corporativo.personal C, usuarios U WHERE O.id_responsable = C.id AND O.id_usuario = U.id AND $campo like '%$_GET[searchString]%' ORDER BY $sidx $sord offset $start limit $limit";
        }
    }  

    $estado = '<span class=label label-sm label-success>Pendiente</span>';

    $resultado = $class->consulta($SQL);     
    header("Content-Type: text/html;charset=utf-8");   
    $s = "<?xml version='1.0' encoding='utf-8'?>";
    $s .= "<rows>";
        $s .= "<page>" . $page . "</page>";
        $s .= "<total>" . $total_pages . "</total>";
        $s .= "<records>" . $count . "</records>";
        while ($row = $class->fetch_array($resultado)) {
            $s .= "<row id='" . $row[0] . "'>";
            $s .= "<cell>" . $row[0] . "</cell>";
            $s .= "<cell>" . $row[2] . "</cell>";
            $s .= "<cell>" . $row[3] . "</cell>";
            $s .= "<cell>" . $row[4] . "</cell>";
            $s .= "<cell>" . $row[6] . "</cell>";
            if ($row[9] == 1) {
                $s .= "<cell>Pendiente</cell>";   
            } else {
                if ($row[9] == 2) {
                    $s .= "<cell>Entregado</cell>";
                }
            }
            $s .= "<cell></cell>";
            $s .= "</row>";
        }
    $s .= "</rows>";
    echo $s;    
?>