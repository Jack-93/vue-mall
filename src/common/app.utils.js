import PinYin from '@/assets/js/PinYin';
import {Message} from 'element-ui';

export default {
    createUserMenu() {
        return window.$routeMenu;
    },

    checkBrowser() {
        //检查浏览是否要更新升级
        function browserUpdate() {
            var ie = getIEVersion();

            //其他版本
            if (!ie) return false;

            //检查IE版本大于9
            if (ie > 9) {
                return false;
            } else {
                return true;
            }
        }

        // 获取ie版本
        function getIEVersion() {
            let agent = navigator.userAgent.toLowerCase();
            let regStr_ie = /msie ([\d.]+);/gi;

            //IE
            if (agent.indexOf("msie") > 0) {
                var ie = Math.floor(regStr_ie.exec(agent)[1]);
                return ie;
            }
        }

        var isUpdate = browserUpdate();
        if (isUpdate) {
            console.log('浏览器需要更新升级');
        } else {
            console.log('浏览器不需要更新');
        }
    },


    //判断数组
    isArray: function (arr) {
        let outPutArr = [];
        if (Object.prototype.toString.call(arr) === "[object Array]") {
            outPutArr = arr;
        }
        return outPutArr;
    },

    //判断对象
    isObject: function (obj) {
        let outPutObj = {};
        if (Object.prototype.toString.call(obj) === "[object Object]") {
            outPutObj = obj;
        }
        return outPutObj;
    },

    //判断字符串类型
    isString: function (str) {
        let outPutStr = '';
        if (Object.prototype.toString.call(str) === "[object String]") {
            outPutStr = str;
        }
        return outPutStr;
    },

    //取sessionStorage 里面的值
    getStorage: function (key, type) {
        let storage_tips = window.sessionStorage.getItem(key);

        if (storage_tips) storage_tips = JSON.parse(storage_tips);

        if (type === 'object') {
            return this.isObject(storage_tips);
        } else if (type === 'string') {
            return this.isString(storage_tips);
        } else if (type === 'array') {
            return this.isArray(storage_tips);
        } else {
            return storage_tips;
        }
    },

    //存sessionStorage 里面的值
    setStorage: function (key, item) {
        let meta = null;
        let type = typeof (item);

        if (type === 'object' || type === 'array') {
            meta = JSON.stringify(item);
        } else {
            meta = item;
        }

        window.sessionStorage.setItem(key, meta);
    },
    removeStorage: function (key) {
        window.sessionStorage.removeItem(key);
    },


    // 用户名保存, 传递 user 对象
    storageUser(user) {
        let users = [];

        if (window.localStorage.users) {
            users = JSON.parse(window.localStorage.users);
        }

        // 查找本地存储，有则删除
        for (let i = 0; i < users.length; i++) {

            let code = users[i].code;
            if (code == user.code) users.splice(i, 1);
        }
        users.unshift(user);

        // 用户名大于5个清除
        if (users.length > 9) {
            users.splice(10);
        }
        window.localStorage.users = JSON.stringify(users);
    },

    //ie?
    isIE: function () {
        if (!!window.ActiveXObject || "ActiveXObject" in window)
            return false;
        else
            return true;
    },

    //格式化
    mathMul: function (a, b) {
        let c = 0,
            d = a.toString(),
            e = b.toString();
        try {
            c += d.split(".")[1].length;
        } catch (f) {
        }
        try {
            c += e.split(".")[1].length;
        } catch (f) {
        }
        return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
    },

    //99进1
    mathRound: function (total) {
        let r, i,
            e = false,
            re = /^[0-9]+.([0-9]{0,2})[0-9]*/;
        i = total + '';
        if (i.indexOf('.') === -1) {
            i = i + '.0';
        } else if (i.indexOf('.') === 0) {
            i = '0' + i;
        }
        r = i.replace(re, "$1");
        if (r) r = parseInt(r, 10);
        if (r == 99) e = true;
        return e;
    },

    mathDiv: function (a, b) {
        let c, d, e = 0,
            f = 0;
        try {
            e = a.toString().split(".")[1].length;
        } catch (g) {
        }
        try {
            f = b.toString().split(".")[1].length;
        } catch (g) {
        }
        return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), this.mathMul(c / d, Math.pow(10, f - e));
    },

    // 验证电话号码
    checkPhone: function (phone) {
        if (!(/^1[34578]\d{9}$/.test(phone))) {
            window.$ui.dialog.show("手机号码有误,请重新输入");
            return false;
        }
        return true;
    },
    checkPhones: function (v) {
        if (!(/^1[34578]\d{9}$/.test(v))) {
            return false;
        }
        return true;
    },

    // 去除特殊符号
    replaceSymbol: function (str) {
        let regexp = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\+={}|《》？：“”【】、；‘’，。、]/img;
        return str.replace(regexp, '');
    },
    // 去除特殊符号、能够输入 、
    replaceSymbolPause: function (str) {
        let regexp = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\+={}|《》？：“”【】；‘’，。]/img;
        return str.replace(regexp, '');
    },

    //去除符号以及字母,中文
    replaceSymbols: function (str) {
        let regexp = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、\s |\sa-z\u4e00-\u9fa5]/img;
        return str.replace(regexp, '');
    },

    // 匹配特殊字符，能够输入 = 符号
    replaceSymbolsEqual: function (str) {
        let regexp = /[`~!@#$%^&*()_\-+<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+{}|《》？：“”【】、；‘’，。、]/img;
        return str.replace(regexp, '');
    },

    // 过滤中文，特殊字符
    replaceSymbolst: function (str) {
        let regexp = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、\s \u4e00-\u9fa5]/img;
        return str.replace(regexp, '');
    },

    // 过滤中文，特殊字符(特殊字符可以输入下划线)
    replaceSymbolstSpecial: function (str) {
        let regexp = /[`~!@#$%^&*()\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、\s \u4e00-\u9fa5]/img;
        return str.replace(regexp, '');
    },

    // 过滤,特殊字符,数字
    replaceSymbolAll: function (str) {
        let regexp = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、\[1234657890\] \s]/img;
        return str.replace(regexp, '');
    },

    // 禁止输入中文
    disabledCh(value) {
        return value.replace(/[\u4e00-\u9fa5\s]/g, '');
    },

    // 获取参数
    getParams: function (name) {
        let queryStr = window.location.hash.replace('?', '&').split('&');
        let queryObj = {};
        queryStr.forEach(function (str) {
            queryObj[str.split('=')[0]] = str.split('=')[1]
        });
        return queryObj[name];
    },

    getLength(str) {
        return Math.ceil(str.replace(/[^\x00-\xff]/g, "aa").length / 2);
    },

    //处理字符判断
    judgeCharacterLength(str, length) {
        let i = this.validTrim(str), j = 0;
        i ? j = i.replace(/[^\x00-\xff]/g, "**").length : '';
        return j >= length;
    },
    //去除首尾空格
    validTrim(val) {
        val = typeof val === 'string' ? val : val + '';
        val = val.replace(/(^\s*)|(\s*$)/g, '');
        return val;
    },
    // 仅输中文，字母，数字，其他都去除
    replaceEmoji(str) {
        return str.replace(/[^\u4e00-\u9fa5|0-9|a-z]/gi, '');
    },
    // 只能输入数字
    inputNumber(str) {
        if (!(/^[1-9]\d*\.\d*$|0\.\d*[1-9]\d*|^[1-9]\d*$/).test(str)) {
            return false;
        }
        return str;
    },
    // 限定只能输入小数,整数位长度控制,小数位控制
    inputFloat(str, floatLength, intLength = 7) {
        str = str + '';

        if (floatLength === 0) {
            floatLength = '';
        } else if (!floatLength && str.indexOf('.') !== -1) {
            floatLength = '\\.\\d{0,2}';
        } else if (str.indexOf('.') !== -1) {
            floatLength = `\\.\\d{0,${floatLength}}`;
        } else {
            floatLength = '';
        }

        let regexp = new RegExp(`\\d{0,${intLength}}${floatLength}`, '');

        let data = str.match(regexp, '');
        return data && data[0];
    },
    // 去除所有空格
    removeAllSpace(str) {
        return str.replace(/\s+/g, '');
    },
    cmp: function (x, y) {
        // If both x and y are null or undefined and exactly the same

        if (x === y) {
            return true;
        }

        // If they are not strictly equal, they both need to be Objects
        if (!(x instanceof Object) || !(y instanceof Object)) {
            return false;
        }


        //They must have the exact same prototype chain,the closest we can do is
        //test the constructor.
        if (x.constructor !== y.constructor) {
            return false;
        }

        for (var p in x) {

            //Inherited properties were tested using x.constructor === y.constructor
            if (x.hasOwnProperty(p)) {
                // Allows comparing x[ p ] and y[ p ] when set to undefined
                if (!y.hasOwnProperty(p)) {
                    return false;
                }

                // If they have the same strict value or identity then they are equal
                if (x[p] === y[p]) {
                    continue;
                }

                // Numbers, Strings, Functions, Booleans must be strictly equal
                if (typeof (x[p]) !== "object" || x[p] instanceof Date) {
                    return false;
                }

                // Objects and Arrays must be tested recursively
                if (!Object.equals(x[p], y[p])) {
                    return false;
                }
            }
        }

        for (p in y) {
            // allows x[ p ] to be set to undefined
            if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
                return false;
            }
        }
        return true;
    },

    // 时间判断
    judgementTime(params) {
        let i = params.length; //循环次数
        let flag = true;
        if (params.length === 1) {
            return this.publicJudgementTime(params);
        }

        while (i >= 1) {
            for (let j = i; j >= 0; j--) {
                if (params[i] && params[j] && (i != j)) {

                    if (!this.publicJudgementTime(params, i)) {
                        return flag = false;
                    }

                    if (params[i].start === params[j].start) {
                        flag = false;
                        window.$ui.$dialog.show({
                            type: 'alert',
                            contentHtml: '不可以重复设置开始收货时间!',
                            btns: [{text: '确定'}]
                        });
                        return flag;
                    }
                    if (params[i].start < params[j].start && !(params[i].end < params[j].start)) {
                        flag = false;
                        window.$ui.$dialog.show({
                            type: 'alert',
                            contentHtml: '不可以重复设置开始收货时间!',
                            btns: [{text: '确定'}]
                        });
                        return flag;
                    }
                    if ((params[i].start > params[j].start) && ((params[j].end > params[i].end) || (params[i].start < params[j].end))) {
                        flag = false;
                        window.$ui.$dialog.show({
                            type: 'alert',
                            contentHtml: '不可以重复设置开始收货时间!',
                            btns: [{text: '确定'}]
                        });
                        return flag;
                    }
                }
            }
            i--;
        }
        return flag;
    },

    publicJudgementTime(params, i) {
        let flag = true;
        if (i === undefined) {
            i = 0;
        }
        if (params[i].start === params[i].end) {
            flag = false;
            window.$ui.$dialog.show({
                type: 'alert',
                contentHtml: '开始时间不能等于结束时间!',
                btns: [{text: '确定'}]
            });
            return flag;
        } else if (params[i].start > params[i].end) {
            flag = false;
            window.$ui.$dialog.show({
                type: 'alert',
                contentHtml: '开始时间不能大于结束时间!',
                btns: [{text: '确定'}]
            });
            return flag;
        }
        return flag;
    },


