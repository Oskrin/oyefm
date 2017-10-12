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
  <md-content flex>

  </md-content>
</div>
  
  <!-- Angular Material requires Angular.js Libraries -->
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-animate.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-aria.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-messages.min.js"></script>

  <!-- Angular Material Library -->
  <script src="https://ajax.googleapis.com/ajax/libs/angular_material/1.1.0/angular-material.min.js"></script>

  <script type="text/javascript" src="./app.js"></script>
  
</body>
</html>
