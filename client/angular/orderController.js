myApp.controller('orderController', function ($scope, orderFactory, menuFactory, customerFactory, $routeParams) {
	$scope.orders = [];
	$scope.itemsOrder = [];
	$scope.qtyOrder = [];
	$scope.newOrder = {total: 0};
	$scope.numbers = []

	for(var i = 0; i<99; i++){
		$scope.numbers.push(i);
	}

	console.log("staff");
	console.log($routeParams);

	 $scope.user = JSON.parse(sessionStorage.getItem('user'));
  
 	 console.log($scope.user);

	 var user_id = sessionStorage.getItem('user_id');   

	if ($routeParams.person){
		orderFactory.getOrders_pending(function (data) {
			$scope.orders = data;
		})
	} else{
		orderFactory.getOrders_unpaid(function (data) {
			$scope.orders = data;
		})
	}

	$scope.menus = [];
	menuFactory.getMenus(function (data) {
		$scope.menus = data;
	})

	$scope.customers = [];
	customerFactory.getCustomers(function (data) {
		$scope.customers = data;
	})

	$scope.itemOrder = function(item){
		var found = false;
		for (var i=0; i<$scope.itemsOrder.length; i++){
			if ($scope.itemsOrder[i] == item){
				$scope.qtyOrder[i] += 1;
				found = true;
			}
		}

		if(!found){
			$scope.itemsOrder.push(item);
			$scope.qtyOrder.push(1);
		}
		
		$scope.newOrder.total += item.price;
	}

	$scope.itemRemove = function(index){
		var itemTotal = $scope.itemsOrder[index].price * $scope.qtyOrder[index];
		$scope.newOrder.total -= itemTotal;
		$scope.itemsOrder.splice(index,1);
	}

	$scope.itemDecr = function(index){
		$scope.newOrder.total -= $scope.itemsOrder[index].price;
		if($scope.qtyOrder[index] == 1){
			$scope.itemsOrder.splice(index,1);
			$scope.qtyOrder.splice(index,1);
		} else {
			$scope.qtyOrder[index] -= 1;
		}
	}

	$scope.itemIncr = function(index){
		$scope.newOrder.total += $scope.itemsOrder[index].price;
		$scope.qtyOrder[index] += 1;
	}

	$scope.addOrder = function (newOrder, items) {
		newOrder.menu = items;
		newOrder.qty = $scope.qtyOrder;
		newOrder.staff = user_id;
		console.log('here new order');
		console.log(newOrder);
		orderFactory.addOrder(newOrder);

		orderFactory.getOrders_unpaid(function (data) {
		$scope.orders = data;
		})
	}

	$scope.orderReady = function(order){
		console.log('order ready');
		orderFactory.orderReady(order);

		orderFactory.getOrders_pending(function (data) {
			$scope.orders = data;
		})
	}

	$scope.orderServed = function(order){
		console.log('order ready');
		orderFactory.orderServed(order);
		
		orderFactory.getOrders_unpaid(function (data) {
			$scope.orders = data;
		})
	}

	$scope.deleteOrder = function (order) {
		console.log('con deleteorder',order)
		orderFactory.deleteOrder(order);
	}

//ends controller
});