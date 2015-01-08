/*
Шаблон итератора применяется, 
когда имеется объект, содержащий 
совокупность данных. Эти данные могут 
храниться в виде сложной структуры, 
а вам необходимо обеспечить удобный 
доступ к каждому элементу этой структуры.
*/

var agg = (function() {
    var index = 0,
        data = [{a:1},{b:2},{c:3},{d:4},{f:5}],
        length = data.length;
    
    return {
        next: function(step) {
            var element;

            if (!this.hasNext()) {
                return null;
            }

            element = data[index];
            index = index + step;

            return element;
        },

        hasNext: function() {
            return index < length;
        },

        rewind: function () {
            index = 0;
        },

        current: function () {
            return data[index];
        }
    };

}());

while (agg.hasNext()) {
    console.log(agg.current());
    agg.next(1);   
}

// agg.rewind();
// console.log(agg.current());





