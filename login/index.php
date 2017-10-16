<?php
  session_start();
  if ($_SESSION) {
    header('Location: ../');
  }
?>
    <!DOCTYPE html>

    <html lang="es">

    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- Angular Material style sheet -->
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/angular_material/1.1.0/angular-material.min.css">
        <link rel="stylesheet" href="../dist/css/jquery.gritter.min.css" />
        <!-- <link rel="stylesheet" href="../dist/css/ace.min.css" />
    <link rel="stylesheet" href="../dist/css/ace-rtl.min.css" /> -->
        <link rel="stylesheet" href="style.css">
    </head>

    <body ng-app="loginApp" ng-cloak>
        <div ng-controller="AppCtrl" layout="column" style="height:600px" ng-cloak>
            <md-toolbar md-scroll-shrink ng-if="true">
                <div class="md-toolbar-tools">
                    <span>OYEFM ECUADOR</span>
                    <span flex></span>
                    <md-button class="md-icon-button" aria-label="Favorite">
                        <md-icon>favorite</md-icon>
                    </md-button>
                </div>
            </md-toolbar>

            <div class="login">
                <form name="clientLogin">
                    <a href="" target="_blank"><img src="../img/logo.png" class="dib2"></a>
                    <md-input-container style="width: 340px;font-size: 14px;">

                      <label for="label">Introduce tu usuario</label>
                      <input type="text" ng-model="txt_nombre" id="txt_nombre" name="txt_clave">
                    </md-input-container>

                    <md-input-container style="width: 340px;font-size: 14px;">

                      <label for="label">Introduce tu contraseña</label>
                      <input type="password" ng-model="txt_clave" id="txt_clave" name="txt_clave">
                    </md-input-container>

                    <md-button class="add-tab md-primary md-raised" ng-disabled="!txt_nombre || !txt_clave" type="submit" ng-click="myFunction()" >SIGUIENTE</md-button>
                    <!-- <md-progress-linear md-mode="determinate" value="{{vm.determinateValue}}"></md-progress-linear> -->
                </form>
            </div>
            <center>
            <footer>
                <p>&copy; Copyright 2017, <a href="" target="_blank">OYEFM</a></p>
            </footer>
        </div>

        <!-- Angular Material requires Angular.js Libraries -->
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-animate.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-aria.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-messages.min.js"></script>

        <!-- Angular Material Library -->
        <script src="https://ajax.googleapis.com/ajax/libs/angular_material/1.1.0/angular-material.min.js"></script>

        <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
        <script src="../dist/js/jquery.gritter.min.js"></script>
        <script src="../dist/js/lockr.min.js"></script>
        <script src="../dist/js/jquery.blockUI.js"></script>
        <script type="text/javascript" src="./app.js"></script>

        <!-- <script src="login.js"></script> -->
    </body>

    </html>