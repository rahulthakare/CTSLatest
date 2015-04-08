


describe('customer', function(){

	var cust = {
"name":"Name1",
"company":"Company1",
"email":"email1@cts.com",
"gender":"female"
};

var count = Object.keys(cust).length 

it('Should have size 1', function(){
	expect(count).toEqual(4);
	console.log("test1 success");
})
it('Should have name as', function(){
	expect(cust.name).toEqual('Name1');
	console.log("test2 success");
})

it('Should have company as', function(){
	expect(cust.company).toEqual('Company1');
	console.log("test3 success");
})

it('Should have email as', function(){
	expect(cust.email).toEqual('email1@cts.com'); 
	console.log("test4 success");
})


})



describe('beforeAll', function () {
var mainMenu = 3;
	var subMenu =0;

beforeAll(function () {

});
it('Should load menu', function () {
 expect(mainMenu + subMenu).toBe(3)
});

});