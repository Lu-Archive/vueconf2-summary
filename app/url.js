/**
 * 用于解析url参数
 * @param url
 * @returns {{source: *, protocol, host: string, port: (*|Function|string), query: (*|string), file: *, hash, path: string, relative: *, segments: Array, params}}
 */
function parseUrl(url){
    var a = document.createElement('a');
    a.href = url;
    return {
        source: url,
        protocol: a.protocol.replace(':', ''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
        hash: a.hash.replace('#', ''),
        path: a.pathname.replace(/^([^\/])/, '/$1'),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
        segments: a.pathname.replace(/^\//, '').split('/'),
        params: (function() {
            var ret = {};
            var seg = a.search.replace(/^\?/, '').split('&').filter(function(v,i){
                if (v!==''&&v.indexOf('=')) {
                    return true;
                }
            });
            seg.forEach( function(element, index) {
                var idx = element.indexOf('=');
                var key = element.substring(0, idx);
                var val = element.substring(idx+1);
                ret[key] = val;
            });
            return ret;
        })()
    };
}