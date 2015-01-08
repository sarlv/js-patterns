/*
Назначение фабрики в том, чтобы создавать объекты. 
Этот шаблон обычно реализуется в виде классов или в 
виде статических методов классов и преследует следующие цели:
• Выполнение повторяющихся операций, необходимых 
  при создании похожих объектов
• Предложить пользователям фабрики способ создания 
  объектов без необходимости знать их тип (класс) на этапе 
  компиляции
Второй пункт наиболее важен в языках со статическими классами, 
где может оказаться совсем непросто создать экземпляр класса, 
неизвест- ного заранее (на этапе компиляции). В JavaScript эта 
часть шаблона реализуется очень просто.
Объекты, создаваемые фабричным методом (или классом), обычно 
наследуют один и тот же родительский объект; они являются 
подкласса- ми, реализующими специализированные функциональные 
возможно- сти. Иногда общим предком является тот же класс, 
который содержит фабричный метод.
*/

function Store() {
    this.item = {};
};

Store.prototype.getItem = function() {
    var i = 0, item = this.item;
    
    for(i in item) {
        console.log(item[i]);
    }

    return item;
};

Store.factory = function( func ) {
    var constr = func,
        newItem;

    if(typeof Store[ constr ] !== 'function') {
        throw {
            name: 'Error',
            message: 'The argument must be function' 
        }
    }

    /******************************
            Main part
    ******************************/

    if(typeof Store[ constr ].prototype.getItem !== 'function') {
        // Constructor
        Store[ constr ].prototype = new Store();
    }

    // Constructor
    newItem = new Store[ constr ]();

    return newItem;
}

Store.CD = function() {
    this.item.author = 'ACDC';
};

Store.Book = function() {
    this.item.author = 'Balzak';
};


var cd = Store.factory('CD');
cd.getItem();

var book = Store.factory('Book');
book.getItem();












