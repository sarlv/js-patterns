/*
Шаблон стратегии позволяет выбирать тот или иной 
алгоритм во время выполнения. Пользователи вашего 
программного кода могут работать с одним и тем же 
интерфейсом и выбирать из множества доступных 
алгоритмов тот, который лучше подходит для 
решения определенной задачи в зависимости от 
сложившихся условий.
*/

var validator = {

    types: {},

    messages: [],

    config: {},

    validate: function( data ) {
        var i, msg, type, checker, result_ok;

        this.messages = [];

        for (i in data) {
            if (data.hasOwnProperty(i)) {
                
                type = this.config[i];
                checker = this.types[type];

                if (!type) {
                    continue;
                }
                if (!checker) {
                    throw {
                        name: 'ValidationError',
                        message: 'No handler to validate type ' + type
                    };
                }

                result_ok = checker.validate(data[i]);

                if (!result_ok) {
                    msg = 'Invalid value for *' + i + ' * , ' +
                    checker.instructions;
                    this.messages.push(msg);
                }
            }
        }
        return this.hasErrors();
    },

    hasErrors: function() {
        return this.messages.length !== 0;
    }
};


validator.types.isNonEmpty = {
    validate: function(value) {
        return value !== '';
    },
    instructions: 'the value cannot be empty'
};

validator.types.isNumber = {
    validate: function(value) {
        return !isNaN(value);
    },
    instructions: 'the value can only be a valid number, e.g. 1, 3.14 or 2010'
};

validator.types.isAlphaNum = {
    validate: function(value) {
        return !/[^a­z0­9]/i.test(value);
    },
    instructions: 'the value can only contain characters and numbers, no special symbols '
};

validator.config = {
    first_name: 'isNonEmpty',
    age: 'isNumber',
    username: 'isAlphaNum'
};

validator.validate({
    first_name: 'Super',
    last_name: 'Man',
    age: 'unknown',
    username: 'o_O'
});

if (validator.hasErrors()) {
    console.log(validator.messages.join('\n'));
}








