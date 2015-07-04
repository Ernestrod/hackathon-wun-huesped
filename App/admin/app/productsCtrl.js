app.controller('personasCtrl', function ($scope, $modal, $filter, Data) {
	
	 $scope.persona = {};
	 Data.get('personas').then(function(data){
        $scope.personas = data.data;
	 });
	 
	 $scope.changeStatus = function(item){
        item.status = (item.status=="Active" ? "Inactive" : "Active");
        Data.put("personas/"+item.id,{status:item.status});
    };
	
	$scope.delete = function(item){
        if(confirm("Esta seguro de Querer Borrar esta Persona?")){
            Data.delete("personas/"+item.id).then(function(result){
                $scope.personas = _.without($scope.personas, _.findWhere($scope.personas, {id:item.id}));
            });
        }
    };
	$scope.columns = [
                    {text:"ID",predicate:"id",sortable:true,dataType:"number"},
					{text:"Bola Id",predicate:"code",sortable:true},
					{text:"Nombre",predicate:"name",sortable:true},
					{text:"latLong",predicate:"latLong",sortable:true},
                    {text:"Status",predicate:"status",sortable:true},
                    {text:"Action",predicate:"",sortable:false}
                ];
	
	$scope.open = function (p,size) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/personasEdit.html',
          controller: 'personasEditCtrl',
          size: size,
          resolve: {
            item: function () {
              return p;
            }
          }
        });
        modalInstance.result.then(function(selectedObject) {
            if(selectedObject.save == "insert"){
                $scope.personas.push(selectedObject);
                $scope.personas = $filter('orderBy')($scope.personas, 'id', 'reverse');
            }else if(selectedObject.save == "update"){
                p.bola = selectedObject.bola;
                p.name = selectedObject.name;
                p.latLong = selectedObject.latLong;
            }
        });
    };
});
app.controller('personasEditCtrl', function ($scope, $modalInstance, item, Data) {
	 $scope.persona = angular.copy(item);
	 
	 $scope.cancel = function () {
            $modalInstance.dismiss('Close');
        };
	
	 $scope.title = (item.id > 0) ? 'Editar Persona' : 'Añadir Persona';
      $scope.buttonText = (item.id > 0) ? 'Salvar' : 'Añadir';
	  
	  $scope.save = function (persona) {
            if(persona.id > 0){
                Data.put('personas/'+persona.id, persona).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(persona);
                        x.save = 'update';
                        $modalInstance.close(x);
                    }else{
                        console.log(result);
                    }
                });
            }else{
                persona.status = 'Active';
                Data.post('personas', persona).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(persona);
                        x.save = 'insert';
                        x.id = result.data;
                        $modalInstance.close(x);
                    }else{
                        console.log(result);
                    }
                });
            }
        };
});

app.controller('bolasCtrl', function ($scope, $modal, $filter, Data) {
	
	$scope.bola = {};
    Data.get('bolas').then(function(data){
        $scope.bolas = data.data;
	
    });
	$scope.changeStatus = function(item){
        item.status = (item.status=="Active" ? "Inactive" : "Active");
        Data.put("bolas/"+item.id,{status:item.status});
    };
	
	$scope.deleteProduct = function(item){
        if(confirm("Esta seguro de Querer Borrar esta Bola?")){
            Data.delete("bolas/"+item.id).then(function(result){
                $scope.bolas = _.without($scope.bolas, _.findWhere($scope.bolas, {id:item.id}));
            });
        }
    };
	
	$scope.columns = [
                    {text:"ID",predicate:"id",sortable:true,dataType:"number"},
					{text:"Code",predicate:"code",sortable:true},
                    {text:"Status",predicate:"status",sortable:true},
                    {text:"Action",predicate:"",sortable:false}
                ];

				
				
	$scope.open = function (p,size) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/bolaEdit.html',
          controller: 'bolaEditCtrl',
          size: size,
          resolve: {
            item: function () {
              return p;
            }
          }
        });
        modalInstance.result.then(function(selectedObject) {
            if(selectedObject.save == "insert"){
                $scope.bolas.push(selectedObject);
                $scope.bolas = $filter('orderBy')($scope.bolas, 'id', 'reverse');
            }else if(selectedObject.save == "update"){
                p.code = selectedObject.code;
                p.status = selectedObject.status;
            }
        });
    };
});

