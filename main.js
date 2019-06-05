let crossmay=100;        //交叉率
let mutatedmay=25;        //变异率
let  selectmay=100         //选择率


function random(lower, upper) {
	return Math.floor(Math.random() * (upper - lower)) + lower;
}


function getCtx(){
    let can=document.getElementById('can');
    can.width=can.width;
    ctx=can.getContext('2d')
    ctx.fillStyle = 'black';                    //定义填充样式
    ctx.lineWidth = '1';                        //定义线性的线宽，宽是从圆圈向内外两边同时加粗的
    return ctx
}

function strocke(ct,best){      
                                                 //画布函数，按照传过来的路径进描画
                                                
    let ctx=getCtx();
    for(i=0;i<ct.length;i++)
    {
    
        ctx.beginPath();
        ctx.arc(ct[i].x,ct[i].y,3,0*Math.PI,2*Math.PI,true);
        ctx.fill();
        
    }
    for(i=0;i<50;i++){
        ctx.beginPath();
        if(i===0){
            ctx.moveTo(ct[best[49]].x,ct[best[49]].y);
        }else{
            ctx.moveTo(ct[best[i-1]].x,ct[best[i-1]].y);
        }
        ctx.lineTo(ct[best[i]].x,ct[best[i]].y);
        ctx.closePath();
        ctx.stroke();
    }
}


class random_city{                                 //初始化n个城市对象
    constructor(n){ 
        this.city_number=n;
        this.city_ps=[];
        this.city_id=[];
        this.can=$('#can');
        this.cheight=this.can.height();
        this.cwidth=this.can.width();
        for(let i=0;i<this.city_number;i++){
            this.city_ps.push({
                id:i,
                x:random(10,this.cwidth-10),
                y:random(10,this.cheight-10)
            })
            this.city_id.push(i)
         }
    }

}
$( function(){
    let data=random_begain();
    let settime;
    //console.log(originFather);
    // for(i=0;i<100;i++){
    //   console.log(i+'---'+data.originFather[i].socer) 
    // }
    // console.log('--------------------') 
       
    $("#new").click(function(){
      clearInterval(settime);
      data=random_begain();
 })
 

    $("#begin").click(function(){
       settime=setInterval(() => {
        evolution(data.originFather,data.city_ps);
        let best=getbest(data.originFather)
        strocke(data.city_ps,best)
        console.log(best.socer)
        mutated(data.originFather,data.city_ps)
      }, 1);

    })

    
    $("#stop").click(function(){
         clearInterval(settime);
    })
   

 })
   
      
  
    // for(i=0;i<100;i++){
    //   console.log(i+'---'+data.originFather[i].socer) 
    // }





function shuffle(arr) {                                                  //打乱数组生成父代
    var length = arr.length,               
      randomIndex,
      temp;
    while (length) {
      randomIndex = Math.floor(Math.random() * (length--));
      temp = arr[randomIndex];
      arr[randomIndex] = arr[length];
      arr[length] = temp
    }
    return arr;
  }

  function makeOrigin(city_id){
      let originFather=[];
      for(let i=0;i<50;i++){
        originFather[i]=[].concat(shuffle(city_id))
        originFather[i].socer=0;
      }
       // console.log(originFather)
      //console.log(originFather)
      return originFather
  }
 


  function random_begain(){                   //初始化环境
    let randomCity=new random_city(50)
    let city_id=randomCity.city_id;
    let city_ps=randomCity.city_ps;
    originFather=makeOrigin(city_id);                               //传回100个随机父代
    makeoriginsorce(originFather,city_ps);                          //计算第一代的分数并且将数值存储在arr.socer属性当中  
    let best=getbest(originFather);                                 //在初代中获得最好的个体
    ct=randomCity.city_ps;
    strocke(ct,best)                                                   //进行画布的操作
    return data={originFather:originFather,city_ps:city_ps};
  }

  function getbest(arr){                                           //获取这代最好的个体
    let best;
    let bestsocer=0;
      for(i=0;i<50;i++){
          if(bestsocer<arr[i].socer){
            bestsocer=arr[i].socer;
            best=arr[i];    
          }
      }
      return best;
  }
  function getbestps(arr){                                           //获取这代最好的个体
    let i;
    let bestsocer=0;
      for(j=0;j<50;j++){
          if(bestsocer<arr[j].socer){
            bestsocer=arr[j].socer;
            best=arr[j];    
            i=j
          }
      }
      
      return i;
     
  }


