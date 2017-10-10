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
    $resultado = $class->consulta("SELECT  COUNT(*) AS count from rol_pagos.multas");         
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
        $SQL = "SELECT M.id, M.serie_multa, P.nombres_Completos, M.fecha_multa, T.descripcion FROM rol_pagos.multas M, corporativo.personal P, rol_pagos.tipo_multas T WHERE M.id_personal = P.id AND M.id_tipo_multa = T.id  AND M.estado = '1' ORDER BY $sidx $sord offset $start limit $limit";
    } else {
        $campo = $_GET['searchField'];
      
        if ($_GET['searchOper'] == 'eq') {
            $SQL = "SELECT M.id, M.serie_multa, P.nombres_Completos, M.fecha_multa, T.descripcion FROM rol_pagos.multas M, corporativo.personal P, rol_pagos.tipo_multas T WHERE M.id_personal = P.id AND M.id_tipo_multa = T.id  AND M.estado = '1' AND $campo = '$_GET[searchString]' ORDER BY $sidx $sord offset $start limit $limit";
        }         
        if ($_GET['searchOper'] == 'cn') {
            $SQL = "SELECT M.id, M.serie_multa, P.nombres_Completos, M.fecha_multa, T.descripcion FROM rol_pagos.multas M, corporativo.personal P, rol_pagos.tipo_multas T WHERE M.id_personal = P.id AND M.id_tipo_multa = T.id  AND M.estado = '1' AND $campo like '%$_GET[searchString]%' ORDER BY $sidx $sord offset $start limit $limit";
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
        $s .= "<cell></cell>";
        $s .= "</row>";
    }
    $s .= "</rows>";
    echo $s;    
?>