app.controller('bolaEditCtrl', function ($scope, $modalInstance, item, Data) {

		$scope.bola = angular.copy(item);
        
        $scope.cancel = function () {
            $modalInstance.dismiss('Close');
        };
        $scope.title = (item.id > 0) ? 'Editar Bola' : 'Añadir bola';
        $scope.buttonText = (item.id > 0) ? 'Salvar' : 'Añadir';

        var original = item;
        $scope.isClean = function() {
            return angular.equals(original, $scope.bola);
        }
        $scope.saveBola = function (bola) {
            if(bola.id > 0){
                Data.put('bolas/'+bola.id, bola).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(bola);
                        x.save = 'update';
                        $modalInstance.close(x);
                    }else{
                        console.log(result);
                    }
                });
            }else{
                bola.status = 'Active';
                Data.post('bolas', bola).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(bola);
                        x.save = 'insert';
                        x.id = result.data;
                        $modalInstance.close(x);
                    }else{
                        console.log(result);
                    }
                });
            }
        };
});




/*
app.controller('productsCtrl', function ($scope, $modal, $filter, Data) {
    $scope.product = {};
    Data.get('products').then(function(data){
        $scope.products = data.data;
    });
    $scope.changeProductStatus = function(product){
        product.status = (product.status=="Active" ? "Inactive" : "Active");
        Data.put("products/"+product.id,{status:product.status});
    };
    $scope.deleteProduct = function(product){
        if(confirm("Are you sure to remove the product")){
            Data.delete("products/"+product.id).then(function(result){
                $scope.products = _.without($scope.products, _.findWhere($scope.products, {id:product.id}));
            });
        }
    };
    $scope.open = function (p,size) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/productEdit.html',
          controller: 'productEditCtrl',
          size: size,
          resolve: {
            item: function () {
              return p;
            }
          }
        });
        modalInstance.result.then(function(selectedObject) {
            if(selectedObject.save == "insert"){
                $scope.products.push(selectedObject);
                $scope.products = $filter('orderBy')($scope.products, 'id', 'reverse');
            }else if(selectedObject.save == "update"){
                p.description = selectedObject.description;
                p.price = selectedObject.price;
                p.stock = selectedObject.stock;
                p.packing = selectedObject.packing;
            }
        });
    };
    
 $scope.columns = [
                    {text:"ID",predicate:"id",sortable:true,dataType:"number"},
                    {text:"Name",predicate:"name",sortable:true},
                    {text:"Price",predicate:"price",sortable:true},
                    {text:"Stock",predicate:"stock",sortable:true},
                    {text:"Packing",predicate:"packing",reverse:true,sortable:true,dataType:"number"},
                    {text:"Description",predicate:"description",sortable:true},
                    {text:"Status",predicate:"status",sortable:true},
                    {text:"Action",predicate:"",sortable:false}
                ];

});



app.controller('productEditCtrl', function ($scope, $modalInstance, item, Data) {

  $scope.product = angular.copy(item);
        
        $scope.cancel = function () {
            $modalInstance.dismiss('Close');
        };
        $scope.title = (item.id > 0) ? 'Edit Product' : 'Add Product';
        $scope.buttonText = (item.id > 0) ? 'Update Product' : 'Add New Product';

        var original = item;
        $scope.isClean = function() {
            return angular.equals(original, $scope.product);
        }
        $scope.saveProduct = function (product) {
            product.uid = $scope.uid;
            if(product.id > 0){
                Data.put('products/'+product.id, product).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(product);
                        x.save = 'update';
                        $modalInstance.close(x);
                    }else{
                        console.log(result);
                    }
                });
            }else{
                product.status = 'Active';
                Data.post('products', product).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(product);
                        x.save = 'insert';
                        x.id = result.data;
                        $modalInstance.close(x);
                    }else{
                        console.log(result);
                    }
                });
            }
        };
});

*/