function makeoriginsorce(father,city_ps){                             //计算初代分数并把父代分数存在最后一位
        
        for(let i=0;i<50;i++){
          father[i].socer=signsoce(father[i],city_ps);
          
         // console.log(father[i])
        }  
 }


 function signsoce(father,city_ps){                                    //计算单个个体的分数
   // console.log(father)
   let socer=0;
   for(i=0;i<50;i++){
       if(i===0){
           socer=socer+Math.sqrt(((city_ps[father[49]].x-city_ps[father[i]].x)*(city_ps[father[49]].x-city_ps[father[i]].x))+((city_ps[father[49]].y-city_ps[father[i]].y)*(city_ps[father[49]].y-city_ps[father[i]].y)))
       }
       else{
          socer=socer+Math.sqrt(((city_ps[father[i-1]].x-city_ps[father[i]].x)*(city_ps[father[i-1]].x-city_ps[father[i]].x))+((city_ps[father[i-1]].y-city_ps[father[i]].y)*(city_ps[father[i-1]].y-city_ps[father[i]].y)))
       }

         
    //console.log(Math.sqrt((city_ps[father[i]].x*city_ps[father[i]].x+city_ps[father[i]].y*city_ps[father[i]].y)))
   }
   
   return 100000/socer
 }


 
 function evolution(originFather,city_ps){                                                          //一代个体的进化
        
         let a = new Array(50)
         let i = a.length;
         let crosszi=random(0,50);
         while(i--){a[i] = i}
         let selected=shuffle(a)
        
        for(let i=0;i<50;i+=2){
          if(crosszi>crossmay)continue;
            let son=cross(originFather[selected[i]],originFather[selected[i+1]],city_ps)           //交叉生成后代
            let no=[originFather[selected[i]],originFather[selected[i+1]],son.son1,son.son2]
            no.sort(function(a,b){
             return  b.socer-a.socer;
            })
            if(random(0,50)<selectmay){
            originFather[selected[i]]=no[0];
            originFather[selected[i+1]]=no[1];
          }
        }
      
        
 }


 function cross(father,mather,city_ps){                                                              //交叉生成后代
   let randomindex=random(0,50)
   let son1=[];
   let son2=[];
   let indextepm;
  

   circlebg=father[randomindex]
   index=randomindex;
     for(;;){
        son1[index]=father[index];
        son2[index]=mather[index];
        indextepm=mather[index];
        if(mather[index]===circlebg){
          break;
         }
        index=father.indexOf(indextepm);
       
     }
     

      for(let i=0;;i++){
        if(i===50)break
        if(son1[i]==undefined){
            son1[i]=mather[i];
        }
        if(son2[i]==undefined){
           son2[i]=father[i];
     }
    }

    //------------------------------------------------进行替换
     son1.socer=signsoce(son1,city_ps);
     son2.socer=signsoce(son2,city_ps);
     return son={son1,son2}
 }
                  
 
 function mutated(origin,city_ps){
  let best=getbestps(origin)
  for(let i=0;i<50;i++){
    if(random(0,49)<mutatedmay&&i!==best)
    {
      for(let j=0;j<3;j++)
      {
      let first=random(0,50)
      let end=random(0,50);
      let temp;
      temp=origin[i][first];
      origin[i][first]=origin[i][end];
      origin[i][end]=temp;
      origin[i].socer=signsoce(origin[i],city_ps)
      }
    }
  }


 }
