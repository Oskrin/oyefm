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
    $resultado = $class->consulta("SELECT  COUNT(*) AS count from rol_pagos.rol_pagos where id_personal = '".$_GET['id_personal']."' ");         
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
    
    if($_GET['id_personal'] != '') {
        if ($search == 'false') {
            $SQL = "SELECT R.id, R.codigo_rol, P.cedula_identificacion, P.nombres_completos, P.direccion, R.fecha_rol, R.neto_pagar FROM rol_pagos.rol_pagos R, corporativo.personal P WHERE R.fecha_rol BETWEEN '".$_GET['fecha_inicio']."' AND '".$_GET['fecha_fin']."' AND R.id_personal = P.id AND R.id_personal = '".$_GET['id_personal']."' ORDER BY $sidx $sord offset $start limit $limit";
        } else {
            $campo = $_GET['searchField'];
          
            if ($_GET['searchOper'] == 'eq') {
                $SQL = "SELECT R.id, R.codigo_rol, P.cedula_identificacion, P.nombres_completos, P.direccion, R.fecha_rol, R.neto_pagar FROM rol_pagos.rol_pagos R, corporativo.personal P WHERE R.fecha_rol BETWEEN '".$_GET['fecha_inicio']."' AND '".$_GET['fecha_fin']."' AND R.id_personal = P.id AND R.id_personal = '".$_GET['id_personal']."' AND $campo = '$_GET[searchString]' ORDER BY $sidx $sord offset $start limit $limit";
            }         
            if ($_GET['searchOper'] == 'cn') {
                $SQL = "SELECT R.id, R.codigo_rol, P.cedula_identificacion, P.nombres_completos, P.direccion, R.fecha_rol, R.neto_pagar FROM rol_pagos.rol_pagos R, corporativo.personal P WHERE R.fecha_rol BETWEEN '".$_GET['fecha_inicio']."' AND '".$_GET['fecha_fin']."' AND R.id_personal = P.id AND R.id_personal = '".$_GET['id_personal']."' AND $campo like '%$_GET[searchString]%' ORDER BY $sidx $sord offset $start limit $limit";
            }
        }   
    } else {
        if ($search == 'false') {
            $SQL = "SELECT R.id, R.codigo_rol, P.cedula_identificacion, P.nombres_completos, P.direccion, R.fecha_rol, R.neto_pagar FROM rol_pagos.rol_pagos R, rol_pagos.detalle_rol_pagos D, corporativo.personal P WHERE R.fecha_rol BETWEEN '".$_GET['fecha_inicio']."' AND '".$_GET['fecha_fin']."' AND R.id = D.id_rol_pagos AND R.id_personal = P.id ORDER BY $sidx $sord offset $start limit $limit";
        } else {
            $campo = $_GET['searchField'];
          
            if ($_GET['searchOper'] == 'eq') {
                $SQL = "SELECT R.id, R.codigo_rol, P.cedula_identificacion, P.nombres_completos, P.direccion, R.fecha_rol, R.neto_pagar FROM rol_pagos.rol_pagos R, rol_pagos.detalle_rol_pagos D, corporativo.personal P WHERE R.fecha_rol BETWEEN '".$_GET['fecha_inicio']."' AND '".$_GET['fecha_fin']."' AND R.id = D.id_rol_pagos AND R.id_personal = P.id AND $campo = '$_GET[searchString]' ORDER BY $sidx $sord offset $start limit $limit";
            }         
            if ($_GET['searchOper'] == 'cn') {
                $SQL = "SELECT R.id, R.codigo_rol, P.cedula_identificacion, P.nombres_completos, P.direccion, R.fecha_rol, R.neto_pagar FROM rol_pagos.rol_pagos R, rol_pagos.detalle_rol_pagos D, corporativo.personal P WHERE R.fecha_rol BETWEEN '".$_GET['fecha_inicio']."' AND '".$_GET['fecha_fin']."' AND R.id = D.id_rol_pagos AND R.id_personal = P.id AND $campo like '%$_GET[searchString]%' ORDER BY $sidx $sord offset $start limit $limit";
            }
        } 
    }
      
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
        $s .= "<cell>" . $row[1] . "</cell>";
        $s .= "<cell>" . $row[2] . "</cell>";
        $s .= "<cell>" . $row[3] . "</cell>";
        $s .= "<cell>" . $row[4] . "</cell>";
        $s .= "<cell>" . $row[5] . "</cell>";
        $s .= "<cell>" . $row[6] . "</cell>";
        $s .= "<cell></cell>";
        $s .= "</row>";
    }
    $s .= "</rows>";
    echo $s;    
?>