<?php
require '.././libs/Slim/Slim.php';
require_once 'dbHelper.php';

\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
$app = \Slim\Slim::getInstance();
$db = new dbHelper();

/**
 * Database Helper Function templates
 */
/*
select(table name, where clause as associative array)
insert(table name, data as associative array, mandatory column names as array)
update(table name, column names as associative array, where clause as associative array, required columns as array)
delete(table name, where clause as array)
*/

$app->get('/bolas', function() { 
    global $db;
    $rows = $db->select("bolas","*",array());
    echoResponse(200, $rows);
});

$app->post('/bolas', function() use ($app) { 
    $data = json_decode($app->request->getBody());
    $mandatory = array('code');
    global $db;
    $rows = $db->insert("bolas", $data, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Product added successfully.";
    echoResponse(200, $rows);
});

$app->put('/bolas/:id', function($id) use ($app) { 
    $data = json_decode($app->request->getBody());
    $condition = array('id'=>$id);
    $mandatory = array();
    global $db;
    $rows = $db->update("bolas", $data, $condition, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Product information updated successfully.";
    echoResponse(200, $rows);
});
$app->delete('/bolas/:id', function($id) { 
    global $db;
    $rows = $db->delete("bolas", array('id'=>$id));
    if($rows["status"]=="success")
        $rows["message"] = "Product removed successfully.";
    echoResponse(200, $rows);
});

$app->get('/personas', function() { 
    global $db;
    $rows = $db->select("personas","*",array());
    echoResponse(200, $rows);
});

$app->post('/personas', function() use ($app) { 
    $data = json_decode($app->request->getBody());
    $mandatory = array('name');
    global $db;
    $rows = $db->insert("personas", $data, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Product added successfully.";
    echoResponse(200, $rows);
});

$app->put('/personas/:id', function($id) use ($app) { 
    $data = json_decode($app->request->getBody());
    $condition = array('id'=>$id);
    $mandatory = array();
    global $db;
    $rows = $db->update("personas", $data, $condition, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Product information updated successfully.";
    echoResponse(200, $rows);
});

$app->delete('/personas/:id', function($id) { 
    global $db;
    $rows = $db->delete("personas", array('id'=>$id));
    if($rows["status"]=="success")
        $rows["message"] = "Product removed successfully.";
    echoResponse(200, $rows);
});

//front
$app->get('/graphic/personsByball/:id', function($id) { 
	$condition = array('bola'=>$id);
    global $db;
    $rows = $db->select("personas","name",$condition);
    echoResponse(200, $rows);
});

$app->get('/graphic/allpersonsByBall/', function() {
    global $db;
	$response = array();
	$rows = $db->select("bolas","id",array());
	if($rows["status"]=="success"){
		
		$balls = $rows["data"];
		
		for($i = 0; $i < count($balls); $i++){
			$id = $balls[$i]["id"];
			$condition = array('bola'=>$id);
			$rawdata = $db->select("personas","name",$condition);
			if($rows["status"]=="success"){
				//$tempArray = array($i=>$rawdata["data"])
				//array_push ($response,$tempArray);
			}
			
		}
		$rows["data"] = $response;
	}

    echoResponse(200, $rows);
});


// Products
/*
$app->get('/products', function() { 
    global $db;
    $rows = $db->select("products","id,sku,name,description,price,mrp,stock,image,packing,status",array());
    echoResponse(200, $rows);
});

$app->post('/products', function() use ($app) { 
    $data = json_decode($app->request->getBody());
    $mandatory = array('name');
    global $db;
    $rows = $db->insert("products", $data, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Product added successfully.";
    echoResponse(200, $rows);
});

$app->put('/products/:id', function($id) use ($app) { 
    $data = json_decode($app->request->getBody());
    $condition = array('id'=>$id);
    $mandatory = array();
    global $db;
    $rows = $db->update("products", $data, $condition, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Product information updated successfully.";
    echoResponse(200, $rows);
});

$app->delete('/products/:id', function($id) { 
    global $db;
    $rows = $db->delete("products", array('id'=>$id));
    if($rows["status"]=="success")
        $rows["message"] = "Product removed successfully.";
    echoResponse(200, $rows);
});
*/
function echoResponse($status_code, $response) {
    global $app;
    $app->status($status_code);
    $app->contentType('application/json');
    echo json_encode($response,JSON_NUMERIC_CHECK);
}

$app->run();
?>