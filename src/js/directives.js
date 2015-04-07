

ctsapp.directive('formFields', function(){
    // Runs during compile
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
         scope: {
             custMain : '='
         }, // {} = isolate, true = child, false/undefined = no change
         controller: function($scope, $element, $attrs, $transclude) {

            $scope.update = function(){

              //  $scope.$apply(function () {
                  $scope.$broadcast('show-errors-check-validity');

                if ($scope.ctsform.$invalid) { return; }

                   $scope.custMain.push($scope.customer);
                   $scope.customer ={};

                                                     


            // });
               
                console.log("in update" + JSON.stringify($scope.custMain));
            }

            $scope.reset = function(form){

                if (form) {
                            form.$setPristine();
                            form.$setUntouched();
                            }
                console.log("in reset");
            }

         },
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
         restrict: 'EA', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
         templateUrl: '../formelements.html',
        // replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        link: function($scope, iElm, iAttrs, controller) {
            

             $scope.$watchCollection(
                    'custMain',
                    function() {
                        console.log( "From dir2" + JSON.stringify($scope.custMain));
                                          
                    }
                );


        }
    };
});



ctsapp
		.directive(
				'gridControl',
				function($timeout, $filter) {


					return {
						restrict : 'E',
						replace : true,
						scope : {

                            detailItems : '='
                            //search : '='

                        },
						controller : function($scope, $filter) {
							
							console.log("in controller");
    // init
    $scope.sortingOrder; // = sortingOrder;
    //$scope.reverse = false;
    $scope.filteredItems = [];
    $scope.groupedItems = [];
   // $scope.itemsPerPage = 5;
    $scope.pagedItems = [];
    $scope.currentPage = 0;
    $scope.newEnter = [];
    $scope.newContact=[];
    $scope.temp=[];
    
     

     $scope.search = function () {
    	//console.log("in search func" + JSON.stringify($scope.detailItems));
        $scope.filteredItems = $filter('filter')($scope.detailItems, $scope.query); 
        // take care of the sorting order
        if ($scope.sortingOrder !== '') {
            $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sortingOrder, $scope.reverse);
        }
        $scope.currentPage = 0;
        // now group by pages
        $scope.calculatePages();
    };
    
    // calculate page in place
    $scope.calculatePages = function () {
    	//console.log("in calculatePages func  "+JSON.stringify($scope.detailItems));
        $scope.pagedItems = [];
        
        for (var i = 0; i < $scope.filteredItems.length; i++) {
            if (i % $scope.itemsPerPage === 0) {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
            } else {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
            }
        }
    };
    
    $scope.range = function (start, end) {
        var ret = [];
        if (!end) {
            end = start;
            start = 0;
        }
        for (var i = start; i < end; i++) {
            ret.push(i);
        }
        return ret;
    };
    
    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };
    
    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pagedItems.length - 1) {
            $scope.currentPage++;
        }
    };
    
    $scope.setPage = function () {
        $scope.currentPage = this.n;
    };

    // functions have been describe process the data for display
  

    // change sorting order
    $scope.sort_by = function(newSortingOrder) {

       // newSortingOrder=newSortingOrder;
    	console.log("in sort by"+ newSortingOrder);
    	
        //if ($scope.sortingOrder == newSortingOrder)
            $scope.reverse = !$scope.reverse;

        $scope.sortingOrder = newSortingOrder;
        this.predicate = newSortingOrder;
        
       
    };

        
    $scope.deleterow = function(id) {
		console.log("Inside delete" + id);
		for (i in $scope.detailItems) {
			if ($scope.detailItems[i].id == id) {
				$scope.detailItems.splice(i, 1);
				
			}
		}
		
		$scope.search();
	}
    
    
    
},

link : function($scope, element, attrs) {

	// scope.newrow =[];
	console.log("in function");
	$scope.caption = attrs.caption.split(',');
	$scope.field = attrs.field.split(',');
    $scope.action = attrs.action.split(',');
    $scope.sortingOrder = attrs.sortby.trim(); 
    $scope.reverse  = attrs.order.trim();
    $scope.itemsPerPage = attrs.pagelen.trim();
      
     if ($scope.itemsPerPage == null)
         $scope.itemsPerPage = 5;

     for(var i=0; i< $scope.action.length; i++)
     $scope.action[i] = $scope.action[i].trim();

  for(var j=0; j< $scope.field.length; j++){
     $scope.field[j] = $scope.field[j].trim();
     $scope.caption[j] = $scope.caption[j];
  }

         $scope.$watchCollection(
                    'detailItems',
                    function() {
                        console.log( "From dir" + JSON.stringify($scope.detailItems));
                    var cnt = 0;
                    for (i in $scope.detailItems) {
                        $scope.detailItems[i].id = cnt++;
                         $scope.detailItems[i].date = new Date($scope.detailItems[i].date);
                      
                    }

                        $scope.search();
                      
                    }
                );

       
    
},

templateUrl : '../gridtemplate.html'

};

				});

