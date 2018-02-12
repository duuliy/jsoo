/**
 * Created by a on 2017/11/22.
 */
(function(exports, document, undefined){
    "use strict";
    function Ajax(){
        if(!(this instanceof Ajax)) return;
        return this;
    }
    Ajax.prototype = {
        init: function(opts){
            opts = opts || {};
            this.opts = opts;
            this.opts.type = opts.type || 'get';
            this.opts.url = opts.url || '';
            this.opts.data = opts.data || '';
            this.opts.dataType = opts.dataType || 'text';
            this.opts.async = opts.async || true;
            this.opts.success = opts.success || null;
            this.opts.error = opts.error || null;
            this.xhr = this.createXMLHttpRequest.call(this);
            this.initEvent.call(this);
            return this;
        },
        ajax: function(opts){
            this.init.apply(this, arguments);
            this.open.call(this);
            this.send.call(this);
        },
        createXMLHttpRequest: function(){
            var xhr;
            try{
                if(window.XMLHttpRequest){
                    xhr = new XMLHttpRequest();
                }else{
                    xhr = new ActiveXObject("Microsoft.XMLHTTP")
                }
            }catch(e){
                console.log(e);
            }
            return xhr;
        },
        initEvent: function(){
            var _this = this;
            this.xhr.onreadystatechange = function(){
                if(_this.xhr.readyState == 4 && _this.xhr.status == 200){
                        if(_this.opts.dataType === 'text' || _this.opts.dataType === 'TEXT'){
                            _this.opts.success && _this.opts.success(_this.xhr.responseText, 'success', _this.xhr);
                        }else if(_this.opts.dataType === 'xml' || _this.opts.dataType === 'XML'){
                            _this.opts.success && _this.opts.success(_this.xhr.responseXML, 'success', _this.xhr);
                        }else if(_this.opts.dataType === 'json' || _this.opts.dataType === 'JSON'){
                            _this.opts.success && _this.opts.success(JSON.parse(_this.xhr.responseText), 'success', _this.xhr);
                        }
                    }else{
                        _this.opts.error && _this.opts.error(_this.xhr, 'error');
                    }
            }
        },
        open: function(){
            if(this.opts.type === 'GET' || this.opts.type === 'get'){
                var str = (typeof this.opts.data === 'string') && this.opts.data || this.objectToString.call(this, this.opts.data),
                    url = (str === '') && this.opts.url || (this.opts.url.split('?')[0] + '?' + str);
                this.xhr.open(this.opts.type, url, this.opts.async);
            }else if(this.opts.type === 'POST' || this.opts.type === 'post'){
                this.xhr.open(this.opts.type, this.opts.url.split('?')[0], this.opts.async);
            }
            return this;
        },
        send: function(){
            if(this.opts.type === 'GET' || this.opts.type === 'get'){
                this.xhr.send();
            }else if(this.opts.type === 'POST' || this.opts.type === 'post'){
                var str = (typeof this.opts.data === 'string') && this.opts.data || this.objectToString.call(this, this.opts.data);
                this.xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
                this.xhr.send(str);
            }
        },
        objectToString: function(data){
            if(typeof data !== 'object') return data;
            var str = '';
            for(var prop in data){
                str += '&' + prop + '=' + data[prop];
            }
            return str.slice(1);
        }
    }
    exports.Ajax = Ajax;
})(window, document);