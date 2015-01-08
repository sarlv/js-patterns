/*
В шаблоне прокси-объекта (промежуточного объекта) 
один объект играет роль интерфейса другого объекта. 
Этот шаблон отличается от шаблона фасада, где все, 
что от вас требуется, – это создать удобные методы, 
объединяющие в себе вызовы других методов. Промежуточный 
объект располагается между пользовательским программным 
кодом и объектом и регулирует доступ к этому объекту.
Этот шаблон может показаться излишеством, тем не менее 
его использование может дать прирост производительности. 
Промежуточный объект служит защитником основного объекта 
(иногда его называют «действительным объектом») и стремится 
максимально уменьшить количество обращений к дей
ствительному объекту. Примером использования этого шаблона 
может служить реализация того, что мы называем отложенной 
инициализацией. Представьте, что инициализация действительного 
объекта – достаточно дорогостоящая операция, и может случиться так, 
что пользовательский программ- ный код потребует выполнить 
инициализацию объекта, но никогда не будет использовать его. 
В подобных ситуациях нам может помочь прокси-объект, являющийся 
интерфейсом к действительному объекту. Прокси-объект может 
принять запрос на инициализацию, но не пере- давать его дальше, 
пока не станет очевидным, что действительный объект на самом 
деле необходим.
*/

var CarList = function() {
    //creation
};
 
CarList.prototype = {
    getCar: function(arg) {
        // get a vehicle from the list using the 
        // given parameters
        console.log('get car');
    },
     
    search: function(arg) {
        // search through the cars using the query
        console.log('search car');
    },
     
    addCar: function(arg) {
        // add a car to the database
        console.log('add car');
    }
};

var CarListProxy = function() {
    // Don't initialize the CarList yet.
    this.carList = null;
};
CarListProxy.prototype = {
    // this function is called any time any other
    // function gets called in order to initialize
    // the CarList only when needed.
    _init: function() {
        if (!this.carList) {
            this.carList = new CarList();
        }
    },
     
    getCar: function(arg) {
        // every function makes this call to _init()
        this._init();
        return this.carList.getCar(arg);
    },
     
    search: function(arg) {
        this._init();
        return this.carList.search(arg);
    },
     
    addCar: function(arg) {
        this._init();
        return this.carList.addCar(arg);
    }
}

var elem = document.getElementById('results');

var carProxy = new CarListProxy();

elem.onclick = function() {
    carProxy.getCar.call(carProxy);
}











