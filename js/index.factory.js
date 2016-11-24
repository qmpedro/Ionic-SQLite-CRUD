angular.module('starter')
.factory('IndexFactory', IndexFactory); 

function IndexFactory($cordovaSQLite, $q){
    
    var retorno = {
        SetNome: _setNome,
        GetNomes: _getNomes,
        DelNome: _delNome
    };
    
    return retorno;

    //__________________________________________

    function _setNome(parametros){
        var query = "INSERT INTO people (firstname, lastname) VALUES (?, ?)";
        $cordovaSQLite.execute(db, query, parametros).then(function(res) {
        }, function (err) {
            console.error(err);
        });
    };


    function _getNomes(){

        var q = $q.defer();

        //$ionicPlatform.ready(function () {
            var query = "Select id, firstname, lastname from people";
            $cordovaSQLite.execute(db, query).then(function(res) {                                
                                
                var listaResult = [];
                if(res.rows.length > 0){
                    for (var i = 0; i < res.rows.length; i++) {
                        listaResult.push({ 
                            id: res.rows.item(i).id, 
                            firstname: res.rows.item(i).firstname,
                            lastname: res.rows.item(i).lastname
                        });
                    };
                }
                q.resolve(listaResult);

            }, function (err) {
                console.log(err);
                q.reject(err);
            });
        //});
        
        return q.promise;
    };
    

    function _delNome(id){
        var query = "delete from people where id = ?";
        $cordovaSQLite.execute(db, query, [id]).then(function(res) {
        }, function (err) {
            console.error(err);
        });
    };

};