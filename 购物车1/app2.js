/**
 * Created by Administrator on 2018/3/22/022.
 */
// 购物车
var Cart = new Vue({
    el: '#page-cart',
    data: {
        checkAllFlag: false,
        selectedNum: 0,
        delFlag: false,
        // cart: [{
        //     id: 1001,
        //     name: 'Beats EP头戴式耳机',
        //     price: 558,
        //     type: 4,
        //     quantity: 1,
        //     subtotal: 558,
        //     stock: 128,
        //     checked: false,
        //     sales: 1872,
        //     img: 'http://img11.360buyimg.com/n1/s528x528_jfs/t3109/194/2435573156/46587/e0e867ac/57e10978N87220944.jpg!q70.jpg'
        // }]
        cart: []
    },
    methods: {

        /**
         * @method 增减单品数量
         * @param {Boolean} isAdd 是否增加
         * @param {Number} index 商品下标
         */
        changeQty: function (isAdd, item) {
            var num = item.quantity,
                stock = item.stock;

            if (isAdd && num < stock) {
                this.$set(item, 'quantity', ++num);
            } else if (!isAdd && num > 1) {
                this.$set(item, 'quantity', --num);
            }

            this.$set(item, 'subtotal', (item.price * num).toFixed(1));
        },

        /**
         * @method 选择商品
         * @param {Object} item 商品对象
         */
        selectGoods: function (item) {
            // 状态值取反，并根据状态值对selectedNum进行加减
            item.checked = !item.checked;
            item.checked ? ++this.selectedNum : --this.selectedNum;
            // 设置全选
            this.selectedNum === this.cart.length
                ? this.checkAllFlag = true
                : this.checkAllFlag = false
        },

        /**
         * @method 全选
         */
        checkAll: function () {
            var self = this;
            this.checkAllFlag = !this.checkAllFlag;
            console.log(this.cart);
            console.log(this.cart.length);
            this.cart.forEach(function (item) {
                if (self.checkAllFlag) {
                    // 全选
                    item.checked = true;
                    self.selectedNum = self.cart.length;
                } else {
                    // 取消全选
                    item.checked = false;
                    self.selectedNum = 0;
                }
            });
        },

        /**
         * @method 切换删除按钮
         */
        toggleDelBtn: function () {
            this.delFlag = !this.delFlag;
        },

        /**
         * @method 删除商品
         */
        delGoods: function () {
            /**
             * !提示：
             * 每次遍历删除数组元素时，会减少数组长度，所以不能缓存length
             * 也不能用forEach方法，因为它会自动缓存数组的长度
             * 这里还可以用filter
             */
            var cart = this.cart;
            this.cart = cart.filter(function (item) {
                return !item.checked
            });
            // for (var i = 0; i < cart.length; i++) {
            //     cart[i].checked && cart.splice(i--, 1);
            // };

            // 重置 被选商品数量、全选状态、删除状态
            this.selectedNum = 0;
            this.checkAllFlag = false;
            this.delFlag = !this.delFlag;
        }

    },
    computed: {
        /**
         * @method 已选商品的总额
         */
        totalPrice: function () {
            var num = 0;
            // console.log(this.cart);
            this.cart.forEach(function (item) {
                item.checked && (num += parseFloat(item.subtotal));
            });
            return num;
        }
    }
});