//新增

    /*
    *汉字转换拼音
    *param 需要转换的汉字
    *return 返回拼音
     */
    ConvertPinyin(value) {
        var VLength = value.length;
        var result = "";
        var reg = new RegExp('[a-zA-Z0-9\- ]');
        for (var i = 0; i < VLength; i++) {
            var val = value.substr(i, 1);
            var name = this.arraySearch(val);
            if (reg.test(val)) {
                result += val;
            } else if (name !== false) {
                result += name;
            }
        }
        result = result.replace(/ /g, '-');
        while (result.indexOf('--') > 0) {
            result = result.replace('--', '-');
        }
        return result;
    },
    /*
    *遍历汉字库
    *param 单个汉字
    *return 返回首拼 OR false（没找到）
     */
    arraySearch(value) {
        for (var name in PinYin) {
            if (PinYin[name].indexOf(value) != -1) {
                return this.ucfirst(name);
                break;
            }
        }
        return false;
    },
    /*
    *返回字符串第一个字符大写
    *param 字符传
    *return 返回首字母大写
     */
    ucfirst(value) {
        if (value.length > 0) {
            var first = value.substr(0, 1).toUpperCase();
            // var spare = value.substr(1, value.length);
            return first;
        }
    },
    showMessage(option) {
        Message({
            message: option.message,
            type: option.type
        });
    },
    /*
     * 一维数组转树形结构
     * param:data  转换数组
     * param:key  ID
     * param:parentKey  父ID
     * param:rootkeyID  rootID
     * param:map  需要将原始属性名称转换为什么名称
     * return 返回树结构
     */
    TreeUtils(data, key, parentKey, rootkeyID, map) {
        for (let i = 0; i < data.length; i++) {
            let flag = false
            for (let _i = 0; _i < data.length; _i++) {

                if(data[i][parentKey] == data[_i][key]){
                    flag = true;
                }
            }
            if(!flag && data[i][parentKey] != 0 && data[i][parentKey] != rootkeyID){
                data.splice(i,1);
                i--;
            }
        }
        let _tree = {};
        _tree.data = data;
        _tree.key = key;
        _tree.parentKey = parentKey;
        _tree.treeParentKey = parentKey; //parentKey要转换成什么属性名称
        _tree.treeKey = key; //key要转换成什么属性名称
        _tree.map = map;
        if (map) {
            if (map[key]) _tree.treeKey = map[key];
        }
        _tree.toTree = function () {
            var data = _tree.data;
            var pos = {};
            var tree = [];
            var i = 0;
            while (data.length != 0) {
                if (data[i][_tree.parentKey] == rootkeyID || data[i][_tree.parentKey] == 0) {
                    var _temp = _tree.copy(data[i]);
                    tree.push(_temp);
                    pos[data[i][_tree.key]] = [tree.length - 1];
                    data.splice(i, 1);
                    i--;
                } else {
                    var posArr = pos[data[i][_tree.parentKey]];
                    if (posArr != undefined) {
                        var obj = tree[posArr[0]];
                        for (var j = 1; j < posArr.length; j++) {
                            obj = obj.children[posArr[j]];
                        }
                        var _temp = _tree.copy(data[i]);
                        !!!obj.children ? obj.children = [] : '';
                        obj.children.push(_temp);
                        pos[data[i][_tree.key]] = posArr.concat([obj.children.length - 1]);
                        data.splice(i, 1);
                        i--;
                    }
                }
                i++;

                if (i > data.length - 1) {
                    i = 0;
                }
            }
            return tree;
        }
        _tree.copy = function (item) {
            var _temp = {};
            _temp[_tree.treeKey] = item[_tree.key];
            for (var _index in item) {
                if (_index != _tree.key && _index != _tree.parentKey) {
                    var _property = item[_index];
                    if ((!!_tree.map) && _tree.map[_index])
                        _temp[_tree.map[_index]] = _property;
                    else
                        _temp[_index] = _property;
                }
            }
            return _temp;
        }
        return _tree;
    }
}
