var Proxy = Proxy || {};

/*Proxy.productDelete = function(product,callBack){
    jsonText = JSON.stringify(product,replacer);
    var AJAX_req = new XMLHttpRequest();
    url="/33-CarritoCompra/ProductosServlet?action=productDelete";
    AJAX_req.open( "POST", url, true );
    AJAX_req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var callBackConstructor= function(productParameter){ 
            return function(){
                if( AJAX_req.readyState === 4 && AJAX_req.status === 200 ){
                    callBack(productParameter);
                }            
            };
        };
    AJAX_req.onreadystatechange = callBackConstructor(product);
    AJAX_req.send("product="+jsonText);   
};

Proxy.productListCategory = function(category,callBack){
    jsonText = category;
    var AJAX_req = new XMLHttpRequest();
    url="/33-CarritoCompra/ProductosServlet?action=productListCategory";
    AJAX_req.open( "POST", url, true );
    AJAX_req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    AJAX_req.onreadystatechange = function(){
        if( AJAX_req.readyState === 4 && AJAX_req.status === 200 ){
            jsonText=AJAX_req.responseText;
            var object = JSON.parse( jsonText,revive );
            callBack(object);
        }
    };
    AJAX_req.send("category="+jsonText);   
};

Proxy.ProductListSearch = function(criteria,callBack){
    jsonText = criteria;
    var AJAX_req = new XMLHttpRequest();
    url="/33-CarritoCompra/ProductosServlet?action=ProductListSearch";
    AJAX_req.open( "POST", url, true );
    AJAX_req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    AJAX_req.onreadystatechange = function(){
        if( AJAX_req.readyState === 4 && AJAX_req.status === 200 ){
            jsonText=AJAX_req.responseText;
            var object = JSON.parse( jsonText,revive );
            callBack(object);
        }
    };
    AJAX_req.send("criteria="+jsonText);   
};

Proxy.ProductListAll = function(callBack){
    var AJAX_req = new XMLHttpRequest();
    url="/33-CarritoCompra/ProductosServlet?action=ProductListAll";
    AJAX_req.open( "POST", url, true );
    AJAX_req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    AJAX_req.onreadystatechange = function(){
        if( AJAX_req.readyState === 4 && AJAX_req.status === 200 ){
            jsonText=AJAX_req.responseText;
            var object = JSON.parse( jsonText,revive );
            callBack(object);
        }
    };
    AJAX_req.send();   
};
*/
Proxy.userLogin = function(user,callBack){
    jsonText = JSON.stringify(user,replacer);
    var AJAX_req = new XMLHttpRequest();
    url="/SistemaClinica/ClinicaServlet?action=userLogin";
    AJAX_req.open( "POST", url, true );
    AJAX_req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    AJAX_req.onreadystatechange = function(){
        if( AJAX_req.readyState === 4 && AJAX_req.status === 200 ){
            jsonText=AJAX_req.responseText;
            var object = JSON.parse( jsonText,revive );
            callBack(object);
        }
    };
    AJAX_req.send("user="+jsonText);   
};

Proxy.userLogout = function(callBack){
    var AJAX_req = new XMLHttpRequest();
    url="/33-CarritoCompra/ProductosServlet?action=userLogout";
    AJAX_req.open( "POST", url, true );
    AJAX_req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    AJAX_req.onreadystatechange = function(){
        if( AJAX_req.readyState === 4 && AJAX_req.status === 200 ){
            callBack();
        }
    };
    AJAX_req.send();   
};

Proxy.getAdmin = function(callBack){
    var AJAX_req = new XMLHttpRequest();
    url="/SistemaClinica/ClinicaServlet?action=getAdmin";
    AJAX_req.open( "POST", url, true );
    AJAX_req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    AJAX_req.onreadystatechange = function(){
        if( AJAX_req.readyState === 4 && AJAX_req.status === 200 ){
            jsonText=AJAX_req.responseText;
            var object = JSON.parse( jsonText,revive );
            callBack(object);
        }
    };
    AJAX_req.send();   
};
Proxy.addMedic = function(medic,callBack){
    jsonText = JSON.stringify(medic,replacer);
    var AJAX_req = new XMLHttpRequest();
    url="/SistemaClinica/ClinicaServlet?action=addMedic";
    AJAX_req.open( "POST", url, true );
    AJAX_req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    AJAX_req.onreadystatechange = function(){
        if( AJAX_req.readyState === 4 && AJAX_req.status === 200 ){
            callBack();
        }
    };
    AJAX_req.send("medic="+jsonText);   
};
Proxy.MedicListAll = function(callBack){
    var AJAX_req = new XMLHttpRequest();
    url="/SistemaClinica/ClinicaServlet?action=MedicListAll";
    AJAX_req.open( "POST", url, true );
    AJAX_req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    AJAX_req.onreadystatechange = function(){
        if( AJAX_req.readyState === 4 && AJAX_req.status === 200 ){
            jsonText=AJAX_req.responseText;
            var object = JSON.parse( jsonText,revive );
            callBack(object);
        }
    };
    AJAX_req.send();   
};
Proxy.MedicListSearch = function(criteria,callBack){
    jsonText = criteria;
    var AJAX_req = new XMLHttpRequest();
    url="/SistemaClinica/ClinicaServlet?action=MedicListSearch";
    AJAX_req.open( "POST", url, true );
    AJAX_req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    AJAX_req.onreadystatechange = function(){
        if( AJAX_req.readyState === 4 && AJAX_req.status === 200 ){
            jsonText=AJAX_req.responseText;
            var object = JSON.parse( jsonText,revive );
            callBack(object);
        }
    };
    AJAX_req.send("criteria="+jsonText); 
};
/*
Proxy.PurchaseConfirm = function(compra,items,callBack){
    jsonCompra = JSON.stringify(compra,replacer);
    jsonItems = JSON.stringify(items,replacer);
    var AJAX_req = new XMLHttpRequest();
    url="/33-CarritoCompra/ProductosServlet?action=PurchaseConfirm";
    AJAX_req.open( "POST", url, true );
    AJAX_req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    AJAX_req.onreadystatechange = function(){
        if( AJAX_req.readyState === 4 && AJAX_req.status === 200 ){
            jsonText=AJAX_req.responseText;
            var object = JSON.parse( jsonText,revive );
            callBack(object);
        }
    };
    AJAX_req.send("compra="+jsonCompra+"&items="+jsonItems);   
};

Proxy.PurchaseListAll = function(callBack){
    var AJAX_req = new XMLHttpRequest();
    url="/33-CarritoCompra/ProductosServlet?action=PurchaseListAll";
    AJAX_req.open( "POST", url, true );
    AJAX_req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    AJAX_req.onreadystatechange = function(){
        if( AJAX_req.readyState === 4 && AJAX_req.status === 200 ){
            jsonText=AJAX_req.responseText;
            var object = JSON.parse( jsonText,revive );
            callBack(object);
        }
    };
    AJAX_req.send();   
};*/

