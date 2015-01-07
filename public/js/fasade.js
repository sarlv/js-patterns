/*
Фасад (façade) – простой шаблон; он 
только предоставляет альтернативный 
интерфейс для объекта. При проектировании 
считается хорошей практикой делать методы 
короткими и не выполнять в них слишком большое 
количество операций. Следуя такой практике, 
вы будете получать большее количество методов, 
чем в случае реализации супер методов с большим 
количеством параметров. Бывает, что два или более 
методов часто вызываются вместе. В подобных 
ситуациях есть смысл создать новый метод, 
обертывающий повторяющуюся комбинацию вызовов 
других методов.
*/

var myevent = {
    stop: function(e) {
        e.preventDefault();
        e.stopPropagation();
    }
};

var myevent1 = {
    stop: function(e) {
        // прочие броузеры
        if (typeof e.preventDefault === 'function') {
            e.preventDefault();
        }
        if (typeof e.stopPropagation === 'function') {
            e.stopPropagation();
        }
        // IE
        if (typeof e.returnValue === 'boolean') {
            e.returnValue = false;
        }
        if (typeof e.cancelBubble === 'boolean') {
            e.cancelBubble = true;
        }
    }
};
