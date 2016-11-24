angular.module('starter')
.controller('IndexController', IndexController);    

function IndexController(IndexFactory, IndexConstant, $ionicPlatform) {
    var vm = this;
    
    vm.insere = SetNome;
    vm.deleta = DelNome;
    vm.edita = EditNome;

    // ________________________________________________________

    function SetNome(nome){
        var params = [nome.firstName, nome.lastName];
        IndexFactory.SetNome(params);
        GetNomes();
    };

    function GetNomes(){
        IndexFactory.GetNomes().then(function(resultado){
            console.log(resultado);
            vm.nomes = resultado;
        });
    }

    function DelNome(id){
        IndexFactory.DelNome(id);
        GetNomes();
    }

    function EditNome(id){
        console.log(id);
    }

    $ionicPlatform.ready(function (){
        GetNomes();
    });
};