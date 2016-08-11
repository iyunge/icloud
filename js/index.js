var todo=[
        {
        id:1,
        title:"新项目",
        color:"#b14bc9",
        list:[
        ]
    },
];

var app=angular.module("app",[]);
app.controller('all',function($scope){
    $scope.getData=function(){
        var data=JSON.parse(localStorage.getItem('icloud'));//JSON.parse()将符合json格式的字符串转换成json
        return data||todo;
    }
    $scope.todo=$scope.getData();
    $scope.index=0;
    $scope.color=["#b14bc9","#49bf1f","#1badf8","#e0ac00","#a2845e","#ff2968","#ff7f00"];
    $scope.add=function(){
        var ids=$scope.todo[$scope.todo.length-1].id+1;
        var getnew={
            id:ids,
            title:"新项目"+ids,
            color:$scope.color[ids%7],
            list:[]
        }
        $scope.todo.push(getnew);
        $scope.index=$scope.todo.length-1;
        getNum();
        // $scope.getData()
        $scope.saveData($scope.todo)
    };
    $scope.saveData=function(data){
        localStorage.setItem('icloud',JSON.stringify(data))//JSON.stringify()把json转换成字符串
    }

    $scope.doing=function(val,index,arr){
        if(val.done==false){
            var todo=$scope.getData();
            $scope.saveData($scope.todo);
            return true;
        }
    };
    $scope.done=function(val,index,arr){
        if(val.done==true){
             var todo=$scope.getData();
            $scope.saveData($scope.todo)
            return true
        }
    };

    //点击切换展示
    $scope.showcontent=function(i){
        $scope.index=i;
        getNum();
        $scope.peizhif=false;
        var todo=$scope.getData();
        $scope.saveData($scope.todo)
    };
    //获得已完成数量
    getNum();
    function getNum(){
        $scope.num=0;
        angular.forEach($scope.todo[$scope.index].list,function(o,i){
            if(o.done==true){
                $scope.num++
            }
        });
        var todo=$scope.getData();
        $scope.saveData($scope.todo)
    };

    //改变完成、未完成状态
    $scope.over=function(o,sta){
        o.done=sta;
        getNum();
        var todo=$scope.getData();
        $scope.saveData($scope.todo)
    }

    //添加新项目
    $scope.addson=function(i){
        var j=$scope.todo[i].list.push({
            content:'',
            date:new Date(),
            done:false
        })
        var todo=$scope.getData();
        $scope.saveData($scope.todo)
    }

    // 选项点击时出现状态
    $scope.option=function(i){
        $scope.peizhif=!$scope.peizhif;
        $scope.fontColor=$scope.todo[i].color;
        $scope.fontVal=$scope.todo[i].title;
        var todo=$scope.getData();
        $scope.saveData($scope.todo)
    }
// 选项更改颜色
    $scope.changeColor=function(i){
        $scope.fontColor=i;
        var todo=$scope.getData();
        $scope.saveData($scope.todo)
    }

// 选项删除事项时
    $scope.del=function(i){
        if($scope.todo.length>1){
            $scope.todo.splice(i,1);
        }else{
            alert("您需要至少保留一个项目")
            return
        }
        $scope.peizhif=false;
        var todo=$scope.getData();
        $scope.saveData($scope.todo)
    }

// 选项点击完成更改
    $scope.finish=function(i){
        $scope.todo[i].title=$scope.fontVal;
        $scope.todo[i].color=$scope.fontColor;
        $scope.peizhif=false;
        var todo=$scope.getData();
        $scope.saveData($scope.todo)

    }

// 当事项title改变时存储
    $scope.onchange=function(i){
        var todo=$scope.getData();
        $scope.saveData($scope.todo)
    }
})